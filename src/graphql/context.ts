import type { User } from '@prisma/client';
import type { IncomingMessage } from 'http';
import { getSession } from 'next-auth/react';
import prisma from '../lib/prismadb';
import { getSessionToken } from '../utils/session';

export type Context = {
  prisma: typeof prisma;
  currentUser: User | null;
};

export const createContext = async ({
  req,
}: {
  req: IncomingMessage;
}): Promise<Context> => {
  const session = await getSession({
    req,
  });
  const email = session?.user?.email;
  const sessionToken = getSessionToken(req);
  if (!sessionToken) {
    return { prisma, currentUser: null };
  }
  const currentUser = await prisma.session.findUnique({
    where: { sessionToken },
    select: { user: true },
  });
  if (currentUser === null) {
    return { prisma, currentUser: null };
  }
  return { prisma, currentUser: currentUser.user };
};
