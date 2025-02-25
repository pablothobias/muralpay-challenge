import apiClient from '@/config/api.config';
import TransferService from '../index';
import { API_ENDPOINTS, CURRENCY, RECIPIENT_TYPE, STATUS_TYPES } from '@/utils/constants';
import { TransferValidationError } from '../../errors';
import { AxiosError, AxiosResponse } from 'axios';
import { ZodError } from 'zod';

jest.mock('@/config/api.config', () => ({
  post: jest.fn(),
  get: jest.fn(),
}));

jest.mock('axios', () => ({
  ...jest.requireActual('axios'),
  AxiosHeaders: jest.fn().mockImplementation(() => ({
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  })),
  default: {
    create: () => ({
      post: jest.fn(),
      get: jest.fn(),
    }),
  },
}));

const mockedAxios = apiClient as jest.Mocked<typeof apiClient>;

const originalConsoleError = console.error;
beforeEach(() => {
  console.error = jest.fn();
});

afterEach(() => {
  console.error = originalConsoleError;
  jest.clearAllMocks();
});

describe('TransferService', () => {
  const mockTransferData = {
    memo: 'Test transfer',
    payoutAccountId: 'acc_123',
    recipientsInfo: [
      {
        name: 'John Doe',
        email: 'john@example.com',
        recipientTransferType: 'FIAT' as const,
        recipientType: 'INDIVIDUAL',
        currencyCode: 'USD',
        tokenAmount: 100,
        bankDetails: {
          bankName: 'Test Bank',
          bankAccountOwnerName: 'John Doe',
          bankAccountNumber: '1234567890',
          bankRoutingNumber: '987654321',
          bankCode: 'TESTBANK',
          currencyCode: 'USD',
          accountType: 'CHECKING',
          documentNumber: '123456789',
          documentType: 'NATIONAL_ID',
          physicalAddress: {
            address1: '123 Main St',
            address2: 'Apt 4B',
            city: 'Test City',
            state: 'TS',
            country: 'US',
            zip: '12345',
          },
        },
      },
    ],
  };

  const mockTransferResponse = {
    memo: 'Test transfer',
    id: 'transfer_123',
    status: 'PENDING',
    createdAt: '2025-02-23T00:00:00Z',
    updatedAt: '2025-02-23T00:00:00Z',
    payoutAccountId: mockTransferData.payoutAccountId,
    recipientsInfo: [
      {
        id: 'recipient_123',
        createdAt: '2025-02-23T00:00:00Z',
        updatedAt: '2025-02-23T00:00:00Z',
        recipientTransferType: 'FIAT',
        tokenAmount: 100,
        name: 'John Doe',
        email: 'john@example.com',
        recipientType: 'INDIVIDUAL',
        currencyCode: 'USD',
        bankDetails: mockTransferData.recipientsInfo[0].bankDetails,
      },
    ],
  };

  describe('create', () => {
    it('successfully creates a transfer', async () => {
      const mockPost = jest.fn().mockResolvedValueOnce({
        data: mockTransferResponse,
      });
      mockedAxios.post = mockPost;
      mockPost.mockResolvedValueOnce({
        data: mockTransferResponse,
      });

      const result = await TransferService.create(mockTransferData);

      expect(apiClient.post).toHaveBeenCalledWith(
        API_ENDPOINTS.TRANSFER_REQUESTS,
        mockTransferData,
        expect.any(Object),
      );
      expect(result).toEqual(mockTransferResponse);
    });

    it('handles validation errors', async () => {
      const invalidData = {
        ...mockTransferData,
        recipientsInfo: [],
      };

      await expect(TransferService.create(invalidData)).rejects.toThrow(
        'At least one recipient is required',
      );
      expect(console.error).toHaveBeenCalled();
    });

    it('handles API errors', async () => {
      const apiError = new AxiosError();
      apiError.response = {
        status: 400,
        data: { message: 'Invalid request' },
      } as AxiosResponse;

      const mockPost = jest.fn().mockRejectedValueOnce(apiError);
      mockedAxios.post = mockPost;

      await expect(TransferService.create(mockTransferData)).rejects.toThrow('Invalid request');
      expect(console.error).toHaveBeenCalled();
    });
  });

  describe('get', () => {
    const mockTransferList = {
      results: [mockTransferResponse],
      total: 1,
    };

    it('successfully fetches transfers', async () => {
      mockedAxios.get.mockResolvedValueOnce({
        data: mockTransferList,
      });

      const result = await TransferService.get();

      expect(apiClient.get).toHaveBeenCalledWith(
        API_ENDPOINTS.TRANSFER_REQUESTS,
        expect.objectContaining({
          headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
          },
        }),
      );
      expect(result).toEqual(mockTransferList);
    });

    it('handles API errors', async () => {
      const apiError = new AxiosError('Network error', 'ERR_BAD_REQUEST', undefined, undefined, {
        status: 400,
        data: { message: 'Invalid request' },
      } as AxiosResponse<unknown, unknown>);
      mockedAxios.get.mockRejectedValueOnce(apiError);

      await expect(TransferService.get()).rejects.toThrow('Invalid request');
      expect(console.error).toHaveBeenCalled();
    });
  });

  describe('execute', () => {
    const transferId = 'transfer_123';

    it('successfully executes a transfer', async () => {
      const executedTransfer = {
        ...mockTransferResponse,
        status: STATUS_TYPES.COMPLETED,
        memo: 'Test transfer',
        recipientsInfo: [
          {
            ...mockTransferResponse.recipientsInfo[0],
            name: 'John Doe',
            email: 'john@example.com',
            recipientType: RECIPIENT_TYPE.INDIVIDUAL,
            currencyCode: CURRENCY.USD,
          },
        ],
      };
      const mockPost = jest.fn().mockResolvedValueOnce({
        data: executedTransfer,
        status: 200,
      });
      mockedAxios.post = mockPost;

      const result = await TransferService.execute(transferId);

      expect(apiClient.post).toHaveBeenCalledWith(
        API_ENDPOINTS.TRANSFER_REQUESTS_EXECUTE,
        { transferRequestId: transferId },
        expect.objectContaining({
          headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
          },
        }),
      );
      expect(result!.status).toBe(STATUS_TYPES.COMPLETED);
    });

    it('handles API errors during execution', async () => {
      const apiError = new Error('Execution failed');
      mockedAxios.post.mockRejectedValueOnce(apiError);

      await expect(TransferService.execute(transferId)).rejects.toThrow();
      expect(console.error).toHaveBeenCalled();
    });
  });

  describe('cancel', () => {
    const transferId = 'transfer_123';

    it('successfully cancels a transfer', async () => {
      const cancelledTransfer = {
        ...mockTransferResponse,
        status: STATUS_TYPES.CANCELED,
        memo: 'Test transfer',
        recipientsInfo: [
          {
            ...mockTransferResponse.recipientsInfo[0],
            name: 'John Doe',
            email: 'john@example.com',
            recipientType: RECIPIENT_TYPE.INDIVIDUAL,
            currencyCode: CURRENCY.USD,
          },
        ],
      };
      const mockPost = jest.fn().mockResolvedValueOnce({
        data: cancelledTransfer,
        status: 200,
      });
      mockedAxios.post = mockPost;

      const result = await TransferService.cancel(transferId);

      expect(apiClient.post).toHaveBeenCalledWith(
        API_ENDPOINTS.TRANSFER_REQUESTS_CANCEL,
        { transferRequestId: transferId },
        expect.objectContaining({
          headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
          },
        }),
      );
      expect(result!.status).toBe(STATUS_TYPES.CANCELED);
    });

    it('handles API errors during cancellation', async () => {
      const apiError = new Error('Cancellation failed');
      mockedAxios.post.mockRejectedValueOnce(apiError);

      await expect(TransferService.cancel(transferId)).rejects.toThrow();
      expect(console.error).toHaveBeenCalled();
    });
  });

  describe('error handling', () => {
    it('handles validation errors', () => {
      const validationError = new ZodError([
        {
          code: 'invalid_type',
          expected: 'string',
          received: 'number',
          path: ['field'],
          message: 'Invalid type',
        },
      ]);

      expect(() => TransferService.handleError(validationError, 'Test error')).toThrow(
        TransferValidationError,
      );
      expect(console.error).toHaveBeenCalled();
    });

    it('handles API errors', () => {
      const apiError = new AxiosError('Network error', 'ERR_BAD_REQUEST', undefined, undefined, {
        status: 400,
        data: { message: 'Invalid request' },
      } as AxiosResponse<unknown, unknown>);

      expect(() => TransferService.handleError(apiError, 'Test error')).toThrow('Invalid request');
      expect(console.error).toHaveBeenCalled();
    });

    it('handles unexpected errors', () => {
      const unexpectedError = new Error('Unexpected');

      expect(() => TransferService.handleError(unexpectedError, 'Test error')).toThrow(
        'Test error',
      );
      expect(console.error).toHaveBeenCalled();
    });
  });
});
