import { IncomingMessage } from 'http';
import { GetServerSideProps } from 'next';
import {
  SESSION_TOKEN_COOKIE_HTTP,
  SESSION_TOKEN_COOKIE_HTTPS,
} from './constants';
import { JSONCookie } from 'cookie-parser';

export const getSessionToken = (req: IncomingMessage): string | null => {
  return (
    ((req as any)?.cookies ??
      (req?.headers?.cookie && JSONCookie(req.headers.cookie)))?.[
      req.headers['x-forwarded-proto'] === 'https' ||
      process.env.HTTPS === 'true'
        ? SESSION_TOKEN_COOKIE_HTTPS
        : SESSION_TOKEN_COOKIE_HTTP
    ] || null
  );
};
