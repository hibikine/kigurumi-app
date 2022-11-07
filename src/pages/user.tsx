import { Button, majorScale, Pane } from 'evergreen-ui';
import PageHeader from '../components/PageHeader';
import type { NextPage } from 'next';
import { useSession, signOut } from 'next-auth/react';
import Layout from '../components/Layout';

const Login: NextPage = () => {
  const { data: session } = useSession();
  return (
    <Layout>
      <Pane width="100%" display="grid" gridTemplateColumns="236px 1fr">
        <Pane />
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
