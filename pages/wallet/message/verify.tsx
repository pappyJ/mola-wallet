import { NextPageX } from "types/next";
import { DashboardMessageLayout } from "page_components/wallet/layout";
import WalletHeader from "page_components/wallet/header";
import styles from "styles/pages/wallet/message.module.css";
import { ProviderContext } from "context/web3";
import React, { useCallback, useContext } from "react";
import { MessageContext } from "page_components/wallet/context";
import Notification, { useNotification } from "components/notification";

const Page: NextPageX = () => {
  const [provider] = useContext(ProviderContext);
  const [message] = useContext(MessageContext);
  const [notifcation, pushNotification] = useNotification();

  function _verifyMessage(e: any) {
    e.preventDefault();

    if (!Object.keys(message).length)
      return pushNotification({ element: "No message signed", type: "error" });

    alert(provider.eth.accounts.recover(message));
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const verifyMessage = useCallback(_verifyMessage, [message]);

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

Page.Layout = DashboardMessageLayout;
export default Page;
