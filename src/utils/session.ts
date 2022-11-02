import { IncomingMessage } from 'http';
import { GetServerSideProps } from 'next';
import { SESSION_TOKEN_COOKIE } from './constants';
import { JSONCookie } from 'cookie-parser';

export const getSessionToken = (req: IncomingMessage): string | null =>
  ((req as any)?.cookies ??
    (req?.headers?.cookie && JSONCookie(req.headers.cookie)))?.[
    SESSION_TOKEN_COOKIE
  ] || null;
