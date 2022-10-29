import styles from "styles/pages/Home.module.css";
import Link from "next/link";
import Image from "next/image";
import StoreButtons from "./store_button";

export default function SectionA() {
  return (
    <div className={`${styles.section_a} ${styles.section}`}>
      <div className={styles.padder}>
        <div className={styles.left}>
          <div className={styles.sec}>
            <h2>Your Gateway to Etherum Blockchain</h2>
            <p>
              ETH Blocks is an NFT series representing mined Ethereum blocks and
              their properties. Whether it&apos;s a special block number, the
              block of your first transaction, or a block that contains a
              transaction with a special message. Own a part of history with ETH
              Blocks by mola.
            </p>
          </div>
          <StoreButtons />
        </div>
        <div className={styles.right}>
          <div className={styles.img}></div>
        </div>
      </div>
    </div>
  );
}
