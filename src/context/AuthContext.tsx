import { useMemo, useState, type ReactNode } from "react";

import { AuthContext, type AuthContextValue } from "./AuthContextValue";

interface AuthProviderProps {
  children: ReactNode;
}

const AUTH_STORAGE_KEY = "inventory_is_authenticated";

export const AuthProvider = ({ children }: AuthProviderProps): ReactNode => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    const storedValue = localStorage.getItem(AUTH_STORAGE_KEY);

    console.log("AUTH PROVIDER INITIAL:", storedValue);

    return storedValue === "true";
  });

  console.log(
    "AUTH PROVIDER:",
    isAuthenticated,
    localStorage.getItem(AUTH_STORAGE_KEY),
  );

  const login = (token: string): void => {
    if (token.trim().length > 0) {
      localStorage.setItem(AUTH_STORAGE_KEY, "true");
      setIsAuthenticated(true);
    }
  };

  const logout = (): void => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
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
