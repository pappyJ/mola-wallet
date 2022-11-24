import { useEffect } from "react";
import styles from "styles/pages/wallet/create_access/index.module.css";
import Link from "next/link";
import Image from "next/image";
import { NextPageX } from "types/next";
import { initAssetEngine } from "utils/assetEngine"
import WalletCreateAccessLayout from "page_components/wallet/create_access_layout";

const CreateWalletPage: NextPageX = () => {

  useEffect(() => {
    (( async () => {
      await initAssetEngine()
    }))()
  })

  return (
    <>
      <h1>Access Wallet</h1>
      <Link href="/wallet/access/keystore">
        <a className={styles.option}>
          <h2>Key Store File</h2>
          <div className={styles.description}>
            <p>
              Access wallet using your keystore file. You will need to upload it
              to login
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
      <Link href="/wallet/access/mnemonic">
        <a className={styles.option}>
          <h2>Mnemonic Phrase</h2>
          <div className={styles.description}>
            <p>
              Access wallet using a mnemonic phrase. Type in the mnemonic phrase
              generated when you created your account
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
      <Link href="/wallet/access/private_key">
        <a className={styles.option}>
          <h2>Private Key</h2>
          <div className={styles.description}>
            <p>
              Use your private key online to makes your wallet more vulnurable
              to loss of funds
            </p>
            <span className={styles.image_container}>
              <Image
                width="100%"
                height="100%"
                src="/icon_private_key.svg"
                alt="key store icon"
              />
            </span>
          </div>
        </a>
      </Link>
    </>
  );
};

CreateWalletPage.Layout = WalletCreateAccessLayout;
export default CreateWalletPage;
