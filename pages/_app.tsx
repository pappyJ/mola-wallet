import "../styles/globals.css";
import type { AppPropsX } from "types/next";
import Head from "next/head";
import { ProviderContextComponent } from "context/web3";
import { AddressContextComponent } from "context/address";

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
        <AddressContextComponent>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </AddressContextComponent>
      </ProviderContextComponent>
    </>
  );
}

export default MyApp;
