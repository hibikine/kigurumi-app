import { Client as FaunaClient } from 'faunadb';
export const getFaunaClient = () =>
  new FaunaClient({
    secret: process.env.FAUNADB_SECRET,
    scheme: process.env.FAUNADB_SCHEME as 'http' | 'https',
    domain: process.env.FAUNADB_DOMAIN,
    port: parseInt(process.env.FAUNADB_PORT || '', 10),
  });
