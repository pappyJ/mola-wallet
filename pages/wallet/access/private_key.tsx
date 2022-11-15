import { CloseIconInBigCircle } from "components/icons";
import WalletCreateAccessLayout from "components/layouts/wallet_create_access";
import Link from "next/link";
import styles from "styles/pages/wallet/create_access/index.module.css";
import keystore_styles from "styles/pages/wallet/create_access/keystore.module.css";
import { NextPageX } from "types/next";
import Steps, { useStep } from "components/step";
import { useRouter } from "next/router";
import { useEffect, useRef, useContext } from "react";
import { AccountContext } from "context/account";
import { ProviderContext } from "context/web3";
import { 
  getWeb3Connection,
  generateWalletUsingPKey,
  getWalletBalanceEth
} from "utils/wallet";
import { NETWORKS } from "utils/interfaces/Irpc";
import { IAccount } from "utils/interfaces/IAccount";
import Notification, { useNotification } from "components/notification";

const PrivateKeyPage: NextPageX = () => {
  const [step] = useStep(steps);
  const router = useRouter();
  const privateKeyRef = useRef<HTMLInputElement>(null);
  const [account, setAccount] = useContext(AccountContext);
  const [, setProvider] = useContext(ProviderContext);
  const [notification, pushNotification] = useNotification();

  useEffect(() => {
  }, [account]);
  async function handleFormSubmit(e: any, privateKey: string) {
    e.preventDefault();

    try {
      let wallet = await generateWalletUsingPKey(privateKey);

      let provider = getWeb3Connection(NETWORKS.ETHEREUM);

      let balance = await getWalletBalanceEth(provider, wallet.address);
      setAccount((prev: IAccount) => ({
        ...prev,

        address: wallet.address,

        balance,
      }));

      setProvider(provider);

      router.push("/wallet");

    } catch (error: any) {
      
      pushNotification({
        element: (
          <p style={{ textAlign: "center" }}>
            {error?.message}
          </p>
        ),
        type: "error",
      });
    }
  }

  useEffect(() => {
    privateKeyRef.current?.focus();
  }, []);

  return (
    <>
      <div className={styles.close_icon_container}>
        <Link href="/wallet/access">
          <a className={styles.close_icon}>
            <CloseIconInBigCircle />
          </a>
        </Link>
      </div>

      <h1 style={{ paddingTop: 0 }}>Access wallet with private key</h1>

      <div className={styles.step_container}>
        <Steps steps={steps} step={step} />
      </div>

      <form onSubmit={ async (e) => await handleFormSubmit(e, privateKeyRef.current!.value)}>
        <div className={keystore_styles.input_container}>
          <div className={keystore_styles.input_box}>
            <input
              type="password"
              required
              autoFocus={true}
              ref={privateKeyRef}
            />
          </div>
          <label>Private Key</label>
        </div>

        <div
          className={styles.next_button_container}
          style={{ marginTop: "3.2rem" }}
        >
          <button type="submit" className={styles.next_button}>
            Access Wallet
          </button>
        </div>
      </form>
      <Notification
        notification={notification}
        pushNotification={pushNotification}
      />
    </>
  );
};

PrivateKeyPage.Layout = WalletCreateAccessLayout;
export default PrivateKeyPage;

const steps = [{ title: "Type in your private key" }];
