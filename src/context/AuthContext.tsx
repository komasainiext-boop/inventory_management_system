import { useMemo, useState, type ReactNode } from "react";

import { AuthContext, type AuthContextValue } from "./AuthContextValue";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps): ReactNode => {
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
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
