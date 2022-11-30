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
import React, { useContext, useRef, useState } from "react";
// import { LoaderContext } from "context/loader";
import { AccountContext } from "context/account";
import { NetworkContext } from "page_components/wallet/context";
import WalletHeader from "page_components/wallet/header";

import NET_CONFIG from "config/allNet";
import Notification, { useNotification } from "components/notification";
import NetworkSelector, {
  networkLogoMap,
} from "page_components/wallet/network_selector";
import { AssetProviderContext } from "context/web3/assets";
import { shorten } from "utils/string";

const WalletPage: NextPageX = () => {
  const [account] = useContext(AccountContext);
  const [currentNetwork] = useContext(NetworkContext);
  const [copied, setCopied] = useState(false);
  const [notifcation, pushNotification] = useNotification();
  const [assets] = useContext(AssetProviderContext);
  const [network] = useContext(NetworkContext);

  const copyRef = useRef<HTMLTextAreaElement>(null);

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
                {shorten(account.address, 7, 4, 13)}
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
        <div className={`${styles.token_value_table} c-scroll`}>
          <h4>MY TOKENS VALUE</h4>
          <p className={styles.token_value}>$0.00</p>
          <table>
            <thead>
              <tr>
                <th>Token</th>
                <th>Name</th>
                <th>Balance</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {!!assets.length &&
                assets.map((e: any, i: number) => (
                  <tr key={i}>
                    <td>
                      <span style={{ display: "flex" }}>
                        <span
                          className={network_styles.network_icon_box}
                          style={{
                            marginRight: "1.6rem",
                            position: "relative",
                          }}
                        >
                          {e.token?.logo ? (
                            <Image src={e.token.logo} layout="fill" alt="" />
                          ) : (
                            networkLogoMap[network.chainName]
                          )}
                        </span>
                        <span
                          className={styles.text}
                          style={{ fontWeight: "600" }}
                        >
                          {e?.token?.symbol}
                        </span>
                      </span>
                    </td>
                    <td>{e?.token?.name}</td>

                    <td
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        fontFamily: "consolas, monospace",
                      }}
                    >
                      <span
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          flexWrap: "wrap",
                        }}
                      >
                        <span>{Number(e?.value).toFixed(2)} </span>
                        <span>{e.token.symbol}</span>
                      </span>
                    </td>
                    <td>
                      <Link href={`/wallet/send?token=${e.token.symbol}`}>
                        <a style={{ color: "#1e85dd" }}>Send</a>
                      </Link>
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
