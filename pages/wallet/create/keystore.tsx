/* eslint-disable react-hooks/exhaustive-deps */
import Layout from "components/layouts";
import { NextPageX } from "types/next";
import { CloseIconInBigCircle } from "components/icons";
import Steps, { useStep } from "components/step";

import styles from "styles/pages/wallet/create_access/index.module.css";
import keystore_styles from "styles/pages/wallet/create_access/keystore.module.css";

import Link from "next/link";

const steps = [
  { title: "Create Password" },
  { title: "Download File", title2: "Download Keystore File" },
  { title: "Congratulations" },
];

const CreateWithKeystorePage: NextPageX = () => {
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
          <Step1Component />
        ) : step == 2 ? (
          <Step2Component />
        ) : step == 3 ? (
          <Step3Component />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

function Step1Component() {
  return <>Step 1</>;
}

function Step2Component() {
  return <>Step 2</>;
}
function Step3Component() {
  return <>Step 3</>;
}

CreateWithKeystorePage.Layout = Layout;
export default CreateWithKeystorePage;
