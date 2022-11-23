import { Button, Heading, majorScale, Pane } from 'evergreen-ui';
import PageHeader from '../components/PageHeader';
import type { NextPage } from 'next';
import { useSession, signOut, ClientSafeProvider } from 'next-auth/react';
import Layout from '../components/Layout';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import styles from '../styles/User.module.scss';
import { OAuthProviderType } from 'next-auth/providers';

const Login: NextPage = () => {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const availableServers = useQuery({
    queryKey: ['availableServers'],
    queryFn: async () => {
      const res = await fetch('/api/auth/providers');
      return res.json() as Promise<
        {
          [key in OAuthProviderType]: ClientSafeProvider;
        }
      >;
    },
  });
  const visibleName = {
    email: 'メール',
    google: 'Google',
    twitter: 'Twitter',
  };
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
          <Heading>ログインアカウント一覧</Heading>
          {availableServers.data &&
            (
              Object.entries(availableServers.data) as [
                OAuthProviderType,
                ClientSafeProvider
              ][]
            ).map(([name, p]) => (
              <Pane
                key={name}
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Heading size={400}>
                  {name in visibleName
                    ? visibleName[name as keyof typeof visibleName]
                    : p.name}
                </Heading>
                <Button appearance="primary" intent="danger" onClick={() => {}}>
                  ログアウト
                </Button>
              </Pane>
            ))}
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
