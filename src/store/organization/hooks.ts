import OrganizationService from '@/features/organization/services';
import { OrganizationSchema } from '@/features/organization/types';
import useOrganizationStore from '.';
import useAuthStore from '../auth';

export const useOrganizationActions = () => {
  const { setLoggedOrganization } = useOrganizationStore((state) => state);
  const { login } = useAuthStore((state) => state);

  const createOrganization = async (data: OrganizationSchema) => {
    try {
      setLoggedOrganization(undefined, true, undefined);
      const response = await OrganizationService.create(data);
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
