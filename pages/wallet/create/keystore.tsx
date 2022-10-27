/* eslint-disable react-hooks/exhaustive-deps */
import Layout from "components/layouts";
import { NextPageX } from "types/next";
import { CloseIconInBigCircle } from "components/icons";
import Steps, { useStep } from "components/step";

import styles from "styles/pages/wallet/create_access/index.module.css";
import keystore_styles from "styles/pages/wallet/create_access/keystore.module.css";

import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { generateWalletUsingKeyStore, storeWalletKey } from "utils/wallet";
import Notification, { useNotification } from "components/notification";

const steps = [
  { title: "Create Password" },
  {
    title: "Download File",
    title2: "Download Keystore File",
    description:
      "Important things to know before downloading the keystore file",
  },
  { title: "Congratulations" },
];

const CreateWithKeystorePage: NextPageX = () => {
  const [success, setSuccess] = useState(false);
  const [password, setPassword] = useState("");
  const [step] = useStep(steps);

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <div className={styles.close_icon_container}>
          <Link href="/wallet/create">
            <a className={styles.close_icon}>
              <CloseIconInBigCircle />
            </a>
          </Link>
        </div>

        <h1 style={{ paddingTop: 0 }}>Create wallet with Keystore File</h1>

        <div className={styles.step_container}>
          <Steps steps={steps} step={step} />
        </div>

        {step == 1 ? (
          <Step1Component setSuccess={setSuccess} setPassword={setPassword} />
        ) : step == 2 ? (
          <Step2Component success={success} password={password} />
        ) : step == 3 ? (
          <Step3Component success={success} />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

function Step1Component({
  setSuccess,
  setPassword,
}: {
  setSuccess: React.Dispatch<React.SetStateAction<boolean>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
}) {
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [notification, pushNotification] = useNotification();

  function clearPasswords() {
    passwordRef.current!.value = "";
    confirmPasswordRef.current!.value = "";
    passwordRef.current?.focus();
  }

  function validatePassword() {}

  function handleFormSubmit(e: any) {
    e.preventDefault();
    if (passwordRef.current!.value.length < 6) {
      pushNotification({
        element: (
          <p style={{ textAlign: "center" }}>
            The password should not be less than 6 characters.
          </p>
        ),
        type: "error",
      });
      clearPasswords();
      return;
    }

    if (!/\d+/.test(passwordRef.current!.value)) {
      pushNotification({
        element: (
          <p style={{ textAlign: "center" }}>
            The password should contain numbers
          </p>
        ),
        type: "error",
      });

      clearPasswords();
      return;
    }

    if (!/\W+/.test(passwordRef.current!.value)) {
      pushNotification({
        element: (
          <p style={{ textAlign: "center" }}>
            The password should contain special characters
          </p>
        ),
        type: "error",
      });

      clearPasswords();
      return;
    }

    if (passwordRef.current?.value !== confirmPasswordRef.current?.value) {
      pushNotification({
        element: (
          <p style={{ textAlign: "center" }}>The passwords do not match</p>
        ),
        type: "error",
      });

      clearPasswords();
      return;
    }

    setPassword(passwordRef.current!.value);
    setSuccess(true);
    router.push("?step=2", undefined, { shallow: true });
  }

  useEffect(() => {
    passwordRef.current?.focus();
  }, []);

  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <div className={keystore_styles.input_container}>
          <div className={keystore_styles.input_box}>
            <input
              type="password"
              required
              autoFocus={true}
              ref={passwordRef}
            />
          </div>
          <label>Create Password</label>
        </div>

        <div className={keystore_styles.input_container}>
          <div className={keystore_styles.input_box}>
            <input type="password" required ref={confirmPasswordRef} />
          </div>
          <label>Confirm Password</label>
        </div>

        <div
          className={styles.next_button_container}
          style={{ marginTop: "3.2rem" }}
        >
          <button type="submit" className={styles.next_button}>
            Create Wallet
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

function Step2Component({
  success,
  password,
}: {
  success: boolean;
  password: string;
}) {
  const router = useRouter();

  useEffect(() => {
    if (!success) router.replace("?step=1", undefined, { shallow: true });
  }, []);

  return (
    <>
      <div className={keystore_styles.card_container}>
        <div className={keystore_styles.card}>
          <div className={keystore_styles.image_container}>
            <span className={keystore_styles.image_box}>
              <Image
                src="/keystore_img_1.svg"
                alt="careful image"
                layout="fill"
              />
            </span>
          </div>
          <div className={keystore_styles.msg}>
            <h4>{"Don't lose it"}</h4>
            <p>Be careful. It cannot be recovered when you lose it</p>
          </div>
        </div>

        <div className={keystore_styles.card}>
          <div className={keystore_styles.image_container}>
            <span className={keystore_styles.image_box}>
              <Image
                src="/keystore_img_2.svg"
                alt="dont'share img"
                layout="fill"
              />
            </span>
          </div>
          <div className={keystore_styles.msg}>
            <h4>{"Don't share it"}</h4>
            <p>
              Your funds will be stolen if you use this file on a malicious
              phishing site.
            </p>
          </div>
        </div>

        <div className={keystore_styles.card}>
          <div className={keystore_styles.image_container}>
            <span className={keystore_styles.image_box}>
              <Image
                src="/keystore_img_3.svg"
                alt="dont'share img"
                layout="fill"
              />
            </span>
          </div>
          <div className={keystore_styles.msg}>
            <h4>Make a backup</h4>
            <p>
              Secure it like the millions of dollars it may one day be worth.
            </p>
          </div>
        </div>
      </div>

      <div className={styles.next_button_container}>
        <Link href="?step=3" shallow={true}>
          <a
            className={styles.next_button}
            style={{ width: "70%" }}
            onClick={async () => {
              const keyFile = await generateWalletUsingKeyStore(password);

              storeWalletKey(
                keyFile,
                `${new Date(Date.now()).toISOString()}.json`
              );
            }}
          >
            Download
          </a>
        </Link>
      </div>
    </>
  );
}

function Step3Component({ success }: { success: boolean }) {
  const router = useRouter();

  useEffect(() => {
    if (!success) router.replace("?step=1", undefined, { shallow: true });
  }, []);

  return (
    <>
      <div className={styles.congrats_msg}>
        <p>
          You are now ready to take advantage of all that Mola Digital has to
          offer!
        </p>
      </div>
      <div className={styles.next_button_container}>
        <Link href="/wallet/access" shallow={true}>
          <a className={styles.next_button}>Access Wallet</a>
        </Link>
      </div>
    </>
  );
}

CreateWithKeystorePage.Layout = Layout;
export default CreateWithKeystorePage;
