/* eslint-disable react-hooks/exhaustive-deps */
import styles from "styles/pages/wallet/create_access.module.css";
import Steps from "page_components/wallet/create_access/steps";
import Link from "next/link";
import { useEffect, useLayoutEffect, useState } from "react";
import { NextPageX } from "types/next";
import Layout from "components/layouts";
import { createMnemonic } from "utils/wallet";
import { CloseIcon, ReloadIcon } from "components/icons";
import { useRouter } from "next/router";

const steps = [
  { title: "Write down these words" },
  { title: "Verification" },
  { title: "Well done" },
];

const CreateWithMnemonic: NextPageX = () => {
  const [step, setStep] = useState(1);
  const [words, setWords] = useState<undefined | string[]>();
  const router = useRouter();

  function generateWords(): string[] {
    //create 12 ramdom words
    const mnemonics = createMnemonic();
    return mnemonics;
  }
  function generateAndSetWords() {
    setWords(generateWords());
  }
  function setStepByQuery() {
    let step = Number(new URLSearchParams(window.location.search).get("step"));

    if (typeof !isNaN(step) && step <= steps.length && step >= 1) setStep(step);
    else setStep(1);
  }

  useLayoutEffect(setStepByQuery, []);
  useEffect(() => {
    generateAndSetWords();

    router.events.on("routeChangeComplete", setStepByQuery);
    return () => router.events.off("routeChangeComplete", setStepByQuery);
  }, []);

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <div className={styles.mnemonic}>
          <div className={styles.close_icon_container}>
            <Link href="/wallet/create">
              <a className={styles.close_icon}>
                <CloseIcon />
              </a>
            </Link>
          </div>
          <h1 className={styles.sm_pad}>Create wallet with Mnemonic Phrase</h1>

          <div className={styles.step_container}>
            <Steps steps={steps} step={step} />
          </div>

          {step == 1 ? (
            <Step1Component
              words={words}
              generateAndSetWords={generateAndSetWords}
            />
          ) : step == 2 ? (
            <Step2Component />
          ) : step == 3 ? (
            <Step3Component />
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

function Step1Component({
  words,
  generateAndSetWords,
}: {
  words: string[] | undefined;
  generateAndSetWords: () => void;
}) {
  return (
    <>
      <div className={styles.update_btn_container}>
        <button onClick={generateAndSetWords}>
          <span className={styles.icon_container}>
            <ReloadIcon />
          </span>
          <span>Update</span>
        </button>
      </div>
      <div className={styles.words_container}>
        {words
          ? words.map((e, i) => <span key={i}>{e}</span>)
          : new Array(12).fill("").map((e, i) => <span key={i}></span>)}
      </div>

      <div className={styles.next_button_container}>
        <Link href="?step=2" shallow={true}>
          <a className={styles.next_button}>Next</a>
        </Link>
      </div>
    </>
  );
}
function Step2Component() {
  return (
    <>
      <div className={styles.next_button_container}>
        <Link href="?step=1" shallow={true}>
          <a className={styles.next_button_secondary}>Previous</a>
        </Link>
        <Link href="?step=3" shallow={true}>
          <a className={styles.next_button}>Next</a>
        </Link>
      </div>
    </>
  );
}
function Step3Component() {
  return (
    <>
      <div className={styles.next_button_container}>
        <Link href="?step=1" shallow={true}>
          <a className={styles.next_button}>Back</a>
        </Link>
      </div>
    </>
  );
}

CreateWithMnemonic.Layout = Layout;
export default CreateWithMnemonic;
