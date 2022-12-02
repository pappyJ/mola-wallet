import styles from "styles/pages/wallet/create_access/index.module.css";
import mnemonic_styles from "styles/pages/wallet/create_access/mnemonic.module.css";

import Link from "next/link";
import { useRouter } from "next/router";
import React, { MouseEvent, useEffect, useState } from "react";
import { createMnemonic } from "utils/wallet";

import { NextPageX } from "types/next";
import Steps, { useStep } from "components/step";
import {
  ArrowLeftIcon,
  CloseIconInBigCircle,
  CloseIconInCircle,
  ReloadIcon,
} from "components/icons";
import Notification, { useNotification } from "components/notification";
import WalletCreateAccessLayout from "page_components/wallet/create_access_layout";

const steps = [
  { title: "Write down these words" },
  { title: "Verification" },
  { title: "Congratulations" },
];

const CreateWithMnemonic: NextPageX = () => {
  const [step] = useStep(steps);
  const [words, setWords] = useState<string[]>(new Array(12).fill(""));
  const [success, setSuccess] = useState(false);

  function generateWords(): string[] {
    //create 12 ramdom words
    const mnemonics = createMnemonic();
    return mnemonics;
  }
  function generateAndSetWords() {
    setWords(generateWords());
  }

  useEffect(generateAndSetWords, []);

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
      <h1 style={{ paddingTop: 0 }}>Create wallet with Mnemonic Phrase</h1>

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
    </>
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
      <div className={styles.btn_with_icon_container}>
        <button onClick={generateAndSetWords}>
          <span className={styles.icon_container}>
            <ReloadIcon />
          </span>
          <span>Regenerate</span>
        </button>
      </div>
      <div className={mnemonic_styles.words_container}>
        {words.map((e, i) => (
          <span key={i} className={mnemonic_styles.word_box}>
            {e}
            <span className={mnemonic_styles.counter}>{i + 1}</span>
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
  const [selectedWords, setSelectedWords] = useState(
    new Array(12).fill("").map((e, i) => [e, i])
  );
  const router = useRouter();
  const [notification, pushNotification] = useNotification();

  function addToSelectedWords(e: string, i: number) {
    setSelectedWords((prev) => {
      let done = false;
      return prev.map((ee) => {
        if (ee[0] == "" && e != "" && !done) {
          done = true;
          removeFromWords(i);
          return [e, i];
        } else return ee;
      });
    });
  }

  function clearSelectedWords() {
    setSelectedWords(new Array(12).fill("").map((e, i) => [e, i]));
    setWords(JSON.parse(JSON.stringify(_words)).sort());
  }

  function removeFromWords(i: number) {
    setWords((prev) => {
      let n = JSON.parse(JSON.stringify(prev));
      n[i] = "";
      return n;
    });
  }

  function removeFromSelectedWords(i: number) {
    const $selectedWords = JSON.parse(JSON.stringify(selectedWords));
    if ($selectedWords[i][0] == "") return;

    setWords((prev) => {
      let tt = prev.slice();
      tt[$selectedWords[i][1]] = $selectedWords[i][0];
      return tt;
    });
    setSelectedWords((prev) => {
      let t = prev.slice();
      t[i][0] = "";
      return t;
    });
  }

  function validateSelectedAndContinue(ev: MouseEvent) {
    ev.preventDefault();
    if (selectedWords.every((e, i) => e[0] === _words[i])) {
      setSuccess(true);
      router.replace("?step=3", undefined, { shallow: true });
    } else {
      pushNotification({
        element: (
          <p style={{ textAlign: "center" }}>
            The order of words are incorrect
          </p>
        ),
        type: "error",
      });
      clearSelectedWords();
    }
  }

  useEffect(() => {
    setWords(JSON.parse(JSON.stringify(_words)).sort());
  }, [_words]);

  return (
    <>
      <div className={styles.btn_with_icon_container}>
        <button onClick={clearSelectedWords}>
          <span className={styles.icon_container}>
            <CloseIconInCircle />
          </span>
          <span>Clear</span>
        </button>
      </div>
      <div className={mnemonic_styles.words_container}>
        {selectedWords.map((e, i) => (
          <button
            key={i}
            className={`${mnemonic_styles.word_box} ${
              e[0] !== "" && e[0] !== _words[i] ? mnemonic_styles.error : ""
            }`}
            onClick={() => {
              removeFromSelectedWords(i);
            }}
          >
            <span key={i} className={mnemonic_styles.counter}>
              {i + 1}
            </span>
            {e[0]}
          </button>
        ))}
      </div>
      <h3 className={styles.center_text}>
        Click the words in the correct order
      </h3>
      <div className={mnemonic_styles.words_container}>
        {words.map((e: string, i: number) => (
          <button
            key={i}
            className={`${mnemonic_styles.word_box} ${mnemonic_styles.no_bg}`}
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
      <Notification
        notification={notification}
        pushNotification={pushNotification}
      />
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

CreateWithMnemonic.Layout = WalletCreateAccessLayout;
export default CreateWithMnemonic;
