import "../styles/globals.css";
import type { AppPropsX } from "types/next";
import Head from "next/head";
import { ProviderContextComponent } from "context/web3";
import {  AcoountContextComponent } from "context/account";

function MyApp({ Component, pageProps }: AppPropsX) {
  let GivenLayout = Component.Layout;
  let DefaultLayout = ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  );
  let Layout = GivenLayout || DefaultLayout;

  return (
    <>
      <Head>
        <link rel="icon" href="/mola-logo-1.png" />
        <title>Mola Wallet</title>
      </Head>
      <ProviderContextComponent>
        < AcoountContextComponent>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ AcoountContextComponent>
      </ProviderContextComponent>
    </>
  );
}

export default MyApp;
