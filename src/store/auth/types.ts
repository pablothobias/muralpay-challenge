export type User = {
  id: string;
  name?: string;
  organizationType?: string;
  status?: string;
  currenciesInfo?: {
    id: string;
    name: string;
    code: string;
  }[];
};

export type AuthState = {
  user: User | null;
  isAuthenticated: boolean | null;
  login: (user: User) => void;
  logout: () => void;
};
