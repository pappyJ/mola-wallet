import Link from "next/link";
import Image from "next/image";
import styles from "styles/pages/Home.module.css";

export default function StoreButtons() {
  return (
    <div className={styles.store_button_container}>
      <Link href="#">
        <a className={`${styles.store_button} ${styles.app_store}`}>
          <span className={styles.logo}>
            <Image src="/apple_logo.png" alt="apple_logo" layout="fill" />
          </span>
          <span className={styles.text}>
            <span>Get it on</span>
            <span>App Store</span>
          </span>
        </a>
      </Link>
      <Link href="#">
        <a className={styles.store_button}>
          <span className={styles.logo}>
            <Image
              src="/playstore_logo.png"
              layout="fill"
              alt="playstore_logo"
            />
          </span>
          <span className={styles.text}>
            <span>Get it on</span>
            <span>Google play</span>
          </span>
        </a>
      </Link>
    </div>
  );
}
