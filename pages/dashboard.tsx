import Head from "next/head";
import {
  AssetsActivityView,
  BalanceView,
  MainHeader,
  TopHeader,
  TransactionView,
} from "page_components/dashboard";
import styles from "styles/pages/dashboard.module.css";

export default function DashboardPage() {
  return (
    <div className={styles.main}>
      <TopHeader />
      <MainHeader />
      <BalanceView />
      <TransactionView />
      <AssetsActivityView />
      <Head>
        <title>Dashboard</title>
      </Head>
    </div>
  );
}
