import {
  BNBIcon,
  CaretDownOutline,
  CloseIconInBigCircle,
  EthereumIcon,
  SearchIcon,
  WBTCIcon,
} from "components/icons";
import { useContext, useState } from "react";
import { NetworkContext } from "./context";
import { NETWORKS } from "interfaces/IRpc";
import NET_CONFIG from "config/allNet";
import INET_CONFIG from "interfaces/INetwok";
import { AccountContext } from "context/account";
import { ProviderContext } from "context/web3";
import { getWeb3Connection, getWalletBalanceEth } from "utils/wallet";
import { IAccount } from "interfaces/IAccount";
import Notification, { useNotification } from "components/notification";
import { primaryFixedValue } from "constants/digits";
import { getCoinUSD } from "utils/priceFeed";
import styles from "styles/pages/wallet/network_selector.module.css";

export const networkLogoMap: { [key: string]: JSX.Element } = {
  [NETWORKS.ETHEREUM]: <EthereumIcon />,
  [NETWORKS.BINANCE]: <BNBIcon />,
  [NETWORKS.POLYGON]: <WBTCIcon />,
  [NETWORKS.GOERLI]: <EthereumIcon />,
  [NETWORKS.T_BINANCE]: <BNBIcon />,
  [NETWORKS.MUMBAI]: <WBTCIcon />,
};

export default function NetworkSelector() {
  const [notification, pushNotification] = useNotification();
  const [network, setNetwork] = useContext(NetworkContext);
  const [account, setAccount] = useContext(AccountContext);
  const [, setProvider] = useContext(ProviderContext);
  const [modalActive, setModalActive] = useState(false);
  const [filter, setFilter] = useState("main");

  async function chooseNetwork(network: INET_CONFIG) {
    try {
      const provider = getWeb3Connection(network.chainName as NETWORKS);

      const balance = Number(
        await getWalletBalanceEth(provider, account.address)
      );

      const balanceFiat = Number(
        (balance <= 0
          ? 0
          : (
              await getCoinUSD(
                NET_CONFIG[network.chainName as NETWORKS].nativeCurrency.symbol
              )
            ).value! * balance
        ).toFixed(primaryFixedValue)
      );

      setAccount((prev: IAccount) => ({
        ...prev,

        balance: balance,

        balanceFiat,
      }));

      setNetwork(network);
      setAccount((prev: IAccount) => ({
        ...prev,
        balance: Number(balance),
      }));

      setProvider(provider);
    } catch (error: any) {
      pushNotification({
        element: (
          <p style={{ textAlign: "center" }}>
            Error Connecting To {network.chainName} Network
          </p>
        ),
        type: "error",
      });
    }

    setModalActive(false);
  }

  function handleSearch(e: any) {
    e.preventDefault();
  }

  return (
    <>
      <div>
        <button
          className={styles.network_selector}
          onClick={() => setModalActive(true)}
        >
          <div className={styles.network_icon_box}>
            {networkLogoMap[network.chainName]}
          </div>
          {network.chainName}
          <span className={styles.caret_down_box}>
            <CaretDownOutline />
          </span>
        </button>
        <div className={`${styles.modal} ${modalActive ? styles.active : ""}`}>
          <div className={`${styles.container} c-scroll`}>
            <h4>Select Network</h4>
            <button
              className={styles.close_btn}
              onClick={() => setModalActive(false)}
            >
              <CloseIconInBigCircle />
            </button>

            <div className={styles.toolbar}>
              <form className={styles.search_container} onSubmit={handleSearch}>
                <button className={styles.icon} type="submit">
                  <SearchIcon />
                </button>
                <input
                  type="text"
                  className={styles.search}
                  placeholder="Find in network"
                />
              </form>

              <div className={styles.btns_container}>
                {["main", "test", "all"].map((e, i) => (
                  <button
                    className={filter == e ? styles.active : ""}
                    onClick={() => setFilter(e)}
                    key={i}
                  >
                    {e}
                  </button>
                ))}
              </div>
            </div>
            <table className={styles.select_container}>
              {Object.values(NET_CONFIG).map((e, i) => (
                <tr key={i}>
                  <button
                    className={styles.selection}
                    onClick={() => chooseNetwork(e)}
                  >
                    <span className={styles.network_icon_box}>
                      {networkLogoMap[e.chainName]}
                    </span>
                    <span className={styles.text}>{e.nativeCurrency.name}</span>
                    <span
                      className={`${styles.indicator} ${
                        network.chainId == e.chainId ? styles.active : ""
                      }`}
                    >
                      <span></span>
                    </span>
                  </button>
                </tr>
              ))}
            </table>
          </div>
        </div>
      </div>
      <Notification
        notification={notification}
        pushNotification={pushNotification}
      />
    </>
  );
}
