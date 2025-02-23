import { AccountResponse } from '@/features/account/types';
import { AccountState } from '@/store/account/types';
import { BLOCKCHAIN } from '@/utils/constants';

export const mockAccount: AccountResponse = {
  id: '123',
  createdAt: '2025-02-21T00:00:00Z',
  updatedAt: '2025-02-21T00:00:00Z',
  name: 'Test Wallet',
  blockchain: BLOCKCHAIN.POLYGON,
  address: '0xaFB11F991f9c7DDB62463e4E16e917d6f92e9337',
  balance: {
    balance: 100,
    tokenSymbol: 'BTX',
  },
  isPending: false,
  isApiEnabled: true,
};

export const mockAccounts = [
  mockAccount,
  {
    ...mockAccount,
    id: '456',
    name: 'Test Wallet 2',
    blockchain: BLOCKCHAIN.BASE,
    address: '0xaFB11F991f9c7DDB62463e4E16e917d6f92e9337',
  },
  {
    ...mockAccount,
    id: '789',
    name: 'Test Wallet 3',
    blockchain: BLOCKCHAIN.CELO,
    address: '0xaFB11F991f9c7DDB62463e4E16e917d6f92e9337',
  },
  {
    ...mockAccount,
    id: '888',
    name: 'Test Wallet 4',
    blockchain: BLOCKCHAIN.POLYGON,
    address: '0xaFB11F991f9c7DDB62463e4E16e917d6f92e9337',
  },
];

export const mockAccountState: AccountState = {
  accounts: [...mockAccounts],
  loading: false,
  error: null,
  setAccountsState: jest.fn(),
  onLogout: jest.fn(),
};
