import { Customer } from '../../../features/customer/interfaces';

export function createCustomer(
  id: string,
  name: string,
  email: string,
): Customer {
  if (!email.includes('@')) throw new Error('Invalid email format');
  return { id, name, email, createdAt: new Date() };
}
