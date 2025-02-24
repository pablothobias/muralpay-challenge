/* eslint-disable @typescript-eslint/no-explicit-any */
import { screen, fireEvent, within } from '@testing-library/react';
import { render as renderWithProviders } from '@/utils/test/TestProviders';
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
  List: ({ items, loading, onClick }: any) => (
    <div role="list">
      {loading && <div data-testid="loading-spinner">Loading...</div>}
      {!loading &&
        items?.map((item: any) => (
          <div key={item.id} onClick={() => onClick(item.id)}>
            {item.element}
          </div>
        ))}
    </div>
  ),
  Icon: () => null,
}));

describe('AccountList', () => {
  const renderComponent = () => {
    return renderWithProviders(<AccountList />);
  };

  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(accountService, 'get').mockResolvedValue(mockAccounts);
    useAccountStore.setState({
      accounts: mockAccounts,
      loading: false,
      error: null,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('initialization', () => {
    it('should fetch accounts on mount', async () => {
      await act(async () => {
        renderComponent();
      });

      expect(accountService.get).toHaveBeenCalledTimes(1);
    });

    it('should show loading state while fetching accounts', async () => {
      jest.spyOn(accountService, 'get').mockImplementation(() => new Promise(() => {}));
      useAccountStore.setState({ accounts: [], loading: true });

      await act(async () => {
        renderComponent();
      });

      const list = screen.getByRole('list');
      expect(list).toBeInTheDocument();
      expect(within(list).getByTestId('loading-spinner')).toBeInTheDocument();
    });
  });

  describe('account list rendering', () => {
    beforeEach(() => {
      useAccountStore.setState({ accounts: mockAccounts, loading: false, error: null });
    });

    it('should render all accounts with correct information', async () => {
      await act(async () => {
        renderComponent();
      });

      const list = screen.getByRole('list');
      expect(list).toBeInTheDocument();

      for (const account of mockAccounts) {
        const accountElement = within(list).getByTestId(`account-address-${account.id}`);
        expect(accountElement).toBeInTheDocument();

        const balanceElement = within(accountElement).getByTestId(`balance-${account.id}`);
        expect(balanceElement).toHaveTextContent(
          `$${account.balance.balance}.00 ${account.balance.tokenSymbol}`,
        );
        expect(within(accountElement).getByText(account.blockchain)).toBeInTheDocument();
        expect(within(accountElement).getByTestId(`address-${account.id}`)).toHaveTextContent(
          account.address,
        );
      }
    });

    it('should display correct status indicators for each account', async () => {
      await act(async () => {
        renderComponent();
      });

      const list = screen.getByRole('list');
      for (const account of mockAccounts) {
        const statusBadge = within(list).getByTestId(`status-badge-${account.id}`);
        const expectedStatus = account.isPending ? 'PENDING' : 'ACTIVE';
        expect(statusBadge).toHaveTextContent(expectedStatus);
      }
    });
  });

  describe('interactions', () => {
    beforeEach(() => {
      useAccountStore.setState({ accounts: mockAccounts, loading: false });
    });

    it('should open account details modal when clicking an account', async () => {
      await act(async () => {
        renderComponent();
      });

      const list = screen.getByRole('list');
      const accountElement = within(list).getByTestId(`account-address-${mockAccounts[0].id}`);
      expect(accountElement).toBeInTheDocument();

      await act(async () => {
        fireEvent.click(accountElement);
      });

      expect(screen.getByText(mockAccounts[0].name)).toBeInTheDocument();
      expect(
        within(accountElement).getByTestId(`address-${mockAccounts[0].id}`),
      ).toBeInTheDocument();
    });

    it('should open transfer modal when clicking transfer button', async () => {
      await act(async () => {
        renderComponent();
      });

      const transferButton = screen.getByRole('button', { name: /new transfer/i });
      expect(transferButton).toBeInTheDocument();

      await act(async () => {
        fireEvent.click(transferButton);
      });

      expect(screen.getByText('New Transfer')).toBeInTheDocument();
    });

    it('opens transfer modal with proper interaction', async () => {
      await act(async () => {
        renderComponent();
      });

      const button = screen.getByRole('button', { name: /transfer/i });
      expect(button).toBeInTheDocument();

      await act(async () => {
        fireEvent.click(button);
      });

      expect(screen.getByText('New Transfer')).toBeInTheDocument();
    });
  });
});
