import Queries from '@testing-library/dom/types/queries';
import { render as defaultRender, RenderResult } from '@testing-library/react';
import { SessionProvider } from 'next-auth/react';
// import { RouterContext } from 'next/dist/next-server/lib/router-context';
import { RouterContext } from 'next/dist/shared/lib/router-context';
import { NextRouter } from 'next/router';
import React from 'react';

export const render = (
  children: React.ReactElement
): RenderResult<typeof Queries, HTMLElement> => {
  const mockRouter: NextRouter = {
    route: '/',
    pathname: '/',
    query: {},
    asPath: '/',
    basePath: '/',
    isLocaleDomain: true,
    isReady: true,
    push: jest.fn(),
    prefetch: jest.fn(),
    replace: jest.fn(),
    reload: jest.fn(),
    back: jest.fn(),
    beforePopState: jest.fn(),
    events: {
      on: jest.fn(),
      off: jest.fn(),
      emit: jest.fn(),
    },
    isFallback: false,
    isPreview: false,
  };

  return defaultRender(
    <SessionProvider session={{} as any}>
      <RouterContext.Provider value={mockRouter}>
        {children}
      </RouterContext.Provider>
    </SessionProvider>
  );
};
