import DashBoardLayout from "components/layouts/dashboard";
import { NextPageX } from "types/next";
import styles from "styles/pages/wallet/index.module.css";
import Link from "next/link";
import {
  CardIcon,
  CaretDownOutline,
  CaretDownSolidSmall,
  CopyIcon,
  EtherumIcon,
  NotificationSolidIcon,
  ScanIcon,
  SendIcon,
} from "components/icons";
import Image from "next/image";

const WalletPage: NextPageX = () => {
  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <div className={styles.left}>
          <p>
            You can now{" "}
            <Link href="#">
              <a>buy crypto</a>
            </Link>{" "}
            with low fees
          </p>
          <p>
            Enjoy 0.9% fee when you select &apos;Bank account&apos; as payment
            method.{" "}
            <Link href="#">
              <a> Buy crypto now.</a>
            </Link>
          </p>
        </div>
        <div className={styles.right}>
          <div className={styles.network_selector}>
            <div className={styles.ethereum_icon_box}>
              <EtherumIcon />
            </div>
            Ethereum
            <button className={styles.caret_down_box}>
              <CaretDownOutline />
            </button>
          </div>
          <div className={styles.notification_icon_box}>
            <span className={styles.icon}>
              <NotificationSolidIcon />
            </span>
          </div>
        </div>
      </div>
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
              <p className={styles.wallet_id}>432ygh2u2h....23k</p>
            </div>
            <div className={styles.right}>
              <button className={styles.icon_box}>
                <ScanIcon />
              </button>
              <button className={styles.icon_box}>
                <CopyIcon />
              </button>
            </div>
          </div>
          <div className={styles.center}>
            <div className={styles.fiat_balance}>$ 0.0</div>
            <div className={styles.crypto_balance}>0 ETH</div>
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
