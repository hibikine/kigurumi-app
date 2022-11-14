// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import {
  isEmailEnabled,
  isGoogleEnabled,
  isTwitterEnabled,
} from '../auth/[...nextauth]';

type Data = {
  email: boolean;
  google: boolean;
  twitter: boolean;
};

export default function handler(
  _req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({
    email: isEmailEnabled,
    google: isGoogleEnabled,
    twitter: isTwitterEnabled,
  });
}
