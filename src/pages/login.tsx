import { majorScale, Pane, Text, TextInputField } from 'evergreen-ui';
import {
  signIn,
  getProviders,
  getCsrfToken,
  ClientSafeProvider,
} from 'next-auth/react';
import PageHeader from '../components/PageHeader';
import type {
  NextPage,
  InferGetServerSidePropsType,
  GetServerSideProps,
} from 'next';
import Layout from '../components/Layout';
import LoginButton from '../components/LoginButton';
import GoogleLogo from '../public/googleloginlogo.svg';
import TwitterLogoBlue from '../public/Twitter_Logo_Blue.svg';

const Login: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ providers, csrfToken }) => {
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
          <Pane display="flex" flexDirection="column" alignItems="center">
            <Pane
              width="100%"
              marginX={majorScale(2)}
              maxWidth="350px"
              padding={majorScale(2)}
              elevation={1}
              display="flex"
              flexDirection="column"
              alignItems="stretch"
            >
              {!providers ? (
                <div>ロード中...</div>
              ) : (
                Object.values(providers)
                  .filter(({ name }) => name !== 'Email')
                  .map(
                    (
                      provider
                    ): ClientSafeProvider & {
                      logo?: any;
                      logoSize?: number;
                    } => {
                      if (provider.name === 'Twitter') {
                        return {
                          logo: TwitterLogoBlue,
                          logoSize: 28,
                          ...provider,
                        };
                      } else if (provider.name === 'Google') {
                        return {
                          logo: GoogleLogo,
                          logoSize: 40,
                          ...provider,
                        };
                      }
                      return provider;
                    }
                  )
                  .map((provider) => (
                    <LoginButton
                      key={provider.name}
                      name={provider.name}
                      onClick={() => signIn(provider.id)}
                      logo={provider.logo}
                      logoSize={provider.logoSize}
                    />
                  ))
              )}
              <Pane display="flex" alignItems="center" marginY={majorScale(1)}>
                <Pane borderTop="1px solid #aaa" flexGrow="1" />
                <Text size="small">もしくは</Text>
                <Pane borderTop="1px solid #aaa" flexGrow="1" />
              </Pane>
              <form method="post" action="/api/auth/signin/email">
                <input
                  name="csrfToken"
                  type="hidden"
                  defaultValue={csrfToken ?? undefined}
                />
                <TextInputField
                  type="email"
                  name="email"
                  label="メールアドレス"
                  placeholder="mail@example.com"
                  id="email"
                />
                <LoginButton name="Eメール" type="submit" />
              </form>
            </Pane>
          </Pane>
        </Pane>
      </Pane>
    </Layout>
  );
};

export default Login;
type PromiseType<T extends Promise<any>> = T extends Promise<infer P>
  ? P
  : never;

export const getServerSideProps: GetServerSideProps<{
  providers: PromiseType<ReturnType<typeof getProviders>>;
  csrfToken: string | null;
}> = async (context) => {
  const providers = await getProviders();
  const csrfToken = await getCsrfToken(context);
  return {
    props: { providers, csrfToken: csrfToken ?? null },
  };
};
