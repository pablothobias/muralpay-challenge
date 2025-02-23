import { screen, within, waitFor, render } from '@/utils/context/TestUtils';

import AccountInfoModalContent from '../index';
import { AccountResponse } from '@/features/account/types';
import { mockAccount } from '@/mocks/store/account';
import { STATUS_TYPES } from '@/utils/constants';
import { BLOCKCHAIN } from '@/utils/constants';

describe('AccountInfoModalContent', () => {
  const renderComponent = (account: AccountResponse) =>
    render(<AccountInfoModalContent account={account} />);

  it('renders account info with theme context', async () => {
    renderComponent(mockAccount);
    await waitFor(() => {
      expect(screen.getByTestId('status-value')).toHaveTextContent('Active');
    });
  });

  describe('rendering', () => {
    it('should render all account information correctly', async () => {
      renderComponent(mockAccount);

      const expectedItems = [
        { label: 'ID:', value: '123' },
        { label: 'Blockchain:', value: BLOCKCHAIN.POLYGON },
        { label: 'Address:', value: '0x123...abc' },
        { label: 'Balance:', value: '100 BTX' },
        { label: 'Status:', value: STATUS_TYPES.ACTIVE },
        { label: 'API Enabled:', value: 'Yes' },
      ];

      await waitFor(() => {
        expectedItems.forEach(({ label, value }) => {
          const item = screen.getByText(label).closest('div');
          expect(item).toBeInTheDocument();
          expect(within(item!).getByText(value)).toBeInTheDocument();
        });
      });
    });

    it('should return null when account is not provided', async () => {
      const { container } = renderComponent(null as unknown as AccountResponse);
      expect(container).toBeEmptyDOMElement();
    });
  });

  describe('status indicators', () => {
    it('should show pending status when isPending is true', () => {
      renderComponent({
        ...mockAccount,
        isPending: true,
      });

      const statusItem = screen.getByTestId('status-label').closest('div');
      expect(within(statusItem!).getByText(STATUS_TYPES.PENDING)).toBeInTheDocument();
    });
  });
});
