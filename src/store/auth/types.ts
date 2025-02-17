export type User = {
  id?: string;
  name?: string;
  organizationType?: string;
  status?: string;
  currenciesInfo?: unknown[];
};

export type AuthState = {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean | null;
  login: (user: User, token: string) => void;
  logout: () => void;
};
