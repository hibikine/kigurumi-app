import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

/**
 * ログインしていない場合はログインページにリダイレクトするhooks
 */
export const useNeedToLogin = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (status === 'loading' || status === 'authenticated') return;
    if (!session) {
      router.push(`/login?redirect=${router.asPath}`);
    }
  }, [session, router, status]);
};
