class CustomerServiceError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly originalError?: unknown,
  ) {
    super(message);
    this.name = 'CustomerServiceError';
  }
}

export class CustomerValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'CustomerValidationError';
  }
}

export class CustomerRepositoryError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly originalError?: unknown,
  ) {
    super(message);
    this.name = 'CustomerRepositoryError';
  }
}

export default CustomerServiceError;
