import { IncomingMessage, ServerResponse } from 'http';
import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from './auth/[...nextauth]';

const handler = async (req: IncomingMessage, res: ServerResponse) => {
  const session = await unstable_getServerSession(req as any, res, authOptions);
  if (!session) {
    (res as any).send(401).send({ error: 'Please login' });
    return;
  }
  (res as any).send({ content: 'This is protected content!' });
};

export default handler;
