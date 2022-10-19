import styles from "styles/pages/wallet/create_access.module.css";
import Steps from "page_components/wallet/create_access/steps";
import Link from "next/link";
import { useEffect, useState } from "react";
import { NextPageX } from "types/next";
import Layout from "components/layouts";
import { CloseIcon, ReloadIcon } from "components/icons";

const CreateWithMnemonic: NextPageX = () => {
  const [words, setWords] = useState<undefined | string[]>();

  function generateWords(): string[] {
    //insert generating random word fn
    //return array of strings
    return new Array(12).fill("Words");
  }

  useEffect(() => {
    setWords(generateWords());
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
            <Steps
              steps={[
                {
                  title: "Write down these words",
                },
                { title: "Verification" },
                { title: "Well done" },
              ]}
              step={1}
            />
          </div>
        </div>
        <div className={styles.update_btn_container}>
          <button>
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
          <Link href="?section=2">
            <a className={styles.next_button}>Next</a>
          </Link>
        </div>
      </div>
    </div>
  );
};

CreateWithMnemonic.Layout = Layout;
export default CreateWithMnemonic;
