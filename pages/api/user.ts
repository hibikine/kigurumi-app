// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from 'next-auth/next';
import authOptions from './auth/[...nextauth]';

type Data = {
  id: number;
};
type ErrorRes = {
  error: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | ErrorRes>
) {
  const session = await unstable_getServerSession(req as any, res, authOptions);
  if (!session) {
    res.status(401).send({ error: 'Please login' });
    return;
  }
  console.log(session);
  // res.status(200).json({ id: id });
}
