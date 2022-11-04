import { NextPageX } from "types/next";
import DashboardLayout from "components/layouts/dashboard";
import styles from "styles/pages/wallet/settings.module.css";
import { CaretDownOutline, NotificationSolidIcon } from "components/icons";
import Link from "next/link";

const Page: NextPageX = () => {
  return (
    <div className={styles.main}>
      <header>
        <h2>Settings</h2>
        <div className={styles.notification_icon_box}>
          <span className={styles.icon}>
            <NotificationSolidIcon />
          </span>
        </div>
      </header>
      <div className={styles.container}>
        <div className={styles.section}>
          <h6>Default transaction priority</h6>
          <div className={styles.center}>
            <p>
              This fee is charged by the Ethereum network and fluctuates
              depending on network traffic. MEW does not profit from this fee.
            </p>
            <button className={styles.caret_down_icon}>
              <CaretDownOutline />
            </button>
          </div>
        </div>

        <div className={styles.section}>
          <h6>Import Configuration</h6>
          <div className={styles.center}>
            <p>
              Please upload the file and click the button to open and import
              your configuration file from your local computer.
            </p>
            <button className={styles.caret_down_icon}>
              <CaretDownOutline />
            </button>
          </div>
        </div>

        <div className={styles.section}>
          <h6>Export Configuration</h6>
          <div className={styles.center}>
            <p>
              Export your configuration file and save it on your local computer
              for later use.
            </p>
            <Link href="#">
              <a className={styles.btn}>EXPORT</a>
            </Link>
          </div>
        </div>

        <div className={styles.section}>
          <h6>Contact Address</h6>
          <div className={styles.center}>
            <p>You can add up to 10 contact addresses</p>
            <Link href="#">
              <a className={styles.btn}>Add Address</a>
            </Link>
          </div>
        </div>

        <div className={styles.section}>
          <h6>Currency Settings</h6>
        </div>
      </div>
    </div>
  );
};

Page.Layout = DashboardLayout;
export default Page;
