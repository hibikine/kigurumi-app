import { useSession } from 'next-auth/react';

const useIsLogin = (): boolean => {
  const { data: session } = useSession();
  return !!session;
};
export default useIsLogin;
