import { TransferListResponseSchema, TransferResponse } from '@/features/transfer/types';
import { RECIPIENT_TRANSFER_TYPE, STATUS_TYPES } from '@/utils/constants';

// Create an array of transfer objects
const transfersArray: TransferResponse[] = [
  {
    id: '1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    payoutAccountId: '1',
    memo: 'First transfer',
    status: STATUS_TYPES.IN_REVIEW,
    recipientsInfo: [
      {
        id: 'recipient-123',
        recipientTransferType: RECIPIENT_TRANSFER_TYPE.FIAT,
        tokenAmount: 500,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        fiatDetails: {
          currencyCode: 'USD',
          fiatAmount: 500,
          withdrawalRequestStatus: 'AWAITING_SOURCE_DEPOSIT',
          transactionFee: 0.5,
          exchangeFeePercentage: 1.5,
          exchangeRate: 1,
          feeTotal: 10,
        },
      },
    ],
  },
  {
    id: '2',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    payoutAccountId: '2',
    memo: 'Second transfer',
    status: STATUS_TYPES.IN_REVIEW,
    recipientsInfo: [
      {
        id: 'recipient-456',
        recipientTransferType: RECIPIENT_TRANSFER_TYPE.BLOCKCHAIN,
        tokenAmount: 1000,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        blockchainDetails: {
          walletAddress: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
          blockchain: 'POLYGON',
        },
      },
    ],
  },
  {
    id: '3',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    payoutAccountId: '3',
    memo: 'Third transfer',
    status: STATUS_TYPES.IN_REVIEW,
    recipientsInfo: [
      {
        id: 'recipient-789',
        recipientTransferType: RECIPIENT_TRANSFER_TYPE.FIAT,
        tokenAmount: 750,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        fiatDetails: {
          currencyCode: 'BRL',
          fiatAmount: 3750,
          withdrawalRequestStatus: 'AWAITING_SOURCE_DEPOSIT',
          transactionFee: 0.3,
          exchangeFeePercentage: 1.2,
          exchangeRate: 5.0,
          feeTotal: 45,
        },
      },
    ],
  },
  {
    id: '4',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    payoutAccountId: '4',
    memo: 'Fourth transfer',
    status: STATUS_TYPES.IN_REVIEW,
    recipientsInfo: [
      {
        id: 'recipient-101112',
        recipientTransferType: RECIPIENT_TRANSFER_TYPE.BLOCKCHAIN,
        tokenAmount: 2500,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        blockchainDetails: {
          walletAddress: '0x5b3256965e7C3cF26E11FCAf296DfC8807C01073',
          blockchain: 'ETHEREUM',
        },
      },
    ],
  },
];

// Create the object format with results and total
export const mockTransfers: TransferListResponseSchema = {
  results: transfersArray,
  total: transfersArray.length,
};

export const mockTransfer: TransferResponse = {
  id: '5',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  payoutAccountId: '5',
  memo: 'Fifth transfer',
  status: STATUS_TYPES.IN_REVIEW,
  recipientsInfo: [
    {
      id: 'recipient-131415',
      recipientTransferType: RECIPIENT_TRANSFER_TYPE.BLOCKCHAIN,
      tokenAmount: 3000,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      blockchainDetails: {
        walletAddress: '0xaFB11F991f9c7DDB62463e4E16e917d6f92e9337',
        blockchain: 'POLYGON',
      },
    },
  ],
};
