import styles from "styles/pages/wallet/create_access/index.module.css";
import Link from "next/link";
import Image from "next/image";
import { NextPageX } from "types/next";
import Layout from "components/layouts";

const CreateWalletPage: NextPageX = () => {
  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <h1>Access Wallet</h1>
        <Link href="/wallet/access/keystore">
          <a className={styles.option}>
            <h2>Key Store File</h2>
            <div className={styles.description}>
              <p>
                Access wallet using your keystore file. You will need to upload
                it to login
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
                Access wallet using a mnemonic phrase. Type in the mnemonic
                phrase generated when you created your account
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
      </div>
    </div>
  );
};

CreateWalletPage.Layout = Layout;
export default CreateWalletPage;
