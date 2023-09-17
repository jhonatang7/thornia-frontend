import { createContext, useContext, useEffect, useState } from "react";
import { getFromLocalStorage, localStorageKeys } from "@/services/client-storage-service";

export const AuthContext = createContext();

export function useAuth() {
  const auth = useContext(AuthContext);

  if (!auth) {
    throw new Error("useAuth must be used within AuthProvider")
  }

  return auth;
}

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isInitializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    let localToken = getFromLocalStorage(localStorageKeys.token);
    setIsAuthenticated(localToken != null);

    if (isAuthenticated) {
      setUser({ id: 'asdfghjkl' })
    }

    setInitializing(false);
  }, [])

  const state = {
    user,
    isAuthenticated,
    isInitializing
  }

  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>

}