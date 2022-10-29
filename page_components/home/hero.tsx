import Link from "next/link";
import styles from "styles/pages/Home.module.css";

export default function Hero() {
  return (
    <div className={styles.padder}>
      <div className={styles.hero}>
        <div className={styles.left}>
          <h1>Mola Digital</h1>
          <p>
            Digital Marketplace For Collectibles, Event Tickets, Membership
            Passes And More.
          </p>
          <Link href="/onboarding">
            <a className={styles.action_primary}>Create/import wallet</a>
          </Link>
          <Link href="/wallet/access">
            <a className={styles.action_secondary}>Access wallet</a>
          </Link>
        </div>
        <div className={styles.right}>
          <div className={styles.hero_img}></div>
        </div>
      </div>
    </div>
  );
}
