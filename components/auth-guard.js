import { saveToSessionStorage, sessionStorageKeys } from "@/services/client-storage-service";
import { useAuth } from "@/components/auth-provider"
import { useRouter } from "next/router"
import { useEffect } from "react"

export function AuthGuard({ children }) {
  const { user, isInitializing, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isInitializing) return;
    if (!isAuthenticated) {
      saveToSessionStorage(sessionStorageKeys.signInRedirectUrl);
      router.push('/signin');
    }
  }, [isInitializing, isAuthenticated, user])

  if (isInitializing) {
    return <p>Iniciando...</p>
  }

  if (!isInitializing && isAuthenticated) {
    return <>{children}</>
  }
}