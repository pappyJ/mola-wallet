/* eslint-disable react-hooks/exhaustive-deps */
import styles from "styles/pages/wallet/create_access.module.css";
import Steps from "page_components/wallet/create_access/steps";
import Link from "next/link";
import React, { MouseEvent, useEffect, useLayoutEffect, useState } from "react";
import { NextPageX } from "types/next";
import Layout from "components/layouts";
import { createMnemonic } from "utils/wallet";
import {
  CloseIconInBigCircle,
  CloseIconInCircle,
  ReloadIcon,
} from "components/icons";
import { useRouter } from "next/router";

const steps = [
  { title: "Write down these words" },
  { title: "Verification" },
  { title: "Well done" },
];

const CreateWithMnemonic: NextPageX = () => {
  const [step, setStep] = useState(1);
  const [words, setWords] = useState<string[]>(new Array(12).fill(""));
  const [success, setSuccess] = useState(false);
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
                <CloseIconInBigCircle />
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
            <Step2Component words={words} setSuccess={setSuccess} />
          ) : step == 3 ? (
            <Step3Component success={success} setSuccess={setSuccess} />
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
  words: string[];
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
        {words.map((e, i) => (
          <span key={i} className={styles.word_box}>
            {e}
            <span className={styles.counter}>{i + 1}</span>
          </span>
        ))}
      </div>

      <div className={styles.next_button_container}>
        <Link href="?step=2" shallow={true}>
          <a className={styles.next_button}>Next</a>
        </Link>
      </div>
    </>
  );
}

function Step2Component({
  words: _words,
  setSuccess,
}: {
  words: string[];
  setSuccess: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [words, setWords] = useState<string[]>(
    JSON.parse(JSON.stringify(_words)).sort()
  );
  const [selectedWords, setSelectedWords] = useState(new Array(12).fill(""));
  const router = useRouter();

  function addToSelectedWords(e: string, i: number) {
    setSelectedWords((prev) => {
      let done = false;
      return prev.map((ee) => {
        if (ee == "" && e != "" && !done) {
          done = true;
          removeFromWords(i);
          return e;
        } else return ee;
      });
    });
  }

  function clearSelectedWords() {
    setSelectedWords(new Array(12).fill(""));
    setWords(JSON.parse(JSON.stringify(_words)).sort());
  }

  function removeFromWords(i: number) {
    setWords((prev) => {
      let n = JSON.parse(JSON.stringify(prev));
      n[i] = "";
      return n;
    });
  }

  function validateSelectedAndContinue(ev: MouseEvent) {
    ev.preventDefault();
    if (selectedWords.every((e, i) => e === _words[i])) {
      setSuccess(true);
      router.replace("?step=3", undefined, { shallow: true });
    } else {
      alert("The order of words are incorrect");
      clearSelectedWords();
    }
  }

  useEffect(() => {
    setWords(JSON.parse(JSON.stringify(_words)).sort());
  }, [_words]);

  return (
    <>
      <div className={styles.update_btn_container}>
        <button onClick={clearSelectedWords}>
          <span className={styles.icon_container}>
            <CloseIconInCircle />
          </span>
          <span>Clear</span>
        </button>
      </div>
      <div className={styles.words_container}>
        {selectedWords.map((e, i) => (
          <span
            key={i}
            className={`${styles.word_box} ${
              e !== "" && e !== _words[i] ? styles.error : ""
            }`}
          >
            <span key={i} className={styles.counter}>
              {i + 1}
            </span>
            {e}
          </span>
        ))}
      </div>
      <h3 className={styles.center_text}>
        Click the words in the correct order
      </h3>
      <div className={styles.words_container}>
        {words.map((e: string, i: number) => (
          <button
            key={i}
            className={`${styles.word_box} ${styles.no_bg}`}
            onClick={() => {
              if (e !== "") addToSelectedWords(e, i);
            }}
            tabIndex={e === "" ? -1 : 0}
            style={{ cursor: e === "" ? "default" : "pointer" }}
          >
            {e}
          </button>
        ))}
      </div>
      <div className={styles.next_button_container}>
        <Link href="?step=1" shallow={true}>
          <a className={styles.next_button_secondary}>Previous</a>
        </Link>
        <Link href="?step=3" shallow={true}>
          <a
            className={styles.next_button}
            onClick={(e) => validateSelectedAndContinue(e)}
          >
            Next
          </a>
        </Link>
      </div>
    </>
  );
}
function Step3Component({
  success,
  setSuccess,
}: {
  success: boolean;
  setSuccess: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const router = useRouter();

  useEffect(() => {
    if (!success) router.replace("?step=1", undefined, { shallow: true });
    setSuccess(false);
  }, []);
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
