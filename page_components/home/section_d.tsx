import Link from "next/link";
import styles from "styles/pages/Home.module.css";
import StoreButtons from "./store_button";

export default function SectionD() {
  return (
    <div className={styles.section_d}>
      <div className={styles.padder}>
        <div className={styles.container}>
          <h3>Get ready to explore ethereum</h3>
          <p>
            It&apos;s pretty simple, create your wallet and fund it and get a
            notification when you making transactions
          </p>
          <div className={styles.action_btn_container}>
            <Link href="/wallet/create">
              <a className={styles.action_primary}>Create Wallet</a>
            </Link>
            <Link href="/wallet/access">
              <a className={styles.action_secondary}>Access Wallet</a>
            </Link>
          </div>
          <div className={styles.mobile_app_container}>
            <div className={styles.left}>
              <h4>Mola Digital</h4>
              <p>
                Mola brings a hardware wallet style security to your iOS or
                Android smart phone,
              </p>
            </div>
            <div className={styles.right}>
              <StoreButtons />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
