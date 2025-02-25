import { act, renderHook } from '@testing-library/react';
import useOrganizationStore from '../organization';
import { mockOrganization, mockOrganizations } from '@/mocks/store/organization';

describe('Organization Store', () => {
  beforeEach(() => {
    useOrganizationStore.setState({
      loggedOrganization: undefined,
      organizations: { results: [], total: 0 },
      loading: false,
      error: undefined,
    });
    sessionStorage.clear();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('setLoggedOrganization', () => {
    it('should update logged organization state', () => {
      const loading = true;
      const error = 'Test error';

      act(() => {
        useOrganizationStore.getState().setLoggedOrganization(mockOrganization, loading, error);
      });

      const state = useOrganizationStore.getState();
      expect(state.loggedOrganization).toEqual(mockOrganization);
      expect(state.loading).toBe(loading);
      expect(state.error).toBe(error);
    });

    it('should clear logged organization when undefined is passed', () => {
      act(() => {
        useOrganizationStore.getState().setLoggedOrganization(undefined);
      });

      expect(useOrganizationStore.getState().loggedOrganization).toBeUndefined();
    });
  });

  describe('setOrganizationsState', () => {
    it('should update organizations list state', () => {
      const loading = true;
      const error = 'Test error';

      act(() => {
        useOrganizationStore.getState().setOrganizationsState(mockOrganizations, loading, error);
      });

      const state = useOrganizationStore.getState();
      expect(state.organizations).toEqual(mockOrganizations);
      expect(state.loading).toBe(loading);
      expect(state.error).toBe(error);
    });
  });

  describe('onLogout', () => {
    it('should reset store state on logout', () => {
      act(() => {
        useOrganizationStore.setState({
          loggedOrganization: mockOrganization,
          organizations: mockOrganizations,
          loading: true,
          error: 'Some error',
        });
      });

      act(() => {
        useOrganizationStore.getState().onLogout();
      });

      const state = useOrganizationStore.getState();
      expect(state.loggedOrganization).toBeUndefined();
      expect(state.organizations).toEqual({ results: [], total: 0 });
      expect(state.loading).toBe(false);
      expect(state.error).toBeUndefined();
    });
  });

  describe('persistence', () => {
    it('should persist state to session storage', () => {
      const state = {
        loggedOrganization: mockOrganization,
        organizations: mockOrganizations,
        loading: false,
        error: undefined,
      };

      act(() => {
        useOrganizationStore.setState(state);
      });

      const persistedJson = sessionStorage.getItem('organization');
      const persistedState = persistedJson ? JSON.parse(persistedJson) : {};
      expect(persistedState.state).toEqual(state);
    });

    it('should load persisted state from session storage', () => {
      const initialState = {
        loggedOrganization: mockOrganization,
        organizations: mockOrganizations,
        loading: false,
        error: undefined,
      };

      sessionStorage.setItem('organization', JSON.stringify({ state: initialState }));

      let result;
      act(() => {
        result = renderHook(() => useOrganizationStore()).result;
        useOrganizationStore.setState(initialState);
      });

      expect(result!.current.loggedOrganization).toEqual(mockOrganization);
      expect(result!.current.organizations).toEqual(mockOrganizations);
      expect(result!.current.loading).toBe(false);
      expect(result!.current.error).toBeUndefined();
    });

    it('should handle undefined values correctly', async () => {
      const initialState = {
        loggedOrganization: undefined,
        organizations: { results: [], total: 0 },
        loading: false,
        error: undefined,
      };

      sessionStorage.setItem('organization', JSON.stringify({ state: initialState }));

      let result;
      act(() => {
        result = renderHook(() => useOrganizationStore()).result;
        useOrganizationStore.setState(initialState);
      });

      expect(result!.current.loggedOrganization).toBeUndefined();
      expect(result!.current.organizations).toEqual({ results: [], total: 0 });
      expect(result!.current.loading).toBe(false);
      expect(result!.current.error).toBeUndefined();
    });
  });
});
