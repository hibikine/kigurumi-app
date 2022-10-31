import '../styles/globals.css';
import { useState } from 'react';
import type { AppProps } from 'next/app';
import { defaultTheme, mergeTheme, ThemeProvider } from 'evergreen-ui';
import { SessionProvider } from 'next-auth/react';
import { Session } from 'next-auth';
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import config from 'react-reveal/globals';

config({ ssrFadeout: true });

const theme = mergeTheme(defaultTheme, {});

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session; dehydratedState: unknown }>) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <ThemeProvider value={theme}>
            <Component {...pageProps} />
          </ThemeProvider>
        </Hydrate>
      </QueryClientProvider>
    </SessionProvider>
  );
}

export default MyApp;
