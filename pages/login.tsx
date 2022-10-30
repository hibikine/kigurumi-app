import { Button, majorScale, Pane } from 'evergreen-ui';
import { signIn } from 'next-auth/react';
import PageHeader from '../components/PageHeader';
import type { NextPage } from 'next';
import Layout from '../components/Layout';

const Login: NextPage = () => {
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
          <PageHeader title="ログイン" />
          <Button onClick={() => signIn()}>ログイン</Button>
        </Pane>
      </Pane>
    </Layout>
  );
};

export default Login;
