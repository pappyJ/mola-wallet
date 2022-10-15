import { CopyIcon, MenuIcon } from "components/icons";
import styles from "styles/pages/dashboard.module.css";

export default function MainHeader() {
  return (
    <div className={styles.main_header}>
      <div className={styles.top_container}>
        <div className={styles.connect_status}>
          <div>
            <span className={styles.signal}></span>
            <span className={styles.text}>Connected</span>
          </div>
        </div>
        <div className={styles.account_name}>Account 1</div>
        <div className={styles.menu_icon_container}>
          <button className={styles.menu_icon_box}>
            <MenuIcon />
          </button>
        </div>
      </div>
      <div className={styles.bottom_container}>
        <div className={styles.account_id}>
          <span>Oxasas47....sadfsdfs</span>
          <button className={styles.copy_icon_container}>
            <CopyIcon />
          </button>
        </div>
      </div>
    </div>
  );
}
