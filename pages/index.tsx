import MoblieMainNav from "components/navs/mobile_main_nav";
import type { NextPage } from "next";
import { Skipper, View } from "page_components/home";
import styles from "styles/pages/Home.module.css";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <div className={styles.main}>
      <div className={styles.top}>
        <Skipper href="/wallet/create" />
      </div>

      <div className={styles.center}>
        <View />
      </div>

      <div className={styles.bottom}>{/* <MoblieMainNav /> */}</div>

      <Head>
        <title>Mola Wallet</title>
      </Head>
    </div>
  );
};

export default Home;
