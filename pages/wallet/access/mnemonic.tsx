import styles from "styles/pages/wallet/create_access/index.module.css";
import mnemonic_styles from "styles/pages/wallet/create_access/mnemonic.module.css";

import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import {
  accessWalletUsingMnemonic,
  getWeb3Connection,
  getWalletBalanceEth,
} from "utils/wallet";
import { fetchWalletAssets } from "utils/assetEngine";

import { NextPageX } from "types/next";
import Steps, { useStep } from "components/step";
import { ArrowLeftIcon, CloseIconInBigCircle } from "components/icons";
import Notification, { useNotification } from "components/notification";
import { LoaderContext } from "context/loader";
import { AccountContext } from "context/account";
import { ProviderContext } from "context/web3";
import { AssetProviderContext } from "context/web3/assets";
import { IAccount } from "interfaces/IAccount";
import { NETWORKS } from "interfaces/IRpc";
import WalletCreateAccessLayout from "page_components/wallet/create_access_layout";
import { GAS_PRIORITY, primaryFixedValue } from "constants/digits";
import { getCoinUSD } from "utils/priceFeed";
import NET_CONFIG from "config/allNet";
import { SocketProviderContext } from "context/web3/socket";

const steps = [{ title: "Type in your mnemonic phrase" }];

const CreateWithMnemonic: NextPageX = () => {
  const [step] = useStep(steps);
  const router = useRouter();
  const [notification, pushNotification] = useNotification();
  const [account, setAccount] = useContext(AccountContext);
  const [, setProvider] = useContext(ProviderContext);
  const [, setAssetProvider] = useContext(AssetProviderContext);
  const [startLoader, stopLoader] = useContext(LoaderContext);
  const [prevSocketProvider, setSocketProvider] = useContext(
    SocketProviderContext
  );
  function getMemonicInputValues(): string[] {
    const mnemonicInputs: string[] = [];
    for (let i = 1; i <= 12; i++) {
      mnemonicInputs.push(
        (
          document.getElementById(`mnemonic_input_${i}`) as HTMLInputElement
        ).value
          .trim()
          .toLowerCase()
      );
    }
    return mnemonicInputs;
  }

  async function handleSubmit(e: any) {
    e.preventDefault();

    startLoader();

    if (getMemonicInputValues().some((e) => !e.length)) {
      pushNotification({
        element: (
          <p style={{ textAlign: "center" }}>Enter all mnemonic phrase</p>
        ),
      });
      stopLoader();
      return;
    }

    const mnemonicArray = getMemonicInputValues();

    try {
      const wallet = await accessWalletUsingMnemonic(mnemonicArray.join(" "));

      const walletAssets = await fetchWalletAssets(
        wallet.address,
        NET_CONFIG.ETHEREUM.chainId
      );

      const provider = getWeb3Connection(NETWORKS.ETHEREUM);

      const balance = Number(
        await getWalletBalanceEth(provider, wallet.address)
      );

      const balanceFiat = Number(
        (balance <= 0
          ? 0
          : (await getCoinUSD(NET_CONFIG.ETHEREUM.nativeCurrency.symbol))
              .value! * balance
        ).toFixed(primaryFixedValue)
      );

      setAccount((prev: IAccount) => ({
        ...prev,

        address: wallet.address,

        balance: balance,

        balanceFiat,

        privateKey: wallet.privateKey,

        addressList: [{ nickname: "my address", address: wallet.address }],

        gasPriority: GAS_PRIORITY.NORMAL,
      }));

      setProvider(provider);

      setAssetProvider(walletAssets);
      router.push("/wallet");
    } catch (error) {
      stopLoader();

      pushNotification({
        element: (
          <p style={{ textAlign: "center" }}>
            Could not decrypt, enter correct mnemonic
          </p>
        ),
      });
    }

    stopLoader();
  }

  useEffect(() => {
    if (account.address) {
      if (prevSocketProvider.version) {
        prevSocketProvider.eth.clearSubscriptions((err, res) => {
          return console.log(err, res);
        });

        setSocketProvider(null);
      }
      const socketProvider = getWeb3Connection(NETWORKS.ETHEREUM, true);
      socketProvider.eth.subscribe("newBlockHeaders", async (err) => {
        if (err) {
          console.log(err);
        } else {
          const balance = Number(
            await getWalletBalanceEth(socketProvider, account.address)
          );
          if (balance !== account.balance) {
            const balanceFiat = Number(
              (balance <= 0
                ? 0
                : (await getCoinUSD(NET_CONFIG.ETHEREUM.nativeCurrency.symbol))
                    .value! * balance
              ).toFixed(primaryFixedValue)
            );

            setAccount((prev: IAccount) => ({
              ...prev,

              balance: balance,

              balanceFiat,
            }));
          }
        }
      });

      setSocketProvider(socketProvider);
    }
  }, []);

  return (
    <>
      <div className={styles.back_controller}>
        <div className={styles.close_icon_container}>
          <Link href="/wallet/access">
            <a className={styles.close_icon}>
              <CloseIconInBigCircle />
            </a>
          </Link>
        </div>
        <div className={styles.btn_with_icon_container}>
          <Link href="/wallet/access">
            <a>
              <span className={styles.icon_container}>
                <ArrowLeftIcon />
              </span>
              <span>Back</span>
            </a>
          </Link>
        </div>
      </div>
      <h1 style={{ paddingTop: 0 }}>Access wallet with Mnemonic Phrase</h1>

      <div className={styles.step_container}>
        <Steps steps={steps} step={step} />
      </div>

      <form onSubmit={async (e) => await handleSubmit(e)}>
        <div className={mnemonic_styles.words_container}>
          {new Array(12).fill("").map((e, i) => (
            <span key={i} className={mnemonic_styles.word_box}>
              <input
                type="text"
                spellCheck={false}
                id={`mnemonic_input_${i + 1}`}
                autoComplete="off"
              />
              <span className={mnemonic_styles.counter}>{i + 1}</span>
            </span>
          ))}
        </div>

        <div className={styles.next_button_container}>
          <button type="submit" className={styles.next_button}>
            Access wallet
          </button>
        </div>
      </form>
      <Notification
        notification={notification}
        pushNotification={pushNotification}
      />
    </>
  );
};

CreateWithMnemonic.Layout = WalletCreateAccessLayout;
export default CreateWithMnemonic;
