import { act, renderHook } from '@testing-library/react';
import useAuthStore from '../auth';
import { mockUser } from '@/mocks/store/auth';
import Cookies from 'js-cookie';

jest.mock('js-cookie', () => ({
  get: jest.fn(),
  set: jest.fn(),
  remove: jest.fn(),
}));

describe('Auth Store', () => {
  beforeEach(() => {
    useAuthStore.setState({
      user: null,
      isAuthenticated: false,
    });
    jest.clearAllMocks();
  });

  describe('login', () => {
    it('should set user and authentication state', () => {
      act(() => {
        useAuthStore.getState().login(mockUser);
      });

      const state = useAuthStore.getState();
      expect(state.user).toEqual(mockUser);
      expect(state.isAuthenticated).toBe(true);
      expect(Cookies.set).toHaveBeenCalledWith(
        'auth-storage',
        expect.any(String),
        expect.objectContaining({
          expires: 1,
          path: '/',
          sameSite: 'Strict',
          secure: false,
        }),
      );
    });
  });

  describe('logout', () => {
    it('should clear user and authentication state', () => {
      act(() => {
        useAuthStore.setState({
          user: mockUser,
          isAuthenticated: true,
        });
      });

      act(() => {
        useAuthStore.getState().logout();
      });

      const state = useAuthStore.getState();
      expect(state.user).toBeNull();
      expect(state.isAuthenticated).toBe(false);
      expect(Cookies.remove).toHaveBeenCalledWith('auth-storage');
      expect(Cookies.remove).toHaveBeenCalledWith('user');
      expect(Cookies.remove).toHaveBeenCalledWith('on-behalf-of');
    });
  });

  describe('persistence', () => {
    it('should persist state to cookies', () => {
      act(() => {
        useAuthStore.setState({
          user: mockUser,
          isAuthenticated: true,
        });
      });

      expect(Cookies.set).toHaveBeenCalledWith(
        'auth-storage',
        expect.any(String),
        expect.objectContaining({
          expires: 1,
          path: '/',
          sameSite: 'Strict',
          secure: false,
        }),
      );
    });

    it('should load persisted state from cookies', () => {
      const persistedState = {
        state: {
          user: mockUser,
          isAuthenticated: true,
        },
      };

      (Cookies.get as jest.Mock).mockReturnValue(JSON.stringify(persistedState));

      const { result } = renderHook(() => useAuthStore());

      act(() => {
        useAuthStore.setState(persistedState.state);
      });

      expect(result.current.user).toEqual(mockUser);
      expect(result.current.isAuthenticated).toBe(true);
    });
  });
});
