import { User } from '@/store/auth/types';

export const mockUser: User = {
  id: 'user-123',
  name: 'John Doe',
  organizationType: 'BUSINESS',
  status: 'ACTIVE',
  currenciesInfo: [
    {
      id: 'currency-123',
      name: 'Bitcoin',
      code: 'BTC',
    },
    {
      id: 'currency-456',
      name: 'Ethereum',
      code: 'ETH',
    },
  ],
};

export const mockAuthState = {
  user: mockUser,
  isAuthenticated: true,
  login: jest.fn(),
  logout: jest.fn(),
};
