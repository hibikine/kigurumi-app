import Head from 'next/head';

type Props = { title: string };
const absolutePath = (path?: string) => `https://app.hikage.works${path || ''}`;

const appName = 'きぐあぷり';
const description = 'いつでもどこでも着ぐるみ活動をサポートするアプリ';

const DocumentHead = ({ title }: Props) => {
  return (
    <Head>
      <title>
        {appName}
        {title.length > 0 && ` - ${title}`}
      </title>
      <meta property="og:title" content={appName} />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=0.65, maximum-scale=5.0, minimum-scale=0.65"
      />
      <meta property="og:url" content={absolutePath()} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={absolutePath('/og-image.png')} />
      <meta property="twitter:card" content="summary" />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:site" content="@hikageworks" />
      <meta name="twitter:creator" content="@hikageworks" />
      <meta name="description" content={description} />
      <meta
        property="twitter:image"
        content={absolutePath('/twitter-og.png')}
      />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};

export default DocumentHead;
