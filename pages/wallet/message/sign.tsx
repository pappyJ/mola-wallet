import { NextPageX } from "types/next";
import { DashboardMessageLayout } from "page_components/wallet/layout";
import WalletHeader from "page_components/wallet/header";
import styles from "styles/pages/wallet/message.module.css";
import { ProviderContext } from "context/web3";
import { AccountContext } from "context/account";
import React, { useContext, useEffect, useRef, useState } from "react";
import { SignatureObject } from "web3-core";
import { MessageContext } from "page_components/wallet/context";

const Page: NextPageX = () => {
  const [provider] = useContext(ProviderContext);
  const [account] = useContext(AccountContext);
  const [message, setMessage] = useContext(MessageContext);
  const [signed, setSigned] = useState(false);

  function signMessage(e: any) {
    e.preventDefault();

    setMessage(
      provider.eth.accounts.sign(
        e.target[0].value,
        account.privateKey
      ) as SignatureObject
    );

    setSigned(true);
  }

  function copyMessage(e: any) {
    e.preventDefault();
    e.target[0].select();
    document.execCommand("copy");
    setSigned(false);
  }

  return (
    <div className={styles.main}>
      <WalletHeader />
      {!signed ? (
        <div className={styles.container} key={1}>
          <h2>Sign Message</h2>
          <form spellCheck={false} onSubmit={signMessage}>
            <div className={styles.input_container}>
              <textarea placeholder="message" className="c-scroll" />
            </div>
            <div className={styles.btn_container}>
              <button type="reset">Clear All</button>
              <button type="submit">Sign</button>
            </div>
          </form>
        </div>
      ) : (
        <div className={styles.container} key={2}>
          <h2>Signed Successfully</h2>
          <form spellCheck={false} onSubmit={copyMessage}>
            <div className={styles.input_container}>
              <textarea
                placeholder="message"
                value={JSON.stringify(message, null, "\t")}
                readOnly
                className="c-scroll"
              />
            </div>
            <div className={styles.btn_container}>
              <button type="submit">Copy</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

Page.Layout = DashboardMessageLayout;
export default Page;
