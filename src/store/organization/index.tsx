import { create } from 'zustand';
import { createJSONStorage, devtools, persist, subscribeWithSelector } from 'zustand/middleware';
import { Organizations, type OrganizationState } from './types';

const useOrganizationStore = create<OrganizationState>()(
  devtools(
    subscribeWithSelector(
      persist(
        (set) => ({
          loggedOrganization: undefined,
          organizations: { results: [], total: 0 },
          loading: false,
          error: undefined,
          setLoggedOrganization: (organization, loading, error) =>
            set({ loggedOrganization: organization!, loading, error }),
          setOrganizationsState: (
            organizations: Organizations,
            loading: boolean,
            error: string | undefined,
          ) => set({ organizations, loading, error }),
          onLogout: () =>
            set({ organizations: { results: [], total: 0 }, loading: false, error: undefined }),
        }),
        { name: 'organization', storage: createJSONStorage(() => sessionStorage) },
      ),
    ),
  ),
);

export default useOrganizationStore;
