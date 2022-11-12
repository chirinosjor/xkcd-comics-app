import { NextUIProvider } from '@nextui-org/react';
import { I18nProvider } from 'context/i18n';
import Head from 'next/head';
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <NextUIProvider>
        <Head>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <I18nProvider>
          <Component {...pageProps} />
        </I18nProvider>
      </NextUIProvider>
  );
}

export default MyApp;