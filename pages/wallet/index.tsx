import DashBoardLayout from "components/layouts/dashboard";
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
import { AddressContext } from "context/address";
import { ProviderContext } from "context/web3";
import { useRouter } from "next/router";
import WalletHeader from "page_components/wallet/header";

const WalletPage: NextPageX = () => {
  const [address] = useContext(AddressContext);
  const [provider] = useContext(ProviderContext);
  const [copied, setCopied] = useState(false);
  const router = useRouter();
  const copyRef = useRef<HTMLTextAreaElement>(null);

  const walletBalance = async () => await provider?.eth.getBalance(address);
  const [balance, setBalance] = useState();

  (async () => {
    let j = await walletBalance();

    setBalance(provider?.utils?.fromWei(j, "ether"));
  })();

  function shorten(address: string | null) {
    if (!address) return "";
    if (address.length < 11) return address;

    let a = address.toString().slice(0, 7);
    let b = address.toString().slice(-4);

    return `${a}...${b}`;
  }

  function copyAddress() {
    copyRef.current?.select();
    document.execCommand("copy");
    setCopied(true);
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
              <Link href="#address">
                <a className={styles.wallet_id}>{shorten(address)}</a>
              </Link>
            </div>
            <div className={styles.right}>
              <button className={styles.icon_box}>
                <ScanIcon />
              </button>
              <button
                className={styles.icon_box}
                onClick={copyAddress}
                style={{ color: copied ? "#90f3ac" : "" }}
              >
                <textarea
                  ref={copyRef}
                  style={{ width: 0, height: 0, opacity: 0 }}
                >
                  {address}
                </textarea>
                {!copied ? <CopyIcon /> : <TickHeavyIcon />}
              </button>
            </div>
          </div>
          <div className={styles.center}>
            <div className={styles.fiat_balance}>$ 0.0</div>
            <div className={styles.crypto_balance}>{balance} ETH</div>
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
        <div className={styles.token_value_table}></div>
        <div className={styles.right}></div>
      </div>
    </main>
  );
};

WalletPage.Layout = DashBoardLayout;
export default WalletPage;
