import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

interface AuthContextValue {
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({
  children,
}: AuthProviderProps): ReactNode => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const login = (token: string): void => {
    if (token.trim().length > 0) {
      setIsAuthenticated(true);
    }
  };

  const logout = (): void => {
    setIsAuthenticated(false);
  };

  const contextValue = useMemo<AuthContextValue>(
    () => ({
      isAuthenticated,
      login,
      logout,
    }),
    [isAuthenticated],
  );

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};