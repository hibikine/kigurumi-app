import { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from 'next-auth/next';
import { getFaunaClient } from '../../utils/database';
import { authOptions } from './auth/[...nextauth]';
import { query as q } from 'faunadb';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await unstable_getServerSession(req as any, res, authOptions);
  if (!session || !session?.user?.email) {
    res.status(401).send({ error: 'Please login' });
    return;
  }
  const fauna = getFaunaClient();
  const { data } = await fauna.query<any>(
    q.Get(q.Match(q.Index('user_by_email'), session.user.email))
  );
  const { data: data2 } = await fauna.query<any>(
    q.Get(q.Match(q.Index('account_by_provider_and_provider_account_id')))
  );
  // res.status(200).json(ret);
  res.status(200).send({ content: 'This is protected content!' });
};

export default handler;
