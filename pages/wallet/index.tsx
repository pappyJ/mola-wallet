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
import { LoaderContext } from "context/loader";
import { AccountContext } from "context/account";
import { ProviderContext } from "context/web3";
import { NetworkContext } from "page_components/wallet/context";
import WalletHeader from "page_components/wallet/header";
import { sendNativeToken } from "utils/transactions";
import { primaryFixedValue } from "constants/digits";
import { IAccount } from "interfaces/IAccount";
import { NETWORKS } from "interfaces/IRpc";
import { getCoinUSD } from "utils/priceFeed";
import { convertToWei, getGasPrice } from "utils/tools";
import { getWalletBalanceEth } from "utils/wallet";
import NET_CONFIG from "config/allNet";
import Notification, { useNotification } from "components/notification";
import NetworkSelector, {
  networkLogoMap,
} from "page_components/wallet/network_selector";
import { shorten } from "utils/string";
import blockies from "ethereum-blockies";
import { gasPriceFixedValue } from "constants/digits";

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

  function c() {
    if (location.hash === "#send") setSendTokenActive(true);
    else setSendTokenActive(false);
  }

  useEffect(() => {
    if (copied) setTimeout(() => setCopied(false), 2000);
  }, [copied]);

  useEffect(() => {
    window.addEventListener("hashchange", c);
    return () => window.removeEventListener("hashchange", c);
  }, []);

  return (
    <main className={styles.main}>
      <WalletHeader />
      <SendModal active={sendTokenActive} />
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
            <a className={styles.secondary} href="#send">
              <span className={styles.icon}>
                <SendIcon />
              </span>
              Send
            </a>
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

type details = {
  currency: string;
  amount: string;
  address: string;
  gasLimit: number;
  addData: string;
};

function SendModal({ active }: { active: boolean }) {
  const [account, setAccount] = useContext(AccountContext);
  const [provider] = useContext(ProviderContext);
  const [currentNetwork] = useContext(NetworkContext);
  const [notification, pushNotification] = useNotification();
  const [network] = useContext(NetworkContext);
  const [startLoader, stopLoader] = useContext(LoaderContext);

  const [gasPrice, setGasPrice] = useState("0");
  const [details, setDetails] = useState({
    currency: network.nativeCurrency.symbol,
    amount: "0",
    address: "",
    gasLimit: 21000,
    addData: "",
  });

  useEffect(() => {
    (async () => {
      try {
        if (details.address && details.amount) {
          const gasFee = await getGasPrice(
            provider,
            {
              to: details.address || account.address,
              from: account.address,
              value: convertToWei(
                details.amount,
                network.nativeCurrency.decimals
              ),
            },
            network.nativeCurrency.decimals
          );

          setGasPrice(gasFee.toFixed(gasPriceFixedValue));
        }
      } catch (error: any) {
        console.log(error.message);
      }
    })();
  }, [details]);

  const sendNative = async (e: any) => {
    e.preventDefault();

    startLoader();

    try {
      const tx = await sendNativeToken(
        provider,
        details.amount,
        currentNetwork.nativeCurrency.decimals,
        details.address,
        account.address,
        account.privateKey,
        account.gasPriority!,
        details.gasLimit
      );

      const balance = Number(
        await getWalletBalanceEth(provider, account.address)
      );

      const balanceFiat = Number(
        (balance <= 0
          ? 0
          : (
              await getCoinUSD(
                NET_CONFIG[currentNetwork.chainName as NETWORKS].nativeCurrency
                  .symbol
              )
            ).value! * balance
        ).toFixed(primaryFixedValue)
      );

      setAccount((prev: IAccount) => ({
        ...prev,

        balance: balance,

        balanceFiat,
      }));

      pushNotification({
        element: "Transaction Successful",
        type: "success",
      });

      console.log(tx);
    } catch (error: any) {
      stopLoader();

      pushNotification({
        element: error.message,
        type: "error",
      });
    }
    
    stopLoader();
  };

  const [addressValid, setAddressValid] = useState({ value: true, msg: "" });
  const [amountValid, setAmountValid] = useState({ value: true, msg: "" });
  const [gasLimitValid, setGasLimitValid] = useState({ value: true, msg: "" });

  //details validation
  useEffect(() => {
    //address validation
    if (details.address.length && !provider.utils.isAddress(details.address))
      setAddressValid({ value: false, msg: "Not a valid address" });
    else setAddressValid({ value: true, msg: "" });

    //amount validation
    if (+details.amount <= 0)
      setAmountValid({
        value: false,
        msg: "Minimum transferable amount is 1",
      });
    else if (+details.amount + +gasPrice > account.balance)
      setAmountValid({
        value: false,
        msg: "Total transaction cost is less than balance",
      });
    else setAmountValid({ value: true, msg: "" });

    //gas limit validation
    if (+details.gasLimit < 21000)
      setGasLimitValid({
        value: false,
        msg: "Gas limit should not be less than 21,000",
      });
    else setGasLimitValid({ value: true, msg: "" });
  }, [details, account]);

  return (
    <>
      <div
        className={`${network_styles.modal} ${
          active ? network_styles.active : ""
        }`}
      >
        <div className={`${network_styles.container} c-scroll`}>
          <h4>Send Token</h4>
          <a className={network_styles.close_btn} href="#">
            <CloseIconInBigCircle />
          </a>

          <div>
            <div className={styles.input_container}>
              <div className={styles.input_box}>
                <label>Select Currency</label>
                <div
                  className={styles.input}
                  style={{ height: "4.5rem", padding: "0 2rem" }}
                >
                  <div className={network_styles.network_icon_box}>
                    {networkLogoMap[network.chainName]}
                  </div>
                  <span>{network.nativeCurrency.symbol}</span>
                </div>
              </div>
              <div className={styles.input_box}>
                <label>Amount</label>
                <input
                  className={`${styles.input} ${
                    !amountValid.value ? styles.error : ""
                  }`}
                  type="number"
                  value={details.amount}
                  onChange={(e) =>
                    setDetails((prev) => ({ ...prev, amount: e.target.value }))
                  }
                />
                {!amountValid.value && <span>{amountValid.msg}</span>}
              </div>
            </div>

            <div
              className={styles.input_container}
              style={{ flexDirection: "column" }}
            >
              <div
                className={`${styles.input_box} ${styles.address_input_box} ${
                  !addressValid.value ? styles.error : ""
                }`}
              >
                <label>Address</label>
                <AddressInput
                  address={details.address}
                  setDetails={setDetails}
                />
              </div>
              {!addressValid.value && <span>{addressValid.msg}</span>}
            </div>

            <div className={styles.transfer_fee_section}>
              <h6>Transfer fee</h6>
              <div className={styles.transfer_fee_container}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <div className={styles.transfer_fee_box}>
                    <span>0.54</span>
                    <span className={styles.timer}>
                      <span className={styles.clock_icon}>
                        <ClockFillIcon />
                      </span>
                      15 mins
                    </span>
                  </div>
                  {gasPrice}
                </div>
                <button className={styles.blue_text}>
                  How fees are determined?
                </button>
              </div>
              <button className={styles.blue_text}>
                Buy more {network.nativeCurrency.symbol}
              </button>
            </div>

            <SendAdvancedSection
              hiddenComponent={
                <GasAndDataForm
                  addData={details.addData}
                  gasLimit={details.gasLimit}
                  gasLimitValid={gasLimitValid}
                  setDetails={setDetails}
                />
              }
            >
              <h6>Advanced</h6>
            </SendAdvancedSection>

            <div className={styles.center_box}>
              <button
                style={{ padding: "2rem 5rem" }}
                className={styles.btn}
                onClick={sendNative}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
      <Notification
        notification={notification}
        pushNotification={pushNotification}
      />
    </>
  );
}

function SendAdvancedSection({
  children,
  hiddenComponent,
}: {
  children: ReactNode;
  hiddenComponent: ReactNode;
}) {
  const [active, setActive] = useState(false);

  return (
    <div className={`${styles.section} ${styles.advanced_section}`}>
      <div style={{ display: "flex" }}>
        <div className={styles.left}>{children}</div>
        <div className={styles.right}>
          <span>Gas limit and Data</span>
          <button
            className={`${styles.caret_down_icon} ${
              active ? styles.active : ""
            }`}
            onClick={() => setActive((prev) => !prev)}
          >
            <CaretDownOutline />
          </button>
        </div>
      </div>
      <div
        className={`${styles.expandable} ${
          active ? styles.active : ""
        } c-scroll`}
      >
        {hiddenComponent}
      </div>
    </div>
  );
}

function GasAndDataForm({
  addData,
  gasLimit,
  gasLimitValid,
  setDetails,
}: {
  addData: string;
  gasLimit: number;
  gasLimitValid: { value: boolean; msg: string };
  setDetails: React.Dispatch<React.SetStateAction<details>>;
}) {
  return (
    <div className={styles.gas_data_form}>
      <div className={styles.info}>
        <h6 className={styles.heading}>For Advanced Users Only</h6>
        <p>
          Please don’t edit these fields unless you are an expert user & know
          what you’re doing. Entering the wrong information could result in your
          transaction failing or getting stuck.
        </p>
      </div>
      <div className={styles.input_container} style={{ marginTop: "2rem" }}>
        <div className={styles.input_box}>
          <label>Gas limit</label>
          <button
            style={{ position: "absolute", right: "0.5rem" }}
            className={styles.blue_text}
            onClick={() => setDetails((prev) => ({ ...prev, gasLimit: 21000 }))}
          >
            Reset to default: 21000
          </button>
          <input
            className={`${styles.input} ${
              !gasLimitValid.value ? styles.error : ""
            }`}
            value={gasLimit}
            onChange={(e) =>
              setDetails((prev) => ({
                ...prev,
                gasLimit: Number(e.target.value),
              }))
            }
          />
          {!gasLimitValid.value && <span>{gasLimitValid.msg}</span>}
        </div>
      </div>
      <div className={styles.input_container}>
        <div className={styles.input_box}>
          <label>Add Data</label>
          <input
            className={styles.input}
            value={addData}
            onChange={(e) =>
              setDetails((prev) => ({ ...prev, addData: e.target.value }))
            }
          />
        </div>
      </div>
    </div>
  );
}

function AddressInput({
  address,
  setDetails,
}: {
  address: string;
  setDetails: React.Dispatch<React.SetStateAction<details>>;
}) {
  const [account] = useContext(AccountContext);
  const [active, setActive] = useState(false);

  return (
    <div
      className={`${styles.address_input} ${active ? styles.active : ""}`}
      onFocusCapture={() => setActive(true)}
      onBlur={() => setActive(false)}
    >
      <div>
        <input
          value={address}
          onChange={(e) =>
            setDetails((prev) => ({ ...prev, address: e.target.value }))
          }
        />
      </div>
      {!!account.addressList?.length && (
        <div className={`${styles.dropdown} c-scroll`}>
          <div style={{ padding: ".5rem" }}>
            {account.addressList?.map((e, i) => (
              <button
                key={i}
                onClick={() => {
                  setDetails((prev) => ({ ...prev, address: e.address }));
                  setActive(false);
                }}
              >
                <Address address={e.address} nickname={e.nickname} />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function Address({ address, nickname }: { address: string; nickname: string }) {
  const imageRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    imageRef.current?.lastChild &&
      imageRef.current.removeChild(imageRef.current.lastChild);
    imageRef.current?.appendChild(
      blockies.create({ seed: address, size: 10, scale: 3 })
    );
  }, [address]);

  return (
    <>
      <span ref={imageRef} className={styles.blockies_img}></span>
      <span className={styles.nickname}>{shorten(nickname, 8, 0, 10)}</span>
      <span className={styles.address}>{shorten(address, 15, 6, 24)}</span>
    </>
  );
}
