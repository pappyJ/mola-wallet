import DashBoardLayout from "page_components/wallet/layout";
import { NextPageX } from "types/next";
import styles from "styles/pages/wallet/index.module.css";
import network_styles from "styles/pages/wallet/network_selector.module.css";
import Link from "next/link";
import {
  CardIcon,
  CaretDownOutline,
  CaretDownSolidSmall,
  ClockFillIcon,
  CloseIconInBigCircle,
  CopyIcon,
  ScanIcon,
  SendIcon,
  TickHeavyIcon,
} from "components/icons";
import Image from "next/image";
import React, {
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { AccountContext } from "context/account";
import { NetworkContext } from "page_components/wallet/context";
import WalletHeader from "page_components/wallet/header";

import NET_CONFIG from "config/allNet";
import Notification, { useNotification } from "components/notification";
import NetworkSelector, {
  networkLogoMap,
} from "page_components/wallet/network_selector";

const WalletPage: NextPageX = () => {
  const [account] = useContext(AccountContext);
  const [currentNetwork] = useContext(NetworkContext);
  const [copied, setCopied] = useState(false);
  const [notifcation, pushNotification] = useNotification();

  const copyRef = useRef<HTMLTextAreaElement>(null);
  const [sendTokenActive, setSendTokenActive] = useState(false);

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
            <a className={styles.primary} href="#">
              <span className={styles.icon}>
                <CardIcon />
              </span>
              Buy
            </a>
            <Link href="/wallet/send">
              <a className={styles.secondary}>
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
        <div className={styles.token_value_table}>
          <h4>MY TOKENS VALUE</h4>
          <p className={styles.token_value}>$0.00</p>
          <table>
            <thead>
              <tr>
                <th>Token</th>
                <th>Price</th>
                <th>Market Cap</th>
                <th>24hr</th>
                <th>Balance</th>
              </tr>
            </thead>
            <tbody>
              {" "}
              {Object.values(NET_CONFIG).map((e, i) => (
                <tr key={i}>
                  <td>
                    <span style={{ display: "flex" }}>
                      <span
                        className={network_styles.network_icon_box}
                        style={{ marginRight: "1.6rem" }}
                      >
                        {networkLogoMap[e.chainName]}
                      </span>
                      <span
                        className={styles.text}
                        style={{ fontWeight: "600" }}
                      >
                        {e.nativeCurrency.symbol}
                      </span>
                    </span>
                  </td>
                  <td>$1,297.80</td>
                  <td>156.3491B</td>
                  <td style={{ fontWeight: "600", color: "#FF0707" }}>
                    -2.10%
                  </td>
                  <td
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      fontFamily: "consolas, monospace",
                    }}
                  >
                    <span style={{ display: "flex", flexDirection: "column" }}>
                      <span>0 {e.nativeCurrency.symbol}</span>
                      <span>$0.00</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className={styles.right}>
          <NetworkSelector />
        </div>
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
