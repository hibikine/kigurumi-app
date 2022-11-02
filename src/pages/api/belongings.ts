import type { NextApiRequest, NextApiResponse } from 'next';
import { Belonging, PrismaClient } from '@prisma/client';
import { unstable_getServerSession } from 'next-auth';
import { authOptions } from './auth/[...nextauth]';
import { getSessionToken } from '../../utils/session';

const belongingDataKeys = ['id', 'eventId', 'name'] as const;
type BelongingData = Pick<Belonging, typeof belongingDataKeys[number]>;
export type ResponseData =
  | {
      data: BelongingData[];
    }
  | { error: string };
export type ErrorResponseData = { error: string };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const session = unstable_getServerSession(req, res, authOptions);
  if (!session) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }
  const prisma = new PrismaClient();
  const sessionToken = getSessionToken(req);
  if (!sessionToken) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }
  const userId =
    (
      await prisma.session.findUnique({
        where: {
          sessionToken,
        },
        select: {
          userId: true,
        },
      })
    )?.userId ?? null;
  if (!userId) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }
  if (req.method === 'GET') {
    const belongings = await prisma.belonging.findMany({
      where: {
        userId,
      },
      select: {
        id: true,
        eventId: true,
        name: true,
      },
    });
    res.status(200).json({ data: belongings });
  }

  //res.status(200).json({ message: 'Hello from Next.js!' });
}
