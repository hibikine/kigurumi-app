# Kigu App

![Vercel](https://therealsujitk-vercel-badge.vercel.app/?app=kigurumi-app)

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## サーバー側MySQL設定

```sql
create database if not exists kiguapp character set utf8mb4 collate utf8mb4_ja_0900_as_cs_ks;
create database if not exists kiguapp_shadow character set utf8mb4 collate utf8mb4_ja_0900_as_cs_ks;
```

## Prisma Studioの起動
```bash
yarn prisma studio
```

## マイグレーションファイルの生成
### Schemaを変更した場合

1. `yarn prisma migrate dev --create-only` でマイグレーションファイルだけを生成させる
2. `%s/COLLATE utf8mb4_ /COLLATE utf8mb4_ja_0900_as_cs_ks/g` で置き換えする
3. `yarn prisma migrate dev` を実行する

## 開発環境用のSSL証明書の生成

[mkcert](https://github.com/FiloSottile/mkcert#installation)を入れる

Ubuntu環境の場合は以下の通り

```bash
sudo apt install libnss3-tools

curl -JLO "https://dl.filippo.io/mkcert/latest?for=linux/amd64"
chmod +x mkcert-v*-linux-amd64
sudo cp mkcert-v*-linux-amd64 /usr/local/bin/mkcert
```

その後、認証局を生成する

```bash
cd kigurumi-app
mkcert -install
```

localhostの証明書を発行する

```bash
mkcert localhost
```

## リンク

- [きぐあぷり](https://app.hikage.works/)
- [Twitter Developers](https://developer.twitter.com/en/portal/projects/1586553116706582528/settings)
- [kigurumi-app – Overview - Vercel](https://vercel.com/hibikine/kigurumi-app)
- [Google Search Console Overview](https://search.google.com/search-console?resource_id=https%3A%2F%2Fapp.hikage.works%2F)

## 使用ライブラリ

- [vercel/next.js](https://github.com/vercel/next.js)
- [shadowwalker/next-pwa](https://github.com/shadowwalker/next-pwa)

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
