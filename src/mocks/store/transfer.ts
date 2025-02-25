import { TransferState } from '@/store/transfer/types';
import { STATUS_TYPES, RECIPIENT_TRANSFER_TYPE } from '@/utils/constants';

export const mockTransfers = {
  results: [
    {
      id: 'transfer-123',
      status: STATUS_TYPES.PENDING,
      createdAt: '2025-02-21T00:00:00Z',
      updatedAt: '2025-02-21T00:00:00Z',
      payoutAccountId: 'account-123',
      memo: 'Test transfer',
      recipientsInfo: [
        {
          id: 'recipient-123',
          createdAt: '2025-02-21T00:00:00Z',
          updatedAt: '2025-02-21T00:00:00Z',
          recipientTransferType: RECIPIENT_TRANSFER_TYPE.FIAT,
          tokenAmount: 100,
          fiatDetails: {
            withdrawalRequestStatus: STATUS_TYPES.PENDING,
            currencyCode: 'USD',
            fiatAmount: 100,
            transactionFee: 1,
            exchangeFeePercentage: 0.1,
            exchangeRate: 1,
            feeTotal: 1.1,
          },
        },
      ],
    },
  ],
  total: 1,
};

export const mockTransferState: TransferState = {
  loading: false,
  error: undefined,
  transfers: mockTransfers,
  setTransfersState: jest.fn(),
  onLogout: jest.fn(),
};
