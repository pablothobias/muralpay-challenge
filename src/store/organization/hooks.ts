import OrganizationService from '@/features/organization/services';
import { OrganizationSchema } from '@/features/organization/types';

import useAuthStore from '../auth';

import useOrganizationStore from '.';

export const useOrganizationActions = () => {
  const { setLoggedOrganization } = useOrganizationStore((state) => state);
  const { login } = useAuthStore((state) => state);

  const createOrganization = async (data: OrganizationSchema, signal?: AbortSignal) => {
    try {
      setLoggedOrganization(undefined, true, undefined);
      const response = await OrganizationService.create(data, signal);
      if (response) {
        login({ ...response });
        setLoggedOrganization(response, false, undefined);
      }
      return response;
    } catch (error) {
      setLoggedOrganization(undefined, false, (error as Error).message);
      throw error;
    }
  };

  return {
    createOrganization,
  };
};
