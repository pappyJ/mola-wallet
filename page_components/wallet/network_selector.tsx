import { CaretDownOutline, EtherumIcon } from "components/icons";
import styles from "styles/pages/wallet/network_selector.module.css";
import { useContext, useState } from "react";
import { NetworkContext } from "./context";
import { NETWORKS } from "interfaces/IRpc";
import NET_CONFIG from "constants/networksConfig";
import INET_CONFIG from "interfaces/INetwok";
import { AccountContext } from "context/account";
import { ProviderContext } from "context/web3";
import { getWeb3Connection, getWalletBalanceEth } from "utils/wallet";
import { IAccount } from "interfaces/IAccount";
import Notification, { useNotification } from "components/notification";
export default function NetworkSelector() {
  const [notification, pushNotification] = useNotification();
  const [network, setNetwork] = useContext(NetworkContext);
  const [account, setAccount] = useContext(AccountContext);
  const [, setProvider] = useContext(ProviderContext);
  const [modalActive, setModalActive] = useState(false);

  const networkLogoMap: { [key: string]: JSX.Element } = {
    [NETWORKS.ETHEREUM]: <EtherumIcon />,
  };

  async function chooseNetwork(network: INET_CONFIG) {
    try {
    
    let provider = getWeb3Connection(network.chainName as NETWORKS);

    let balance = await getWalletBalanceEth(provider, account.address);

    setNetwork(network);
    setAccount((prev: IAccount) => ({
      ...prev,

      balance,
    }));

    setProvider(provider);

    setModalActive(false);
      
    } catch (error: any) {

      pushNotification({
        element: (
          <p style={{ textAlign: "center" }}>
            Error Connecting To { network.chainName } Network
          </p>
        ),
        type: "error",
      });
      
    }
    
  }

  return (
    <>
    <div>
      <button
        className={styles.network_selector}
        onClick={() => setModalActive(true)}
      >
        <div className={styles.ethereum_icon_box}>
          {networkLogoMap[network.chainName]}
        </div>
        {network.chainName}
        <span className={styles.caret_down_box}>
          <CaretDownOutline />
        </span>
      </button>
      <div
        className={`${styles.network_modal} ${
          modalActive ? styles.active : ""
        }`}
      >
        <div className={`${styles.container} c-scroll`}>
          <h4>Select Network</h4>
          <div className={styles.toolbar}>
            <input type="text" />
            <div className={styles.btns}></div>
          </div>
          <div className={styles.select_container}>
            <button
              className={styles.selection}
              onClick={ async() => await chooseNetwork(NET_CONFIG[NETWORKS.ETHEREUM])}
            >
              {NET_CONFIG.ETHEREUM.nativeCurrency.symbol}
            </button>
            <button
              className={styles.selection}
              onClick={async() => await chooseNetwork(NET_CONFIG[NETWORKS.BINANCE])}
            >
              {NET_CONFIG.BINANCE.nativeCurrency.symbol}
            </button>
            <button
              className={styles.selection}
              onClick={async() => await chooseNetwork(NET_CONFIG[NETWORKS.POLYGON])}
            >
              {NET_CONFIG.POLYGON.nativeCurrency.symbol}
            </button>
          </div>
        </div>
      </div>
    </div>
    <Notification
        notification={notification}
        pushNotification={pushNotification}
      />``
    </>
  );
}
