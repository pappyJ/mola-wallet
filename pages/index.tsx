import { NextPageX } from "types/next";
import styles from "styles/pages/Home.module.css";
import Head from "next/head";
import Layout from "components/layouts";
import Link from "next/link";

const Home: NextPageX = () => {
  return (
    <div className={styles.main}>
      <Head>
        <title>Mola Wallet</title>
      </Head>
      <div className={styles.padder}>
        <div className={styles.hero}>
          <h1>Mola Digital</h1>
          <p>
            Digital Marketplace For Collectibles, Event Tickets, Membership
            Passes And More.
          </p>
          <Link href="/wallet/create">
            <a className={styles.action_primary}>Create new wallet</a>
          </Link>
          <Link href="/wallet/access">
            <a className={styles.action_secondary}>Access wallet</a>
          </Link>
        </div>
      </div>
    </div>
  );
};

Home.Layout = Layout;
export default Home;
