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
import { decryptWallet, getWeb3Connection } from "utils/wallet";
import { NETWORKS } from "utils/Irpc";
import Notification, { useNotification } from "components/notification";

import { AddressContext } from "context/address";
import { ProviderContext } from "context/web3";
import WalletCreateAccessLayout from "components/layouts/wallet_create_access";

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
  const [, setAddress] = useContext(AddressContext);
  const [, setProvider] = useContext(ProviderContext);

  useEffect(() => {
    if (!success) router.replace("?step=1");
  }, []);

  function handleSubmit(e: any) {
    e.preventDefault();

    try {
      let wallet = decryptWallet(
        passwordedWalletFile,
        `${passwordRef.current?.value}`
      );
      setProvider(getWeb3Connection(NETWORKS.ETHEREUM));
      setAddress(wallet.address);
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
      <form onSubmit={handleSubmit}>
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
