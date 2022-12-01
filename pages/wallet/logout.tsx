import { NextPageX } from "types/next";
import DashboardLayout from "page_components/wallet/layout";
import styles from "styles/pages/wallet/logout.module.css";
import { useRouter } from "next/router";
import { useContext } from "react";
import { AccountContext } from "context/account";
import { ProviderContext } from "context/web3/index";
import { AssetProviderContext } from "context/web3/assets";
import { NetworkContext } from "page_components/wallet/context";
import { IAccount } from "interfaces/IAccount";
import INetwork from "interfaces/INetwok";

const Page: NextPageX = () => {
  const router = useRouter();
  const [, setNetwork] = useContext(NetworkContext);
  const [, setAccount] = useContext(AccountContext);
  const [, setProvider] = useContext(ProviderContext);
  const [, setAssetProvider] = useContext(AssetProviderContext);

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <p className={styles.heading}>Are you sure you want to logout</p>
        <div className={styles.button_container}>
          <button onClick={() => router.back()}>No</button>
          <button
            onClick={() => {
              setProvider(null);
              setAccount(defaultAccount);
              setAssetProvider([]);
              setNetwork(defaultNetwork);
            }}
            className={styles.primary}
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

const defaultNetwork: INetwork = {
  blockExplorer: "",
  nativeCurrency: { name: "", symbol: "", decimals: 0 },
  chainId: 0,
  chainName: "",
  rpcUrls: "",
  test: false,
};

const defaultAccount: IAccount = {
  address: "",
  balance: 0,
  balanceFiat: 0,
  fiat: "",
  privateKey: "",
  addressList: [],
  gasPriority: 0,
};

Page.Layout = DashboardLayout;
export default Page;
