import { createContext, useContext, useEffect, useState } from "react";
import {
  getFromLocalStorage,
  localStorageKeys,
  removeFromLocalStorage,
} from "@/services/client-storage-service";
import { getUser } from "@/services/account-service";
import { isEmpty } from "@/utils/is-empty";

export const AuthContext = createContext();

export function useAuth() {
  const auth = useContext(AuthContext);

  if (!auth) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return auth;
}

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isInitializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);

  const updateUser = async () => {
    let userUpdated = await getUser();
    setUser(userUpdated);
    return userUpdated;
  };

  const verifyAuthentication = async () => {
    let localToken = getFromLocalStorage(localStorageKeys.token);
    let tokenExists = localToken != null;
    let userUpdated = {};

    if (tokenExists) {
      userUpdated = await updateUser();
    }

    setIsAuthenticated(!isEmpty(userUpdated));
  };

  const logOut = () => {
    removeFromLocalStorage(localStorageKeys.token);
    setIsAuthenticated(false);
    setUser(null);
  };

  useEffect(() => {
    verifyAuthentication();
    setInitializing(false);
  }, []);

  const state = {
    user,
    updateUser,
    isAuthenticated,
    verifyAuthentication,
    isInitializing,
    logOut,
  };

  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
}
