import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html className="text-slate-800">
      <Head />
      {/* eslint-disable @next/next/no-head-element */}
      <head
        dangerouslySetInnerHTML={{
          __html: `<!-- apple splash screen images -->
<!--
<link rel='apple-touch-startup-image' href='/images/apple_splash_2048.png' sizes='2048x2732' />
<link rel='apple-touch-startup-image' href='/images/apple_splash_1668.png' sizes='1668x2224' />
<link rel='apple-touch-startup-image' href='/images/apple_splash_1536.png' sizes='1536x2048' />
<link rel='apple-touch-startup-image' href='/images/apple_splash_1125.png' sizes='1125x2436' />
<link rel='apple-touch-startup-image' href='/images/apple_splash_1242.png' sizes='1242x2208' />
<link rel='apple-touch-startup-image' href='/images/apple_splash_750.png' sizes='750x1334' />
<link rel='apple-touch-startup-image' href='/images/apple_splash_640.png' sizes='640x1136' />
-->`,
        }}
      />
      {/* eslint-enable @next/next/no-head-element */}
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
