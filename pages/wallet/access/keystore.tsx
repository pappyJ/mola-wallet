/* eslint-disable react-hooks/exhaustive-deps */
import { NextPageX } from "types/next";
import { CloseIconInBigCircle } from "components/icons";
import Steps, { useStep } from "components/step";
import { EncryptedKeystoreV3Json } from "web3-core";

import styles from "styles/pages/wallet/create_access/index.module.css";
import keystore_styles from "styles/pages/wallet/create_access/keystore.module.css";

import Link from "next/link";
import React, { useEffect, useRef, useState, useContext } from "react";
import { useRouter } from "next/router";
import {
  decryptWallet,
  getWeb3Connection,
  getWalletBalanceEth,
} from "utils/wallet";
import { NETWORKS } from "interfaces/IRpc";
import Notification, { useNotification } from "components/notification";
import { AccountContext } from "context/account";
import { ProviderContext } from "context/web3";
import { IAccount } from "interfaces/IAccount";
import WalletCreateAccessLayout from "page_components/wallet/create_access_layout";

const steps = [
  {
    title: "Upload file",
    title2: "Upload your keystore file",
    description: "Upload your keystore file to unlock your wallet",
  },
  {
    title: "Enter password",
  },
];

const CreateWithKeystorePage: NextPageX = () => {
  const [step] = useStep(steps);
  const [success, setSuccess] = useState(false);
  const [passwordedWalletFile, setPasswordedWalletFile] = useState(
    {} as EncryptedKeystoreV3Json
  );

  return (
    <>
      <div className={styles.close_icon_container}>
        <Link href="/wallet/access">
          <a className={styles.close_icon}>
            <CloseIconInBigCircle />
          </a>
        </Link>
      </div>

      <h1 style={{ paddingTop: 0 }}>Access wallet with keystore file</h1>

      <div className={styles.step_container}>
        <Steps steps={steps} step={step} />
      </div>

      {step == 1 ? (
        <Step1Component
          setSuccess={setSuccess}
          setPasswordedWalletFile={setPasswordedWalletFile}
        />
      ) : step == 2 ? (
        <Step2Component
          success={success}
          passwordedWalletFile={passwordedWalletFile}
        />
      ) : (
        <></>
      )}
    </>
  );
};

function Step1Component({
  setSuccess,
  setPasswordedWalletFile,
}: {
  setSuccess: React.Dispatch<React.SetStateAction<boolean>>;

  setPasswordedWalletFile: React.Dispatch<
    React.SetStateAction<EncryptedKeystoreV3Json>
  >;
}) {
  const router = useRouter();
  const uploadInputRef = useRef<HTMLInputElement>(null);

  async function afterUploadHandler() {
    const walletFile = await getFile();
    const encryptedWallet = JSON.parse(
      JSON.stringify(walletFile)
    ) as EncryptedKeystoreV3Json;

    setPasswordedWalletFile(encryptedWallet);
    setSuccess(true);

    router.push("?step=2", undefined, { shallow: true });
  }

  async function getFile() {
    const walletKeys = await uploadInputRef.current?.files?.[0].text();
    return Buffer.from(walletKeys!, "base64").toString();
  }

  function selectFile() {
    uploadInputRef.current?.click();
  }

  return (
    <>
      <input
        type="file"
        ref={uploadInputRef}
        style={{ display: "none" }}
        onInput={async () => await afterUploadHandler()}
      />
      <div className={styles.next_button_container}>
        <button
          className={styles.next_button}
          style={{ marginTop: "2rem" }}
          onClick={selectFile}
        >
          Select file
        </button>
      </div>
    </>
  );
}

function Step2Component({
  success,
  passwordedWalletFile,
}: {
  success: boolean;
  passwordedWalletFile: EncryptedKeystoreV3Json;
}) {
  const router = useRouter();
  const passwordRef = useRef<HTMLInputElement>(null);
  const [notification, pushNotification] = useNotification();
  const [account, setAccount] = useContext(AccountContext);
  const [, setProvider] = useContext(ProviderContext);

  useEffect(() => {
    if (!success) router.replace("?step=1");
  }, []);

  useEffect(() => {}, [account]);

  async function handleSubmit(e: any) {
    e.preventDefault();

    try {
      let wallet = decryptWallet(
        passwordedWalletFile,
        `${passwordRef.current?.value}`
      );
      let provider = getWeb3Connection(NETWORKS.ETHEREUM);
      let balance = await getWalletBalanceEth(provider, wallet.address);
      setAccount((prev: IAccount) => ({
        ...prev,

        address: wallet.address,

        balance: Number(balance),
      }));

      setProvider(provider);

      router.push("/wallet");
    } catch (error) {
      pushNotification({
        element: (
          <p style={{ textAlign: "center" }}>
            Could not decrypt. Use correct password.
          </p>
        ),
        type: "error",
      });
    }
  }

  return (
    <>
      <form onSubmit={async (e) => await handleSubmit(e)}>
        <div className={keystore_styles.input_container}>
          <div className={keystore_styles.input_box}>
            <input
              type="password"
              required
              autoFocus={true}
              ref={passwordRef}
            />
          </div>
          <label>Enter Password</label>
        </div>
        <div
          className={styles.next_button_container}
          style={{ marginTop: "4rem" }}
        >
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
}

CreateWithKeystorePage.Layout = WalletCreateAccessLayout;
export default CreateWithKeystorePage;
