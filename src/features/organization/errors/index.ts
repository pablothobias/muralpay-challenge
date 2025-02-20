export class OrganizationServiceError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly originalError?: unknown,
  ) {
    super(message);
    this.name = 'OrganizationServiceError';
  }
}

export class OrganizationValidationError extends OrganizationServiceError {
  constructor(
    message: string,
    public readonly code: string,
    public readonly originalError?: unknown,
  ) {
    super(message, code, originalError);
    this.name = 'OrganizationValidationError';
  }
}
