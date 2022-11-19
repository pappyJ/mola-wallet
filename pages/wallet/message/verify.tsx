import { NextPageX } from "types/next";
import DashboardLayout from "page_components/wallet/layout";
import WalletHeader from "page_components/wallet/header";
import styles from "styles/pages/wallet/message.module.css";
import { ProviderContext } from "context/web3";
import React, { useCallback, useContext, useState } from "react";
import Notification, { useNotification } from "components/notification";
import { SignatureObject } from "web3-core";

const Page: NextPageX = () => {
  const [provider] = useContext(ProviderContext);
  const [notifcation, pushNotification] = useNotification();

  function verifyMessage(e: any) {
    e.preventDefault();

    try {
      const message = JSON.parse(e.target[0].value);

      if (!Object.keys(message).length)
        return pushNotification({
          element: "No message signed",
          type: "info",
        });

      alert(provider.eth.accounts.recover(message));
    } catch (error) {
      pushNotification({
        element: "Invalid Wallet Message Format Please Check Input",
        type: "info",
      });
    }
  }

  return (
    <div className={styles.main}>
      <WalletHeader />
      <div className={styles.container}>
        <h2>Verify Message</h2>
        <form spellCheck={false} onSubmit={verifyMessage}>
          <div className={styles.input_container}>
            <textarea placeholder="signature" className="c-scroll" />
          </div>
          <div className={styles.btn_container}>
            <button type="reset">Clear All</button>
            <button type="submit">Verify</button>
          </div>
        </form>
      </div>
      <Notification
        notification={notifcation}
        pushNotification={pushNotification}
      />
    </div>
  );
};

Page.Layout = DashboardLayout;
export default Page;
