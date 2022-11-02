import { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from 'next-auth/next';
import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '../auth/[...nextauth]';
type ResponseData = {};
export default async function subscribe(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const session = await unstable_getServerSession(req, res, authOptions);
  if (!session) {
    res.status(401).json({ error: 'Not authenticated' });
    return;
  }
  const { token } = req.body;
}
