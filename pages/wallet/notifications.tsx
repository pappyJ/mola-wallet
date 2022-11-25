import WalletHeader from "page_components/wallet/header";
import DashBoardLayout from "page_components/wallet/layout";
import { NextPageX } from "types/next";
import styles from "styles/pages/wallet/notifications.module.css";

const NotificationsPage: NextPageX = () => {
  return (
    <div className={styles.main}>
      <WalletHeader />
    </div>
  );
};

NotificationsPage.Layout = DashBoardLayout;
export default NotificationsPage;
