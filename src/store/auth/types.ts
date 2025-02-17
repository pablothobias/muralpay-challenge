export interface AuthState {
  user?: {
    id?: string;
    name?: string;
    organizationType?: string;
    status?: string;
    currenciesInfo?: unknown[];
  } | null;
  token?: string | null;
  isAuthenticated?: boolean | null;
  login: (
    user: {
      id?: string;
      name?: string;
      organizationType?: string;
      status?: string;
      currenciesInfo?: unknown[];
    },
    token?: string,
  ) => void;
  logout: () => void;
}
