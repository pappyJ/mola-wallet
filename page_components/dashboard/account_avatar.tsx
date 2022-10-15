import Image from "next/image";
import styles from "styles/pages/dashboard.module.css";

export default function AccountAvatar() {
  return (
    <div className={styles.account_avatar}>
      <Image src="/dp.png" alt="dp" width="100%" height="100%" />
    </div>
  );
}
