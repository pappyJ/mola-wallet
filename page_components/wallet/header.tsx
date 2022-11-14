import {
  EtherumIcon,
  CaretDownOutline,
  NotificationSolidIcon,
} from "components/icons";
import Link from "next/link";
import { ReactNode } from "react";
import styles from "styles/pages/wallet/index.module.css";

export default function WalletHeader({ children }: { children?: ReactNode }) {
  return (
    <div className={styles.header}>
      <div className={styles.left}>
        {children ? (
          children
        ) : (
          <>
            <p>
              You can now{" "}
              <Link href="#">
                <a>buy crypto</a>
              </Link>{" "}
              with low fees
            </p>
            <p>
              Enjoy 0.9% fee when you select &apos;Bank account&apos; as payment
              method.{" "}
              <Link href="#">
                <a> Buy crypto now.</a>
              </Link>
            </p>
          </>
        )}
      </div>
      <div className={styles.right}>
        <div className={styles.network_selector}>
          <div className={styles.ethereum_icon_box}>
            <EtherumIcon />
          </div>
          Ethereum
          <button className={styles.caret_down_box}>
            <CaretDownOutline />
          </button>
        </div>
        <div className={styles.notification_icon_box}>
          <span className={styles.icon}>
            <NotificationSolidIcon />
          </span>
        </div>
      </div>{" "}
    </div>
  );
}
