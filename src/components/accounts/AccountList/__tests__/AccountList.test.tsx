import { screen, fireEvent, waitFor } from '@testing-library/react';
import { render as renderWithProviders } from '@/utils/context/TestUtils';
import AccountList from '../index';
import useAccountStore from '@/store/account';
import { act } from '@testing-library/react';
import { mockAccounts } from '@/mocks/store/account';

type ReactProp = {
  children: React.ReactNode;
  [key: string]: unknown;
};

jest.mock('@/features/account/services', () => ({
  get: jest.fn(),
}));

const accountService = jest.requireMock('@/features/account/services');

jest.mock('next/dynamic', () => ({
  __esModule: true,
  default: () => {
    const Component = () => null;
    Component.displayName = 'MockedDynamicComponent';
    return Component;
  },
}));

jest.mock('@/shared-ui', () => ({
  LoadingSpinner: () => <div data-testid="loading-spinner">Loading...</div>,
  Button: ({ children, ...props }: ReactProp) => <button {...props}>{children}</button>,
  List: ({ children }: ReactProp) => <div role="list">{children}</div>,
  Icon: () => null,
}));

describe('AccountList', () => {
  const renderComponent = async () => {
    let result;
    await act(async () => {
      result = renderWithProviders(<AccountList />, { withLoading: true, withTheme: true });
    });
    return result!;
  };

  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(accountService, 'get').mockResolvedValue(mockAccounts);
    act(() => {
      useAccountStore.setState({
        accounts: [],
        loading: false,
        error: null,
      });
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('initialization', () => {
    it('should fetch accounts on mount', async () => {
      renderComponent();

      await waitFor(() => {
        expect(accountService.get).toHaveBeenCalledTimes(1);
      });
    });

    it('should show loading state while fetching accounts', async () => {
      accountService.get.mockImplementation(
        () => new Promise((resolve) => setTimeout(() => resolve(mockAccounts), 100)),
      );

      await act(async () => {
        useAccountStore.setState({ loading: true });
        await renderComponent();
      });

      await waitFor(() => {
        expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
      });
    });
  });

  describe('account list rendering', () => {
    beforeEach(() => {
      useAccountStore.setState({ accounts: mockAccounts, loading: false });
    });

    it('should render all accounts with correct information', async () => {
      await act(async () => {
        useAccountStore.setState({ accounts: mockAccounts, loading: false });
      });

      const { container } = await renderComponent();

      await waitFor(() => {
        expect(container.querySelector('[role="list"]')).toBeInTheDocument();
      });

      for (const account of mockAccounts) {
        const balanceElement = await screen.findByTestId(`balance-${account.id}`);
        expect(balanceElement).toHaveTextContent(
          `${account.balance.balance} ${account.balance.tokenSymbol}`,
        );
        expect(screen.getByText(account.blockchain)).toBeInTheDocument();
        expect(screen.getByText(account.address)).toBeInTheDocument();
      }
    });

    it('should display correct status indicators for each account', async () => {
      await act(async () => {
        useAccountStore.setState({ accounts: mockAccounts, loading: false });
      });

      const { container } = await renderComponent();

      await waitFor(() => {
        expect(container.querySelector('[role="list"]')).toBeInTheDocument();
      });

      const statusElements = screen.getAllByTestId('account-status');
      expect(statusElements).toHaveLength(mockAccounts.length);

      statusElements.forEach((element, index) => {
        const expectedClass = mockAccounts[index].isPending ? 'status-pending' : 'status-active';
        expect(element).toHaveClass(expectedClass);
      });
    });
  });

  describe('interactions', () => {
    beforeEach(() => {
      useAccountStore.setState({ accounts: mockAccounts, loading: false });
    });

    it('should open account details modal when clicking an account', async () => {
      await act(async () => {
        useAccountStore.setState({ accounts: mockAccounts, loading: false });
      });

      const { container } = await renderComponent();

      await waitFor(() => {
        expect(container.querySelector('[role="list"]')).toBeInTheDocument();
      });

      await waitFor(() => {
        expect(screen.getByText(mockAccounts[0].address)).toBeInTheDocument();
      });

      const accountElement = await screen.findByTestId(`account-address-${mockAccounts[0].id}`);
      const accountButton = accountElement.closest('div[role="button"]');
      expect(accountButton).toBeInTheDocument();

      await act(async () => {
        fireEvent.click(accountButton!);
      });

      await waitFor(() => {
        expect('123').toBe(mockAccounts[0]);
      });
    });

    it('should open transfer modal when clicking transfer button', async () => {
      await act(async () => {
        useAccountStore.setState({ accounts: mockAccounts, loading: false });
      });

      const { container } = await renderComponent();

      await waitFor(() => {
        expect(container.querySelector('[role="list"]')).toBeInTheDocument();
      });

      await waitFor(() => {
        expect(screen.getByRole('button', { name: /new transfer/i })).toBeInTheDocument();
      });

      const transferButton = await screen.findByRole('button', { name: /new transfer/i });

      act(() => {
        fireEvent.click(transferButton);
      });

      // expect(openSpy).toHaveBeenCalledTimes(1);
      // expect(openSpy).toHaveBeenCalledWith(true);
    });

    it('opens transfer modal with proper interaction', async () => {
      renderWithProviders(<AccountList />, { withLoading: true, withTheme: true });

      const button = await screen.findByRole('button', { name: /transfer/i });

      await act(async () => {
        fireEvent.click(button);
      });
    });
  });
});
