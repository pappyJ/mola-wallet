import styles from "styles/pages/wallet/create_access/index.module.css";
import mnemonic_styles from "styles/pages/wallet/create_access/mnemonic.module.css";

import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import { 
  accessWalletUsingMnemonic ,
  getWeb3Connection,
  getWalletBalanceEth,
} from "utils/wallet";

import { NextPageX } from "types/next";
import Steps, { useStep } from "components/step";
import { CloseIconInBigCircle } from "components/icons";
import Notification, { useNotification } from "components/notification";
import { AccountContext } from "context/account";
import { ProviderContext } from "context/web3";
import { IAccount } from "interfaces/IAccount";
import { NETWORKS } from "interfaces/IRpc";
import WalletCreateAccessLayout from "page_components/wallet/create_access_layout";

const steps = [{ title: "Type in your mnemonic phrase" }];

const CreateWithMnemonic: NextPageX = () => {
  const [step] = useStep(steps);
  const router = useRouter();
  const [notification, pushNotification] = useNotification();
  const [, setAccount] = useContext(AccountContext);
  const [, setProvider] = useContext(ProviderContext);

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

    if (getMemonicInputValues().some((e) => !e.length)) {
      pushNotification({
        element: (
          <p style={{ textAlign: "center" }}>Enter all mnemonic phrase</p>
        ),
      });
      return;
    }

    const mnemonicArray = getMemonicInputValues();

    try {
      const wallet = await accessWalletUsingMnemonic(mnemonicArray.join(" "));

      let provider = getWeb3Connection(NETWORKS.ETHEREUM);

      let balance = await getWalletBalanceEth(provider, wallet.address);
      setAccount((prev: IAccount) => ({
        ...prev,

        address: wallet.address,

        balance,
      }));

      setProvider(provider);
      router.push("/wallet");
    } catch (error) {
      pushNotification({
        element: (
          <p style={{ textAlign: "center" }}>
            Could not decrypt, enter correct mnemonic
          </p>
        ),
      });
    }
  }

  return (
    <>
      <div className={styles.close_icon_container}>
        <Link href="/wallet/access">
          <a className={styles.close_icon}>
            <CloseIconInBigCircle />
          </a>
        </Link>
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
