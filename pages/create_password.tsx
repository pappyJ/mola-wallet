import Head from "next/head";
import styles from "styles/pages/create_password.module.css";

export default function CreatePasswordPage() {
  return (
    <div className={styles.main}>
      <h2>Create Password</h2>
      <p>This unlocks your Mola Vault wallet only on this device.</p>
      <form>
        <div className={styles.input_box}>
          <input type="password" required />
          <label>Password</label>
        </div>
        <div className={styles.input_box}>
          <input type="password" required />
          <label>Confirm Password</label>
        </div>
      </form>
      <Head>
        <title>Create Password-Mola Wallet</title>
      </Head>
    </div>
  );
}
