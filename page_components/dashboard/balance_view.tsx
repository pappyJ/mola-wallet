import styles from "styles/pages/dashboard.module.css";
import Image from "next/image";

export default function BalanceView() {
  return (
    <div className={styles.balance_view}>
      <div className={styles.token_image_container}>
        <div className={styles.token_image_box}>
          <Image
            src="/logo_etherum.png"
            alt="token_dp"
            width="100%"
            height="100%"
          />
        </div>
      </div>
      <div className={styles.balance}>368.79 ETH</div>
      <div className={styles.fiat_balance}>$ 25,656,02 USD</div>
    </div>
  );
}
