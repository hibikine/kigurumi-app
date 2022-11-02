import { GetServerSideProps } from 'next';
import { Session, unstable_getServerSession } from 'next-auth';
import { authOptions } from '../pages/api/auth/[...nextauth]';

/**
 * ログイン済みのユーザーの場合、セッションを取得するgetServerSideProps
 * ログインしていない場合は、ログインページにリダイレクトする
 */
export const sessionGetServerSideProps: GetServerSideProps<{
  session: Session;
}> = async ({ req, res }) => {
  const session = await unstable_getServerSession(req, res, authOptions);
  if (!session) {
    return {
      redirect: {
        destination: `/login${req.url ? `?redirect=${req.url}` : ''}`,
        permanent: false,
      },
    };
  }
  return {
    props: {
      session,
    },
  };
};
