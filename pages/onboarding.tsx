import Layout from "components/layouts";
import { NextPageX } from "types/next";
import Link from "next/link";
import styles from "styles/pages/onboarding.module.css";

const OnboardingPage: NextPageX = () => {
  return (
    <div className={styles.main}>
      <div className={styles.card_container}>
        <div className={styles.card}>
          <h2>Create Wallet</h2>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem
          </p>
          <div className={styles.action_container}>
            <Link href="/wallet/create">
              <a className={styles.action}>Create Wallet</a>
            </Link>
          </div>
        </div>
        <div className={styles.card}>
          <h2>Import Wallet</h2>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem
          </p>
          <div className={styles.action_container}>
            <Link href="/wallet/import">
              <a className={styles.action}>Import Wallet</a>
            </Link>
          </div>
        </div>
      </div>
      <div className={styles.footer}>
        This informations are so sensitive, and can also be used offline by
        experience crypto users and Please becareful while using it because we
        can’t retrieve back your details.
      </div>
    </div>
  );
};

OnboardingPage.Layout = Layout;
export default OnboardingPage;
