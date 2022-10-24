/* eslint-disable react-hooks/exhaustive-deps */
import Layout from "components/layouts";
import { NextPageX } from "types/next";
import { CloseIconInBigCircle } from "components/icons";
import Steps, { useStep } from "components/step";

import styles from "styles/pages/wallet/create_access/index.module.css";
import keystore_styles from "styles/pages/wallet/create_access/keystore.module.css";

import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";

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

  return (
    <div className={styles.main}>
      <div className={styles.container}>
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
          <Step1Component setSuccess={setSuccess} />
        ) : step == 2 ? (
          <Step2Component success={success} />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

function Step1Component({
  setSuccess,
}: {
  setSuccess: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const router = useRouter();
  const uploadInputRef = useRef<HTMLInputElement>(null);

  function afterUploadHandler() {
    console.log(getFile());
    setSuccess(true);
    router.push("?step=2", undefined, { shallow: true });
  }

  function getFile() {
    return uploadInputRef.current?.files?.[0];
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
        onInput={afterUploadHandler}
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

function Step2Component({ success }: { success: boolean }) {
  const router = useRouter();
  const passwordRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!success) router.replace("?step=1");
  }, []);

  function handleSubmit(e: any) {
    e.preventDefault();
    router.push("/wallet");
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className={keystore_styles.input_container}>
        <div className={keystore_styles.input_box}>
          <input type="password" required autoFocus={true} ref={passwordRef} />
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
  );
}

CreateWithKeystorePage.Layout = Layout;
export default CreateWithKeystorePage;
