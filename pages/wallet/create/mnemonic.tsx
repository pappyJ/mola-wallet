import styles from "styles/pages/wallet/create_access.module.css";
import Steps from "page_components/wallet/create_access/steps";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function CreateWithMnemonic() {
  const [words, setWords] = useState<undefined | string[]>();

  function generateWords(): string[] {
    return new Array(12).fill("Words");
  }

  useEffect(() => {
    setWords(generateWords());
  }, []);

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <div className={styles.mnemonic}>
          <h1>Create wallet with Mnemonic Phrase</h1>

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
}
