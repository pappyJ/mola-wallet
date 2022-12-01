import "../styles/globals.css";
import type { AppPropsX } from "types/next";
import Head from "next/head";
import { ProviderContextComponent } from "context/web3";
import { SocketProviderContextComponent } from "context/web3/socket";
import { AssetProviderContextComponent } from "context/web3/assets";
import { AcoountContextComponent } from "context/account";
import LoaderContextComponent from "context/loader";
import { useEffect } from "react";
import { initAssetEngine } from "utils/assetEngine";

function MyApp({ Component, pageProps }: AppPropsX) {
  let GivenLayout = Component.Layout;
  let DefaultLayout = ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  );
  let Layout = GivenLayout || DefaultLayout;

  useEffect(() => {
    (async () => {
      await initAssetEngine();
    })();
  });

  return (
    <>
      <Head>
        <link rel="icon" href="/mola-logo-1.png" />
        <title>Mola Wallet</title>
      </Head>
      <LoaderContextComponent>
        <ProviderContextComponent>
          <SocketProviderContextComponent>
            <AssetProviderContextComponent>
              <AcoountContextComponent>
                <Layout>
                  <Component {...pageProps} />
                </Layout>
              </AcoountContextComponent>
            </AssetProviderContextComponent>
          </SocketProviderContextComponent>
        </ProviderContextComponent>
      </LoaderContextComponent>
    </>
  );
}

export default MyApp;
