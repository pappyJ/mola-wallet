import { NextPageX } from "types/next";
import DashboardLayout from "page_components/wallet/layout";
import styles from "styles/pages/wallet/logout.module.css";
import { useRouter } from "next/router";
import { useContext } from "react";
import { AddressContext } from "context/address";

const Page: NextPageX = () => {
  const router = useRouter();
  const [, setAddress] = useContext(AddressContext);

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <p className={styles.heading}>Are you sure you want to logout</p>
        <div className={styles.button_container}>
          <button onClick={() => router.back()}>No</button>
          <button onClick={() => setAddress(null)} className={styles.primary}>
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

Page.Layout = DashboardLayout;
export default Page;
