import { NextPageX } from "types/next";
import styles from "styles/pages/Home.module.css";
import Head from "next/head";
import Layout from "components/layouts";
import {
  Hero,
  SectionA,
  SectionB,
  SectionC,
  SectionD,
} from "page_components/home";

const Home: NextPageX = () => {
  return (
    <div className={styles.main}>
      <Head>
        <title>Mola Wallet</title>
      </Head>
      <Hero />
      <SectionA />
      <SectionB />
      <SectionC />
      <SectionD />
    </div>
  );
};

Home.Layout = Layout;
export default Home;
