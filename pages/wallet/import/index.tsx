import { NextPageX } from "types/next";
import styles from "styles/pages/wallet/create_access/index.module.css";
import Image from "next/image";
import Link from "next/link";
import WalletCreateAccessLayout from "components/layouts/wallet_create_access";

const WalletImport: NextPageX = () => {
  return (
    <>
      <h1>Import Wallet</h1>
      <Link href="/wallet/import/keystore">
        <a className={styles.option}>
          <h2>Key Store File</h2>
          <div className={styles.description}>
            <p>
              Create wallet using downloadable file, which you upload to login
            </p>
            <span className={styles.image_container}>
              <Image
                layout="fill"
                src="/icon_key_store.svg"
                alt="key store icon"
              />
            </span>
          </div>
        </a>
      </Link>
      <Link href="/wallet/import/mnemonic">
        <a className={styles.option}>
          <h2>Mnemonic Phrase</h2>
          <div className={styles.description}>
            <p>
              Create wallet using a mnemonic phrase. The words generated for you
              will be used in logging you in
            </p>
            <span className={styles.image_container}>
              <Image
                width="100%"
                height="100%"
                src="/icon_mnemonic.svg"
                alt="key store icon"
              />
            </span>
          </div>
        </a>
      </Link>
    </>
  );
};

WalletImport.Layout = WalletCreateAccessLayout;
export default WalletImport;
