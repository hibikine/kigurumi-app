import { Button, majorScale, Pane } from 'evergreen-ui';
import PageHeader from '../components/PageHeader';
import type { NextPage } from 'next';
import { useSession, signOut } from 'next-auth/react';
import Layout from '../components/Layout';
import { useQueryClient } from '@tanstack/react-query';
import styles from '../styles/User.module.scss';

const Login: NextPage = () => {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  return (
    <Layout>
      <Pane className={styles.wrapper} width="100%" display="grid">
        <Pane className={styles.sidebar} />
        <Pane
          width="100%"
          display="flex"
          flexDirection="column"
          justifyContent="flex-start"
          padding={majorScale(5)}
          maxWidth={majorScale(143)}
        >
          <PageHeader title="ユーザー" />
          {session?.user?.email}
          <Button
            onClick={() => {
              queryClient.clear();
              signOut();
            }}
          >
            ログアウト
          </Button>
        </Pane>
      </Pane>
    </Layout>
  );
};

export default Login;
