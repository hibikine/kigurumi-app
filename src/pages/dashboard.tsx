import type { InferGetServerSidePropsType, NextPage } from 'next';
import Layout from '../components/Layout';
import { sessionGetServerSideProps } from '../utils/sessionGetServerSideProps';
import { useNeedToLogin } from '../utils/hooks/useNeedToLogin';
import { Heading } from 'evergreen-ui';

const Dashboard: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = () => {
  useNeedToLogin();

  return (
    <Layout>
      <Heading is="h1" size={900}>
        ダッシュボード
      </Heading>
    </Layout>
  );
};
export default Dashboard;

export const getServerSideProps = sessionGetServerSideProps;
