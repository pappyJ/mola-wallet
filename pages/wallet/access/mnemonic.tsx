import styles from "styles/pages/wallet/create_access/index.module.css";
import mnemonic_styles from "styles/pages/wallet/create_access/mnemonic.module.css";

import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { createMnemonic } from "utils/wallet";

import { NextPageX } from "types/next";
import Layout from "components/layouts";
import Steps, { useStep } from "components/step";
import { CloseIconInBigCircle } from "components/icons";

const steps = [{ title: "Type in your mnemonic phrase" }];

const CreateWithMnemonic: NextPageX = () => {
  const [step] = useStep(steps);
  const router = useRouter();

  function getMemonicInputValues(): string[] {
    const mnemonicInputs: string[] = [];
    for (let i = 1; i <= 12; i++) {
      mnemonicInputs.push(
        (document.getElementById(`mnemonic_input_${i}`) as HTMLInputElement)
          .value
      );
    }
    return mnemonicInputs;
  }

  function handleSubmit(e: any) {
    e.preventDefault();
    router.push("/wallet");
  }

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
        <h1 style={{ paddingTop: 0 }}>Access wallet with Mnemonic Phrase</h1>

        <div className={styles.step_container}>
          <Steps steps={steps} step={step} />
        </div>

        <form onSubmit={handleSubmit}>
          <div className={mnemonic_styles.words_container}>
            {new Array(12).fill("").map((e, i) => (
              <span key={i} className={mnemonic_styles.word_box}>
                <input
                  type="text"
                  spellCheck={false}
                  id={`mnemonic_input_${i + 1}`}
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
      </div>
    </div>
  );
};

CreateWithMnemonic.Layout = Layout;
export default CreateWithMnemonic;
