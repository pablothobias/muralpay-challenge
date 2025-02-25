import { screen, renderWithProviders } from '@/utils/test/TestProviders';
import AccountInfoModalContent from '../index';
import { AccountResponse } from '@/features/account/types';
import { mockAccount } from '@/mocks/store/account';

describe('AccountInfoModalContent', () => {
  const renderComponent = (props: { account: AccountResponse | null }) => {
    return renderWithProviders(<AccountInfoModalContent {...props} />);
  };

  describe('rendering', () => {
    it('should return null when account is not provided', () => {
      const { container } = renderComponent({ account: null });

      expect(container).toBeEmptyDOMElement();
    });

    it('should render account information correctly', () => {
      const { id, blockchain, address, balance, isPending, isApiEnabled } = mockAccount;

      renderComponent({ account: mockAccount });

      const statusValue = screen.getByTestId('status-value');
      const apiEnabledValue = screen.getByTestId('api-enabled-value');

      expect(screen.getByText(id)).toBeInTheDocument();
      expect(screen.getByText(blockchain)).toBeInTheDocument();
      expect(screen.getByText(address)).toBeInTheDocument();
      expect(screen.getByText(`$${balance.balance}.00 ${balance.tokenSymbol}`)).toBeInTheDocument();
      expect(statusValue).toHaveTextContent(isPending ? 'Pending' : 'Active');
      expect(apiEnabledValue).toHaveTextContent(isApiEnabled ? 'Yes' : 'No');
    });
  });

  describe('status indicators', () => {
    it('should show pending status when isPending is true', () => {
      const pendingAccount: AccountResponse = {
        ...mockAccount,
        isPending: true,
      };

      renderComponent({ account: pendingAccount });
      const statusValue = screen.getByTestId('status-value');

      expect(statusValue).toHaveTextContent('Pending');
    });

    it('should show active status when isPending is false', () => {
      const activeAccount: AccountResponse = {
        ...mockAccount,
        isPending: false,
      };

      renderComponent({ account: activeAccount });
      const statusValue = screen.getByTestId('status-value');

      expect(statusValue).toHaveTextContent('Active');
    });
  });
});
