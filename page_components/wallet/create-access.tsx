import { ReactNode } from "react";
import styles from "styles/pages/wallet/create_access/index.module.css";
import Image from "next/image";

export function Container({ children }: { children?: ReactNode }) {
  return (
    <div className={styles.main}>
      <div className={styles.container}>
        {children}
        <div className={`${styles.option} ${styles.warning}`}>
          <h2>Warning</h2>
          <div className={styles.description}>
            <p>
              This informations are so sensitive, and can also be used offline
              by experience crypto users
            </p>
            <span className={styles.image_container}>
              <Image
                width="100%"
                height="100%"
                src="/warning.svg"
                alt="key store icon"
              />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
