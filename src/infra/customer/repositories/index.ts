import apiClient from '@/config/api.config';
import { Customer } from '@/features/customer/interfaces';

const CustomerRepository = {
  async save(customer: Customer): Promise<Customer> {
    const response = await apiClient.post('/customers', customer);
    return response.data;
  },

  async findById(id: string): Promise<Customer | null> {
    const response = await apiClient.get(`/customers/${id}`);
    return response.data ? response.data : null;
  },
};
export default CustomerRepository;
