import { Button, Heading, majorScale, Pane } from 'evergreen-ui';
import PageHeader from '../components/PageHeader';
import type { NextPage } from 'next';
import { useSession, signOut, ClientSafeProvider } from 'next-auth/react';
import Layout from '../components/Layout';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import styles from '../styles/User.module.scss';
import { OAuthProviderType } from 'next-auth/providers';
import { useCurrentUserQuery } from '../generated/request';

const Login: NextPage = () => {
  return (
    <Layout>
      <Pane className={styles.wrapper} width="100%" display="grid">
        <Pane className={styles.sidebar} />
      </Pane>
    </Layout>
  );
};

export default Login;
