/* eslint-disable react-hooks/exhaustive-deps */
import { NextPageX } from "types/next";
import { ArrowLeftIcon, CloseIconInBigCircle } from "components/icons";

import styles from "styles/pages/wallet/create_access/index.module.css";
import keystore_styles from "styles/pages/wallet/create_access/keystore.module.css";

import Link from "next/link";
import React, { useRef, useState } from "react";
import { useRouter } from "next/router";
import WalletCreateAccessLayout from "page_components/wallet/create_access_layout";

const CreateWithKeystorePage: NextPageX = () => {
  const [success, setSuccess] = useState(false);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  function handleFormSubmit(e: any) {
    e.preventDefault();
    router.push("/wallet");
  }

  return (
    <>
      <div className={styles.back_controller}>
        <div className={styles.close_icon_container}>
          <Link href="/wallet/access">
            <a className={styles.close_icon}>
              <CloseIconInBigCircle />
            </a>
          </Link>
        </div>
        <div className={styles.btn_with_icon_container}>
          <Link href="/wallet/access">
            <a>
              <span className={styles.icon_container}>
                <ArrowLeftIcon />
              </span>
              <span>Back</span>
            </a>
          </Link>
        </div>
      </div>

      <h1 style={{ paddingTop: 0 }}>Import wallet with keystore file</h1>

      <form onSubmit={handleFormSubmit}>
        <div className={keystore_styles.input_container}>
          <div className={keystore_styles.input_box}>
            <input
              type="password"
              required
              autoFocus={true}
              ref={passwordRef}
            />
          </div>
          <label>Create Password</label>
        </div>

        <div className={keystore_styles.input_container}>
          <div className={keystore_styles.input_box}>
            <input type="password" required ref={confirmPasswordRef} />
          </div>
          <label>Confirm Password</label>
        </div>

        <div
          className={styles.next_button_container}
          style={{ marginTop: "3.2rem" }}
        >
          <button type="submit" className={styles.next_button}>
            Import Wallet
          </button>
        </div>
      </form>
    </>
  );
};

CreateWithKeystorePage.Layout = WalletCreateAccessLayout;
export default CreateWithKeystorePage;
