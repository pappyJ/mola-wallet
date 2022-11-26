import WalletHeader from "page_components/wallet/header";
import DashBoardLayout from "page_components/wallet/layout";
import { NextPageX } from "types/next";
import styles from "styles/pages/wallet/notifications.module.css";
import { useContext } from "react";
import { AccountContext } from "context/account";

const NotificationsPage: NextPageX = () => {
  const [account] = useContext(AccountContext);
  return (
    <div className={styles.main}>
      <WalletHeader />
      <div className={styles.container}>
        <p className={styles.heading}>No notifcation to dispaly for:</p>
        <p className={styles.address}>{account.address}</p>
        <div className={styles.notification_keys_container}>
          <span className={styles.notification_key}>
            <span className={`${styles.color} ${styles.success}`}></span>
            <span className={styles.text}>Success</span>
          </span>
          <span className={styles.notification_key}>
            <span className={`${styles.color} ${styles.pending}`}></span>
            <span className={styles.text}>Pending</span>
          </span>
          <span className={styles.notification_key}>
            <span className={`${styles.color} ${styles.error}`}></span>
            <span className={styles.text}>Error</span>
          </span>
        </div>
      </div>
    </div>
  );
};

NotificationsPage.Layout = DashBoardLayout;
export default NotificationsPage;
