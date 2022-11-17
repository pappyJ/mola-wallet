import { NextPageX } from "types/next";
import DashboardLayout from "page_components/wallet/layout";
import WalletHeader from "page_components/wallet/header";
import styles from "styles/pages/wallet/message.module.css";

const Page: NextPageX = () => {
  function signMessage(e: any) {
    e.preventDefault();
  }
  function verifyMessage(e: any) {
    e.preventDefault();
  }

  return (
    <div className={styles.main}>
      <WalletHeader />
      <div className={styles.container}>
        <form spellCheck={false} onSubmit={signMessage}>
          <h2>Sign Message</h2>
          <div className={styles.input_container}>
            <textarea placeholder="message" className="c-scroll" />
          </div>
          <div className={styles.btn_container}>
            <button type="reset">Clear All</button>
            <button type="submit">Sign</button>
          </div>
        </form>
        <form spellCheck={false} onSubmit={verifyMessage}>
          <h2>Verify Message</h2>
          <div className={styles.input_container}>
            <textarea placeholder="signature" className="c-scroll" />
          </div>
          <div className={styles.btn_container}>
            <button type="reset">Clear All</button>
            <button type="submit">Verify</button>
          </div>
        </form>
      </div>
    </div>
  );
};

Page.Layout = DashboardLayout;
export default Page;
