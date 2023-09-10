import { verifyAuthentication } from "@/services/authentication-service";
import { createContext, useContext, useEffect } from "react";

export const AuthContext = createContext();

export function useAuth() {
  const auth = useContext(AuthContext);

  if (!auth) {
    throw new Error("useAuth must be used within AuthProvider")
  }

  return auth;
}

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    let localToken = getValueFromLocalStorage(process.env.NEXT_PUBLIC_API_HOST);
    setIsAuthenticated(localToken != null);

    if (isAuthenticated) {
      setToken(localToken);
    }

    setInitializing(false);
  }, [])

}