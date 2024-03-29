import { Analytics } from '@vercel/analytics/react';
import '../styles/globals.scss';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import React, { useState } from 'react';
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
import Head from 'next/head';

const NEXT_PUBLIC_GRAPHQL_ENDPOINT = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT;
if (!NEXT_PUBLIC_GRAPHQL_ENDPOINT) {
  throw new Error('NEXT_PUBLIC_GRAPHQL_ENDPOINT is not defined');
}

export const client = new ApolloClient({
  uri: NEXT_PUBLIC_GRAPHQL_ENDPOINT,
  cache: new InMemoryCache(),
});

config({ ssrFadeout: true });

const theme = mergeTheme(defaultTheme, {});

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session; dehydratedState: unknown }>) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
        />
        <meta name="application-name" content="きぐあぷり" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="きぐあぷり" />
        <meta name="description" content="JMoFの○○合わせをまとめてチェック" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-config" content="/icons/browserconfig.xml" />
        <meta name="msapplication-TileColor" content="#2B5797" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="theme-color" content="#000000" />

        <link rel="apple-touch-icon" href="/icons/touch-icon-iphone.png" />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/icons/touch-icon-ipad.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/icons/touch-icon-iphone-retina.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="167x167"
          href="/icons/touch-icon-ipad-retina.png"
        />

        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/icons/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/icons/favicon-16x16.png"
        />
        <link rel="manifest" href="/manifest.json" />
        <link
          rel="mask-icon"
          href="/icons/safari-pinned-tab.svg"
          color="#5bbad5"
        />
        <link rel="shortcut icon" href="/favicon.ico" />
        {
          //<link
          // rel="stylesheet"
          // href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"
          ///>
        }
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:url" content="https://yourdomain.com" />
        <meta name="twitter:title" content="きぐあぷり" />
        <meta
          name="twitter:description"
          content="JMoFの○○合わせをまとめてチェック"
        />
        <meta name="twitter:image" content="https://kigu.app/og-image.png" />
        <meta name="twitter:creator" content="@kiguapp" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="きぐあぷり" />
        <meta
          property="og:description"
          content="JMoFの○○合わせをまとめてチェック"
        />
        <meta property="og:site_name" content="きぐあぷり" />
        <meta property="og:url" content="https://kigu.app" />
        <meta property="og:image" content="https://kigu.app/og-image.png" />
      </Head>
      <SessionProvider session={session}>
        <ApolloProvider client={client}>
          <QueryClientProvider client={queryClient}>
            <Hydrate state={pageProps.dehydratedState}>
              <ThemeProvider value={theme}>
                <Component {...pageProps} />
              </ThemeProvider>
            </Hydrate>
          </QueryClientProvider>
        </ApolloProvider>
      </SessionProvider>
      <Analytics />
    </>
  );
}

export default MyApp;
