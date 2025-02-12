export interface AuthState {
  user: { id: string; email: string } | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (user: { id: string; email: string }, token: string) => void;
  logout: () => void;
}
