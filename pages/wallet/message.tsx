import { NextPageX } from "types/next";
import DashboardLayout from "page_components/wallet/layout";
import WalletHeader from "page_components/wallet/header";
import styles from "styles/pages/wallet/message.module.css";
import { ProviderContext } from 'context/web3';
import { AccountContext } from 'context/account';
import React, { useContext, useState} from 'react';
import { SignatureObject } from "web3-core";

const Page: NextPageX = () => {
  const [provider] = useContext(ProviderContext);
  const [account] = useContext(AccountContext);
  const [message, setMessage] = useState<SignatureObject>({} as SignatureObject);

  function signMessage(e: any) {

    e.preventDefault();

    setMessage(provider.eth.accounts.sign(e.target[0].value, account.privateKey) as SignatureObject); 
    
  }
  function verifyMessage(e: any) {
    e.preventDefault();

    alert(provider.eth.accounts.recover(message))

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
