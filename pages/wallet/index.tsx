import DashBoardLayout from "page_components/wallet/layout";
import { NextPageX } from "types/next";
import styles from "styles/pages/wallet/index.module.css";
import Link from "next/link";
import {
  CardIcon,
  CaretDownSolidSmall,
  CopyIcon,
  ScanIcon,
  SendIcon,
  TickHeavyIcon,
} from "components/icons";
import Image from "next/image";
import { useContext, useEffect, useRef, useState } from "react";
import { AccountContext } from "context/account";
import { ProviderContext } from "context/web3";
import { NetworkContext } from "page_components/wallet/context";
import WalletHeader from "page_components/wallet/header";
import { sendNativeToken } from "utils/transactions";
import { primaryFixedValue } from "constants/digits";
import { IAccount } from "interfaces/IAccount";
import { NETWORKS } from "interfaces/IRpc";
import { getCoinUSD } from "utils/priceFeed";
import { getWalletBalanceEth } from "utils/wallet";
import NET_CONFIG from "config/allNet";
import Notification, { useNotification } from "components/notification";


const WalletPage: NextPageX = () => {
  const [account, setAccount] = useContext(AccountContext);
  const [provider] = useContext(ProviderContext);
  const [currentNetwork] = useContext(NetworkContext);
  const [copied, setCopied] = useState(false);
  const [notifcation, pushNotification] = useNotification();

  const copyRef = useRef<HTMLTextAreaElement>(null);

  function shorten(address: string | null) {
    if (!account.address) return "";

    if (account.address.length < 11) return address;

    let a = account.address.toString().slice(0, 7);
    let b = account.address.toString().slice(-4);

    return `${a}...${b}`;
  }

  function copyAddress() {
    copyRef.current?.select();
    document.execCommand("copy");
    setCopied(true);
  }

  const sendNative = async (e: any) => {
    e.preventDefault();

    try {
      const tx = await sendNativeToken(
        provider,
        '0.00001',
        currentNetwork.nativeCurrency.decimals,
        '0x5eB93f1b0b3E1Fd0f99118e39684f087a84d40Ec',
        account.address,
        account.privateKey,
        account.gasPriority!
  
      );


      const balance = Number(await getWalletBalanceEth(provider, account.address));

      const balanceFiat = Number((balance <= 0 ? 0 : (await getCoinUSD(NET_CONFIG[currentNetwork.chainName as NETWORKS].nativeCurrency.symbol)).value! * balance).toFixed(primaryFixedValue));

      setAccount((prev: IAccount) => ({
        ...prev,

        balance: balance,

        balanceFiat
      }));

      pushNotification({ 
        element: "Transaction Successful", 
        type: "success" 
      })

      console.log(tx)
    } catch (error: any) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (copied) setTimeout(() => setCopied(false), 2000);
  }, [copied]);

  return (
    <main className={styles.main}>
      <WalletHeader />
      <div className={styles.card_section}>
        <div className={styles.balance_section}>
          <div className={styles.top}>
            <div className={styles.left}>
              <div className={styles.top}>
                <p className={styles.md_text}>Personal Account</p>
                <span className={styles.caret_down_box}>
                  <CaretDownSolidSmall />
                </span>
              </div>
              <a
                href={`${currentNetwork.blockExplorer}/address/${account.address}`}
                target="_blank"
                className={styles.wallet_id}
                rel="noreferrer"
              >
                {shorten(account.address)}
              </a>
            </div>
            <div className={styles.right}>
              <button className={styles.icon_box}>
                <ScanIcon />
              </button>
              <button
                className={styles.icon_box}
                onClick={copyAddress}
                style={{
                  color: copied ? "#90f3ac" : "",
                  cursor: copied ? "default" : "pointer",
                }}
              >
                <textarea
                  ref={copyRef}
                  className={styles.hidden_textarea}
                  value={account.address || ""}
                  onChange={() => {}}
                />
                {!copied ? <CopyIcon /> : <TickHeavyIcon />}
              </button>
            </div>
          </div>
          <div className={styles.center}>
            <div className={styles.fiat_balance}>$ {account.balanceFiat}</div>
            <div className={styles.crypto_balance}>
              {account.balance} {currentNetwork.nativeCurrency.symbol}
            </div>
          </div>
          <div className={styles.bottom}>
            <Link href="#">
              <a className={styles.primary}>
                <span className={styles.icon}>
                  <CardIcon />
                </span>
                Buy
              </a>
            </Link>
            <Link href="#">
              <a className={styles.secondary} onClick={async (e) => await sendNative(e)}>
                <span className={styles.icon}>
                  <SendIcon />
                </span>
                Send
              </a>
            </Link>
          </div>
        </div>
        <div className={styles.buy_with_card_section}>
          <p className={styles.md_text}>My ETH Balance Is Empty</p>
          <Link href="#">
            <a className={styles.buy_eth}>Buy Eth with credit card</a>
          </Link>
          <p className={styles.cards_img_container}>
            We accept credit card{" "}
            <span className={styles.visa_img}>
              <Image src="/visa_logo.png" alt="" layout="fill" />
            </span>
            <span className={styles.mastercard_img}>
              <Image src="/mastercard_logo.png" alt="" layout="fill" />
            </span>
          </p>
          <p className={styles.tip}>
            Tip: You can also send your ETH from another wallet
          </p>
        </div>
      </div>
      <div className={styles.bottom_section}>
        <div className={styles.token_value_table}></div>
        <div className={styles.right}></div>
      </div>
      <Notification
        notification={notifcation}
        pushNotification={pushNotification}
      />
    </main>
  );
};

WalletPage.Layout = DashBoardLayout;

export default WalletPage;
