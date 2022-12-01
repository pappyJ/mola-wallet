import {
  BNBIcon,
  CaretRight,
  CloseIconInBigCircle,
  EthereumIcon,
  PolygonIcon,
  SearchIcon,
} from "components/icons";
import { useContext, useEffect, useState } from "react";
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
import { LoaderContext } from "context/loader";
import { fetchWalletAssets } from "utils/assetEngine";
import { AssetProviderContext } from "context/web3/assets";
import { SocketProviderContext } from "context/web3/socket";

export const networkLogoMap: { [key: string]: JSX.Element } = {
  [NETWORKS.ETHEREUM]: <EthereumIcon />,
  [NETWORKS.BINANCE]: <BNBIcon />,
  [NETWORKS.POLYGON]: <PolygonIcon />,
  [NETWORKS.GOERLI]: <EthereumIcon />,
  [NETWORKS.T_BINANCE]: <BNBIcon />,
  [NETWORKS.MUMBAI]: <PolygonIcon />,
};

export default function NetworkSelector() {
  const [notification, pushNotification] = useNotification();
  const [network, setNetwork] = useContext(NetworkContext);
  const [account, setAccount] = useContext(AccountContext);
  const [provider, setProvider] = useContext(ProviderContext);
  const [modalActive, setModalActive] = useState(false);
  const [blockNumber, setBlockNumber] = useState("0");
  const [filter, setFilter] = useState("main");
  const [startLoader, stopLoader] = useContext(LoaderContext);
  const [, setAssetProvider] = useContext(AssetProviderContext);
  const [prevSocketProvider, setSocketProvider] = useContext(
    SocketProviderContext
  );

  async function chooseNetwork(network: INET_CONFIG) {
    startLoader();
    try {
      const provider = getWeb3Connection(network.chainName as NETWORKS);

      const walletAssets = await fetchWalletAssets(
        account.address,
        network.chainId
      );

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

      setAssetProvider(walletAssets);
    } catch (error: any) {
      stopLoader();

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
    stopLoader();
  }

  useEffect(() => {
    if (account.address) {
      if (prevSocketProvider.version) {
        prevSocketProvider.eth.clearSubscriptions((err, res) => {
          return console.log(err, res);
        });

        setSocketProvider(null);
      }

      const socketProvider = getWeb3Connection(
        network.chainName as NETWORKS,
        true
      );

      socketProvider.eth.subscribe("newBlockHeaders", async (err) => {
        if (err) {
          console.log(err);
        } else {
          const balance = Number(
            await getWalletBalanceEth(provider, account.address)
          );
          if (balance !== account.balance) {
            startLoader();

            const balanceFiat = Number(
              (balance <= 0
                ? 0
                : (
                    await getCoinUSD(
                      NET_CONFIG[network.chainName as NETWORKS].nativeCurrency
                        .symbol
                    )
                  ).value! * balance
              ).toFixed(primaryFixedValue)
            );

            setAccount((prev: IAccount) => ({
              ...prev,

              balance,

              balanceFiat,
            }));
          }

          stopLoader();
        }
      });

      setSocketProvider(socketProvider);
    }
  }, []);

  function networkFilterFunction(e: INET_CONFIG) {
    if (filter === "main") return e.test === false;
    else if (filter === "test") return e.test === true;
    else return true;
  }

  function handleSearch(e: any) {
    e.preventDefault();
  }

  useEffect(() => {
    (async () => {
      if (provider) {
        const latesBlock = await provider.eth.getBlockNumber();

        setBlockNumber(latesBlock.toLocaleString());
      }
    })();
  }, []);

  return (
    <>
      <button
        className={styles.network_selector}
        onClick={() => setModalActive(true)}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{ flex: "1 1 100%", display: "flex", alignItems: "center" }}
          >
            Network
            <span className={styles.caret_right_icon}>
              <CaretRight />
            </span>
          </div>
          <div
            className={styles.network_icon_box}
            style={{ width: "4rem", height: "4rem" }}
          >
            {networkLogoMap[network.chainName]}
          </div>
        </div>
        <div className={styles.network_details}>
          <div>
            {network.nativeCurrency.symbol} - {network.nativeCurrency.name}
          </div>
          <div>Last Block: {blockNumber}</div>
        </div>
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
            {Object.values(NET_CONFIG)
              .filter(networkFilterFunction)
              .map((e, i) => (
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
      <Notification
        notification={notification}
        pushNotification={pushNotification}
      />
    </>
  );
}
