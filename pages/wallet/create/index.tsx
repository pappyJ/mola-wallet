import styles from "styles/pages/wallet/create_access.module.css";
import Link from "next/link";
import Image from "next/image";

export default function CreateWalletPage() {
  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <h1>Create Wallet</h1>
        <Link href="#">
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
        <Link href="/wallet/create/mnemonic">
          <a className={styles.option}>
            <h2>Mnemonic Phrase</h2>
            <div className={styles.description}>
              <p>
                Create wallet using a mnemonic phrase. The words generated for
                you will be used in logging you in
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
}
