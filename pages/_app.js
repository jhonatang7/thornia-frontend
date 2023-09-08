import { AuthProvider } from '@/components/auth-provider'
import '../styles/globals.css'
import { AuthGuard } from '@/components/auth-guard'

function MyApp({ Component, pageProps }) {
  return <AuthProvider>
    {Component.requireAuth ? (
      <AuthGuard>
        <Component {...pageProps} />
      </AuthGuard>
    ) : (
      <Component {...pageProps} />
    )}
  </AuthProvider>
}

export default MyApp
