import {
  type OrganizationEmptyState,
  type OrganizationResponse,
  type OrganizationListResponse,
} from '@/features/organization/types';

export type Organizations = OrganizationListResponse | OrganizationEmptyState | undefined;
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
