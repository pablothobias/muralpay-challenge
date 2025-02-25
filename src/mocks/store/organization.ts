import { Organization, Organizations } from '@/store/organization/types';
import { RECIPIENT_TYPE } from '@/utils/constants';

const OrganizationType = RECIPIENT_TYPE;

export const mockOrganization: Organization = {
  id: 'org-123',
  name: 'Test Organization',
  organizationType: OrganizationType.BUSINESS,
  status: 'ACTIVE',
  createdAt: '2025-02-21T00:00:00Z',
  updatedAt: '2025-02-21T00:00:00Z',
};

export const mockOrganizations: Organizations = {
  results: [mockOrganization],
  total: 1,
};

export const mockOrganizationState = {
  loggedOrganization: mockOrganization,
  loading: false,
  error: undefined,
  organizations: mockOrganizations,
  setLoggedOrganization: jest.fn(),
  setOrganizationsState: jest.fn(),
  onLogout: jest.fn(),
};
