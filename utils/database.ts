import { Client as FaunaClient } from 'faunadb';
if (
  !process.env.FAUNA_SECRET ||
  !process.env.FAUNA_SCHEME ||
  !process.env.FAUNA_DOMAIN ||
  !process.env.FAUNA_PORT
) {
  throw new Error('Missing environment variables');
}
export const getFaunaClient = () =>
  new FaunaClient({
    secret: process.env.FAUNADB_SECRET!,
    scheme: process.env.FAUNADB_SCHEME! as 'http' | 'https',
    domain: process.env.FAUNADB_DOMAIN!,
    port: parseInt(process.env.FAUNADB_PORT || '', 10),
  });
