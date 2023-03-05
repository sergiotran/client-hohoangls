import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang='en' className='h-full'>
      <Head />
      <body className='bg-gray-200 h-full relative'>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
