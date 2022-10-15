import { ScanIcon } from "components/icons";
import { NetworkSelector, AccountAvatar } from "./index";
import styles from "styles/pages/dashboard.module.css";

export default function TopHeader() {
  return (
    <div className={styles.top_header}>
      <div className={styles.scan_container}>
        <ScanIcon />
      </div>
      <div className={styles.network_selector_container}>
        <NetworkSelector />
      </div>
      <div className={styles.avatar_container}>
        <AccountAvatar />
      </div>
    </div>
  );
}
