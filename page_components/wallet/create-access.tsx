import { ReactNode } from "react";
import styles from "styles/pages/wallet/create_access/index.module.css";

export function Container({ children }: { children: ReactNode }) {
  return (
    <div className={styles.main}>
      <div className={styles.container}>{children}</div>
    </div>
  );
}
