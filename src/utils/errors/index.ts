import { AxiosError } from 'axios';

import { ERROR_TYPES } from '@/utils/constants';

export class ApiServiceError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly originalError?: unknown,
  ) {
    super(message);
    this.name = 'ApiServiceError';
  }
}

export class ValidationError extends ApiServiceError {
  constructor(
    message: string,
    public readonly code: string = ERROR_TYPES.VALIDATION,
    public readonly originalError?: unknown,
  ) {
    super(message, code, originalError);
    this.name = 'ValidationError';
  }
}

export class AuthError extends ApiServiceError {
  constructor(
    message: string,
    public readonly code: string = ERROR_TYPES.AUTH_ERROR,
    public readonly originalError?: unknown,
  ) {
    super(message, code, originalError);
    this.name = 'AuthError';
  }
}

export class NotFoundError extends ApiServiceError {
  constructor(
    message: string,
    public readonly code: string = ERROR_TYPES.NOT_FOUND_ERROR,
    public readonly originalError?: unknown,
  ) {
    super(message, code, originalError);
    this.name = 'NotFoundError';
  }
}

export class ServerError extends ApiServiceError {
  constructor(
    message: string,
    public readonly code: string = ERROR_TYPES.SERVER_ERROR,
    public readonly originalError?: unknown,
  ) {
    super(message, code, originalError);
    this.name = 'ServerError';
  }
}

export const handleApiError = (
  error: unknown,
  defaultMessage: string = 'An error occurred',
): never => {
  console.error('[API Error]:', error);

  if (error instanceof AxiosError) {
    const status = error.response?.status;
    const message = error.response?.data?.message || defaultMessage;

    if (status === 400) {
      throw new ValidationError(message, ERROR_TYPES.VALIDATION, error);
    } else if (status === 401) {
      throw new AuthError('Unauthorized access', ERROR_TYPES.AUTH_ERROR, error);
    } else if (status === 403) {
      throw new AuthError('Access forbidden', ERROR_TYPES.AUTH_ERROR, error);
    } else if (status === 404) {
      throw new NotFoundError('Resource not found', ERROR_TYPES.NOT_FOUND_ERROR, error);
    } else if (status! >= 500) {
      throw new ServerError('Server error occurred', ERROR_TYPES.SERVER_ERROR, error);
    }

    throw new ApiServiceError(message, ERROR_TYPES.API_ERROR, error);
  }

  if (error instanceof Error) {
    throw new ApiServiceError(error.message, ERROR_TYPES.UNKNOWN_ERROR, error);
  }

  throw new ApiServiceError(defaultMessage, ERROR_TYPES.UNKNOWN_ERROR, error);
};
