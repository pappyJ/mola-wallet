import styles from "styles/pages/Home.module.css";
import Image from "next/image";
import { StoreButtons } from ".";

export default function SectionB() {
  return (
    <div className={`${styles.section_b} ${styles.section}`}>
      <div className={styles.padder}>
        <div className={styles.left}>
          <div className={styles.card_container}>
            <div className={styles.card}>
              <div className={styles.image_container}>
                <div className={styles.image_box}>
                  <Image src="/folder.png" alt="folder" layout="fill" />
                </div>
              </div>
              <h3>Mola Wallet</h3>
              <p>
                Mola brings a hardware wallet style security to your iOS or
                Android smart phone, helping you to secure your funds as never
                before. Get the App
              </p>
            </div>
            <div className={styles.card}>
              <div className={styles.image_container}>
                <div className={styles.image_box}>
                  <Image src="/chip.png" alt="folder" layout="fill" />
                </div>
              </div>
              <h3>Hardware wallet support</h3>
              <p>
                Mola offers support for all major hardware wallets including
                Ledger, Trezor, and many more.
              </p>
            </div>
          </div>
          <div className={styles.card_container}>
            <div className={styles.card}>
              <div className={styles.image_container}>
                <div className={styles.image_box}>
                  <Image src="/hearts.png" alt="folder" layout="fill" />
                </div>
              </div>
              <h3>Friendly to use</h3>
              <p>
                Access the Ethereum blockchain&apos;s original and most-trusted
                wallet.
              </p>
            </div>
            <div className={styles.card}>
              <div className={styles.image_container}>
                <div className={styles.image_box}>
                  <Image src="/chip.png" alt="folder" layout="fill" />
                </div>
              </div>
              <h3>DeFi, DApps, NFTs, Stablecoins</h3>
              <p>
                Simplex to allow users to swap fiat to crypto, ETH and BTC, ETH
                and ERC-20.
              </p>
            </div>
          </div>
        </div>
        <div className={styles.right}>
          <div>
            <div className={styles.sec}>
              <h2>Easy and secure access to the Ethereum Blockchain</h2>
              <p>
                Easily access all you favorite apps across Ethereum and Polkadot
                chains, buy crypto, tokens, and manage your NFTs. Welcome to the
                multichain future
              </p>
            </div>
            <StoreButtons />
          </div>
        </div>
      </div>
    </div>
  );
}
