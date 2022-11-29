import { nanoid } from "nanoid";
import DashBoardLayout from "page_components/wallet/layout";
import { NextPageX } from "types/next";
import { shorten } from "utils/string";
import blockies from "ethereum-blockies";
import { gasPriceFixedValue, TX_STATUS, TX_TYPE } from "constants/digits";
import { sendTxn, signNativeTokenTx, sendERC20Token } from "utils/transactions";
import { primaryFixedValue } from "constants/digits";
import { IAccount } from "interfaces/IAccount";
import { NETWORKS } from "interfaces/IRpc";
import { getCoinUSD } from "utils/priceFeed";
import { convertToWei, getGasPrice } from "utils/tools";
import { getWalletBalanceEth } from "utils/wallet";
import { ProviderContext } from "context/web3";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CaretDownOutline,
  ClockFillIcon,
  TickHeavyIcon,
} from "components/icons";
import React, {
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { AccountContext } from "context/account";
import { NetworkContext } from "page_components/wallet/context";
import NET_CONFIG from "config/allNet";
import Notification, { useNotification } from "components/notification";
import NetworkSelector, {
  networkLogoMap,
} from "page_components/wallet/network_selector";
import WalletHeader from "page_components/wallet/header";
import { LoaderContext } from "context/loader";
import Image from "next/image";
import styles from "styles/pages/wallet/send.module.css";
import network_styles from "styles/pages/wallet/network_selector.module.css";
import { useRouter } from "next/router";
import Link from "next/link";
import TokenValue from "page_components/wallet/token_value";
import TransactionHistory from "page_components/wallet/transaction_history";
import { AssetProviderContext } from "context/web3/assets";
import { fetchWalletAssets } from "utils/assetEngine";
import { Notifier } from "utils/notifications";

type details = {
  currency: string;
  amount: string;
  address: string;
  gasLimit: string;
  addData: string;
};

const SendWalletPage: NextPageX = () => {
  const [account, setAccount] = useContext(AccountContext);
  const [provider] = useContext(ProviderContext);
  const [currentNetwork] = useContext(NetworkContext);
  const [notification, pushNotification] = useNotification();
  const [network] = useContext(NetworkContext);
  const [assets] = useContext(AssetProviderContext);
  const [currentToken, setCurrentToken] = useState<any>();
  const [currentTxId, setCurrentTxId] = useState<string>();
  const router = useRouter();

  const isNotNative = !!currentToken && !!router.query.token;

  const [startLoader, stopLoader] = useContext(LoaderContext);
  const [, setAssetProvider] = useContext(AssetProviderContext);

  const [gasPrice, setGasPrice] = useState("0");
  const [details, setDetails] = useState({
    currency: (router.query.token as string) || network.nativeCurrency.symbol,
    amount: "0",
    address: "",
    gasLimit: "21000",
    addData: "",
  });

  const [addressValid, setAddressValid] = useState({ value: true, msg: "" });
  const [amountValid, setAmountValid] = useState({ value: true, msg: "" });
  const [gasLimitValid, setGasLimitValid] = useState({ value: true, msg: "" });
  const [txHash, setTxHash] = useState(currentNetwork.blockExplorer);

  const [transConfirmModalActive, setTransConfirmModalActive] = useState(false);
  const [transInitModalActive, setTransInitModalActive] = useState(false);

  const sendNative = async (e: any) => {
    e.preventDefault();

    startLoader();

    try {
      const tx = isNotNative
        ? await sendERC20Token(
            provider,
            details.amount,
            currentToken.token.decimals,
            details.address,
            account.address,
            account.privateKey,
            account.gasPriority!,
            Number(details.gasLimit),
            currentToken.token.contractAddress
          )
        : await signNativeTokenTx(
            provider,
            details.amount,
            currentNetwork.nativeCurrency.decimals,
            details.address,
            account.address,
            account.privateKey,
            account.gasPriority!,
            Number(details.gasLimit)
          );

      const nonce = nanoid();

      setCurrentTxId(nonce);

      Notifier.create(nonce, {
        id: nonce,
        from: account.address,
        to: account.address,
        txHash: tx.transactionHash!,
        amount: +details.amount,
        gasPrice: +gasPrice,
        gasLimit: +details.gasLimit,
        status: TX_STATUS.PENDING,
        time: Date.now(),
        direction: TX_TYPE.OUT,
      });

      setTxHash(`${currentNetwork.blockExplorer}/tx/${tx.transactionHash}`);

      setTransInitModalActive(true);

      await sendTxn(provider, tx);

      Notifier.update(nonce, TX_STATUS.SUCCESS);

      const walletAssets = await fetchWalletAssets(
        account.address,
        network.chainId
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

      setAssetProvider(walletAssets);

      pushNotification({
        element: "Transaction Successful",
        type: "success",
      });
    } catch (error: any) {
      console.log(error);

      Notifier.update(currentTxId!, TX_STATUS.FAILED);

      stopLoader();

      pushNotification({
        element: error.message,
        type: "error",
      });
    }

    stopLoader();
    setTransConfirmModalActive(false);
  };

  function resetDetails() {
    setDetails({
      currency: (router.query.token as string) || network.nativeCurrency.symbol,
      amount: "0",
      address: "",
      gasLimit: "21000",
      addData: "",
    });
  }

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [details]);

  useEffect(() => {
    if (assets.length) {
      setCurrentToken(
        assets.find((e: any) => e.token?.symbol === router.query.token)
      );
    }
  }, [assets, router.query]);

  //details validation
  useEffect(() => {
    //address validation
    if (details.address.length && !provider.utils.isAddress(details.address))
      setAddressValid({ value: false, msg: "Not a valid address" });
    else setAddressValid({ value: true, msg: "" });

    //amount validation
    if (isNaN(Number(details.amount)))
      setAmountValid({ value: false, msg: "Enter a valid number" });
    else if (+details.amount <= 0)
      setAmountValid({
        value: false,
        msg: "Enter valid amount",
      });
    else if (
      (!isNotNative && +details.amount + +gasPrice > account.balance) ||
      +details.amount > +currentToken?.value ||
      +gasPrice > account.balance
    )
      setAmountValid({
        value: false,
        msg: "Total transaction cost is less than balance",
      });
    else setAmountValid({ value: true, msg: "" });

    //gas limit validation
    if (isNaN(Number(details.gasLimit)))
      setGasLimitValid({ value: false, msg: "Enter a valid number" });
    else if (+details.gasLimit < 21000)
      setGasLimitValid({
        value: false,
        msg: "Gas limit should not be less than 21,000",
      });
    else setGasLimitValid({ value: true, msg: "" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [details, account, gasPrice]);

  return (
    <div className={styles.main}>
      <WalletHeader />
      <TransConfirmModal
        active={transConfirmModalActive}
        setActive={setTransConfirmModalActive}
        details={details}
        gasPrice={gasPrice}
        sendToken={sendNative}
      />
      <TransInitModal
        txHash={txHash}
        active={transInitModalActive}
        setActive={setTransInitModalActive}
      />
      <div style={{ display: "flex" }}>
        <div>
          <div className={styles.send_container}>
            <h2 className={styles.heading}>
              <button
                className={styles.arrow_left}
                onClick={() => router.back()}
              >
                <ArrowLeftIcon />
              </button>
              Send Token
            </h2>

            <div>
              <div>
                <div className={styles.input_container}>
                  <div className={styles.input_box}>
                    <label>Select Currency</label>
                    <div
                      className={styles.input}
                      style={{ height: "4.5rem", padding: "0 2rem" }}
                    >
                      <span
                        className={network_styles.network_icon_box}
                        style={{
                          marginRight: "1.6rem",
                          position: "relative",
                        }}
                      >
                        {currentToken?.token?.logo ? (
                          <Image
                            src={currentToken.token.logo}
                            layout="fill"
                            alt=""
                          />
                        ) : (
                          networkLogoMap[network.chainName]
                        )}
                      </span>
                      <span>
                        {isNotNative
                          ? details.currency
                          : currentNetwork.nativeCurrency.symbol}
                      </span>
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
                        setDetails((prev) => ({
                          ...prev,
                          amount: e.target.value,
                        }))
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
                    className={`${styles.input_box} ${
                      styles.address_input_box
                    } ${!addressValid.value ? styles.error : ""}`}
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
                        <span style={{ fontSize: "1.7rem" }}>0.54</span>
                        <span className={styles.timer}>
                          <span className={styles.clock_icon}>
                            <ClockFillIcon />
                          </span>
                          15 mins
                        </span>
                        <button
                          className={styles.caret_down_icon}
                          style={{ marginLeft: "1rem", color: "#00244e" }}
                        >
                          <CaretDownOutline />
                        </button>
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
                    className={`${styles.btn} ${styles.btn_secondary}`}
                    style={{ width: "15rem", marginRight: "2rem" }}
                    onClick={resetDetails}
                  >
                    Clear All
                  </button>
                  <button
                    style={{ width: "15rem" }}
                    className={styles.btn}
                    onClick={() => setTransConfirmModalActive(true)}
                    disabled={
                      !(
                        gasLimitValid.value &&
                        addressValid.value &&
                        amountValid.value &&
                        details.address
                      )
                    }
                    // disabled={true}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
          <Notification
            notification={notification}
            pushNotification={pushNotification}
          />
        </div>
        <div className={styles.cards_container}>
          <div>
            <NetworkSelector />
          </div>
          <div>
            <TokenValue />
          </div>
          <div>{Notifier.state ? <TransactionHistory /> : <></>}</div>
        </div>
      </div>
    </div>
  );
};

export default SendWalletPage;
SendWalletPage.Layout = DashBoardLayout;

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
  gasLimit: string;
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
            onClick={() =>
              setDetails((prev) => ({ ...prev, gasLimit: "21000" }))
            }
          >
            Reset to default: 21000
          </button>
          <input
            className={`${styles.input} ${
              !gasLimitValid.value ? styles.error : ""
            }`}
            value={gasLimit}
            type="number"
            onChange={(e) =>
              setDetails((prev) => ({
                ...prev,
                gasLimit: e.target.value,
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

function TransConfirmModal({
  active,
  setActive,
  details,
  gasPrice,
  sendToken,
}: {
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  details: details;
  gasPrice: string;
  sendToken: (e: any) => any;
}) {
  const [network] = useContext(NetworkContext);
  const [account] = useContext(AccountContext);
  const imageRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    imageRef.current?.lastChild &&
      imageRef.current.removeChild(imageRef.current.lastChild);
    imageRef.current?.appendChild(
      blockies.create({ seed: account.address, size: 10, scale: 3 })
    );
  }, [account.address]);

  return (
    <div
      className={`${network_styles.modal} ${
        active ? network_styles.active : ""
      }`}
    >
      <div
        className={`${network_styles.container} c-scroll`}
        style={{ padding: "4rem" }}
      >
        <h4>TRANSACTION CONFIRMATION</h4>
        <p style={{ fontSize: "1.7rem", padding: "1rem 0 3rem" }}>
          Please double check everything, mola team will not be able to reverse
          your transactions once it summited, you will still be charged gas fee
          even if the transaction fails.{" "}
          <Link href="#">
            <a style={{ color: "#1e89dd" }}>Learn More</a>
          </Link>
        </p>
        <div className={styles.trans_illustration}>
          <div className={styles.bodies}>
            <h6>SENDING</h6>
            <div className={styles.sec}>
              <span className={network_styles.network_icon_box}>
                {networkLogoMap[network.chainName]}
              </span>
              <div>
                <p>{details.amount}</p>
                <p>ALL 0</p>
              </div>
            </div>
          </div>
          <div className={styles.icon_box}>
            <span className={styles.arrow_right}>
              <ArrowRightIcon />
            </span>
          </div>
          <div className={styles.bodies}>
            <h6>TO ADDRESS</h6>
            <div className={styles.sec}>
              <span
                className={network_styles.network_icon_box}
                ref={imageRef}
                style={{ borderRadius: "50%", overflow: "hidden" }}
              ></span>
              <div>
                <p>Username</p>
                <p>{shorten(details.address, 8, 4, 15)}</p>
              </div>
            </div>
          </div>
        </div>
        <div style={{ margin: "2rem 0" }}>
          <div className={styles.transaction_details}>
            <p>TRANSACTION FEE</p>
            <p>{Number(gasPrice).toFixed(10)}</p>
          </div>
          <div className={styles.transaction_details}>
            <p>TOTAL</p>
            <p>{+details.amount + +gasPrice}</p>
          </div>
        </div>
        <div className={styles.transaction_label}>Transaction Details</div>
        <div className={styles.center_box}>
          <button
            className={`${styles.btn} ${styles.btn_secondary}`}
            style={{ minWidth: "15rem", marginRight: "2rem" }}
            onClick={() => setActive(false)}
          >
            Cancel
          </button>
          <button
            style={{ minWidth: "15rem" }}
            className={styles.btn}
            onClick={sendToken}
          >
            Confirm & Send
          </button>
        </div>
      </div>
    </div>
  );
}

function TransInitModal({
  active,
  setActive,
  txHash,
}: {
  txHash: string;
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div
      className={`${network_styles.modal} ${
        active ? network_styles.active : ""
      }`}
    >
      <div
        className={`${network_styles.container} ${styles.trans_init} c-scroll`}
        style={{ padding: "4rem" }}
      >
        <h4>TRANSACTION INITIATED</h4>
        <div className={styles.tick_icon_box}>
          <TickHeavyIcon />
        </div>
        <div style={{ margin: "2rem" }}>
          <p style={{ textAlign: "center", fontSize: "1.7rem" }}>
            Ones completed the token amount will be deposited to the address you
            provided, this takes a few min depending on how conjested the
            etherum network is.
          </p>
        </div>
        <div className={styles.href_box}>
          <Link href="#">
            <a>View Mola Coin</a>
          </Link>
          <Link href={txHash}>
            <a target="_blank">View Progress</a>
          </Link>
        </div>
        <div className={styles.center_box}>
          <button
            className={styles.btn}
            style={{ width: "30rem" }}
            onClick={() => setActive(false)}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
