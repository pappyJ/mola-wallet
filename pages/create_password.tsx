import PasswordChecker from "components/forms/password_strength_checker";
import { EyeCloseIcon } from "components/icons";
import Head from "next/head";
import React, { useRef, useState } from "react";
import styles from "styles/pages/create_password.module.css";

export default function CreatePasswordPage() {
  let passwordRef = useRef<HTMLInputElement>(null);
  let confirmPasswordRef = useRef<HTMLInputElement>(null);

  const [passwordValue, setPasswordValue] = useState("");

  function togglePasswordVisiblity(elem: React.RefObject<HTMLInputElement>) {
    if (elem.current?.getAttribute("type") == "password")
      elem.current?.setAttribute("type", "text");
    else elem.current?.setAttribute("type", "password");
  }

  return (
    <div className={styles.main}>
      <h2>Create Password</h2>
      <p>This unlocks your Mola Vault wallet only on this device.</p>

      <form>
        <div className={styles.input_container}>
          <div className={styles.input_box}>
            <input
              type="password"
              required
              ref={passwordRef}
              id="formPassword"
              onChange={() =>
                setPasswordValue(passwordRef.current?.value || "")
              }
            />
            <button
              className={styles.icon_box}
              type="button"
              onClick={() => togglePasswordVisiblity(passwordRef)}
            >
              <EyeCloseIcon />
            </button>
          </div>
          <label className={styles.required} htmlFor="formPassword">
            Password
          </label>
        </div>

        <div className={styles.input_container}>
          <div className={styles.input_box}>
            <input
              type="password"
              required
              id="formConfirmPassword"
              ref={confirmPasswordRef}
            />
            <button
              className={styles.icon_box}
              type="button"
              onClick={() => togglePasswordVisiblity(confirmPasswordRef)}
            >
              <EyeCloseIcon />
            </button>
          </div>
          <label className={styles.required} htmlFor="formConfirmPassword">
            Confirm Password
          </label>
        </div>

        <div className={styles.password_checker_container}>
          <PasswordChecker password={passwordValue} />
        </div>

        <div className={styles.checkbox_container}>
          <div className={styles.checkbox_box}>
            <input type="checkbox" id="passwordFormCheckbox" />
          </div>
          <label htmlFor="passwordFormCheckbox">
            I Understand that Mola Vault cannot recover this password for me.
          </label>
        </div>

        <div className={styles.submit_container}>
          <button type="submit">Create Wallet</button>
        </div>
      </form>

      <Head>
        <title>Create Password-Mola Wallet</title>
      </Head>
    </div>
  );
}
