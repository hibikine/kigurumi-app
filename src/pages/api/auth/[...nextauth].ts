import NextAuth, { CallbacksOptions, NextAuthOptions } from 'next-auth';
import EmailProvider from 'next-auth/providers/email';
import TwitterProvider from 'next-auth/providers/twitter';
import GoogleProvider from 'next-auth/providers/google';
// import { FaunaAdapter } from '@next-auth/fauna-adapter';
// import { getFaunaClient } from '../../../utils/database';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from '../../../lib/prismadb';
import sendVerificationRequest from '../../../lib/sendVerificationRequest';
// if (!process.env.TWITTER_CLIENT_ID || !process.env.TWITTER_CLIENT_SECRET) {
//   throw new Error('TWITTER_CLIENT_ID and TWITTER_CLIENT_SECRET must be set');
// }
// if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
//   throw new Error('Missing Google environment variables');
// }
// if (
//   !process.env.EMAIL_SERVER_USER ||
//   !process.env.EMAIL_SERVER_PASSWORD ||
//   !process.env.EMAIL_SERVER_HOST ||
//   !process.env.EMAIL_SERVER_PORT ||
//   !process.env.EMAIL_FROM
// ) {
//   throw new Error('Missing email environment variables');
// }
/*if (
  !process.env.FAUNADB_SECRET ||
  !process.env.FAUNADB_SCHEME ||
  !process.env.FAUNADB_PORT
) {
  throw new Error('Missing FaunaDB environment variables');
}
const client = getFaunaClient();*/

const providers: NextAuthOptions['providers'] = [];

if (process.env.TWITTER_CLIENT_ID && process.env.TWITTER_CLIENT_SECRET) {
  providers.push(
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID,
      clientSecret: process.env.TWITTER_CLIENT_SECRET,
      version: '2.0',
    })
  );
}
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  providers.push(
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  );
}
if (
  process.env.EMAIL_SERVER_HOST &&
  process.env.EMAIL_SERVER_PORT &&
  process.env.EMAIL_SERVER_USER &&
  process.env.EMAIL_SERVER_PASSWORD &&
  process.env.EMAIL_FROM
) {
  providers.push(
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: Number(process.env.EMAIL_SERVER_PORT),
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
      sendVerificationRequest,
    })
  );
}

export const authOptions: NextAuthOptions = {
  providers,
  /*adapter: FirestoreAdapter({
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID,
  }),*/
  // adapter: FaunaAdapter(client),
  adapter: PrismaAdapter(prisma),
  theme: {
    colorScheme: 'light' as const,
    logo: '/logo.svg',
  },
  callbacks: {
    async session({
      session,
      user,
    }: Parameters<CallbacksOptions['session']>[0]) {
      const newSession: typeof session & {
        user?: typeof session['user'] & { id?: string };
      } = session;
      if (user && newSession.user) {
        newSession.user.id = user.id;
      }
      return newSession;
    },
  },
  pages: {
    signIn: '/login',
  },
};

export default NextAuth(authOptions);
