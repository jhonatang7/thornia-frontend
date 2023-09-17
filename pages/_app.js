import { AuthProvider } from "@/components/providers/auth-provider";
import "../styles/globals.css";
import { AuthGuard } from "@/components/auth-guard";
import { ThemeProvider } from "@/components/providers/theme-provider";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <AuthProvider>
        {Component.requireAuth ? (
          <AuthGuard>
            <Component {...pageProps} />
          </AuthGuard>
        ) : (
          <Component {...pageProps} />
        )}
      </AuthProvider>
    </ThemeProvider>
  );
}

export default MyApp;
