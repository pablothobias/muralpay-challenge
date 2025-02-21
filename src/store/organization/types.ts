import {
  type OrganizationEmptyState,
  type OrganizationResponse,
  type OrganizationsListResponse,
} from '@/features/organization/types';

export type Organizations = OrganizationsListResponse | OrganizationEmptyState | undefined;
export type Organization = OrganizationResponse | undefined;

export type OrganizationState = {
  loggedOrganization: Organization;
  loading: boolean | undefined;
  error: string | undefined;
  organizations: Organizations;
  setLoggedOrganization: (organization?: Organization, loading?: boolean, error?: string) => void;
  setOrganizationsState: (
    organizations: Organizations,
    loading: boolean,
    error: string | undefined,
  ) => void;
  onLogout: () => void;
};
