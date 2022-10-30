import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { defaultTheme, mergeTheme, ThemeProvider } from 'evergreen-ui';
import { SessionProvider } from 'next-auth/react';
import { Session } from 'next-auth';

const theme = mergeTheme(defaultTheme, {});

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) {
  return (
    <SessionProvider session={session}>
      <ThemeProvider value={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </SessionProvider>
  );
}

export default MyApp;
