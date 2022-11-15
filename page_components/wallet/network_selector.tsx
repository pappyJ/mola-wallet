import {
  BNBIcon,
  CaretDownOutline,
  EthereumIcon,
  SearchIcon,
  WBTCIcon,
} from "components/icons";
import styles from "styles/pages/wallet/network_selector.module.css";
import { useContext, useState } from "react";
import { NetworkContext } from "./context";

export default function NetworkSelector() {
  const [network, setNetwork] = useContext(NetworkContext);
  const [modalActive, setModalActive] = useState(false);
  const [filter, setFilter] = useState("main");

  const networkLogoMap: { [key: string]: JSX.Element } = {
    ethereum: <EthereumIcon />,
    binance: <BNBIcon />,
    wbtc: <WBTCIcon />,
  };

  function chooseNetwork(network: string) {
    setNetwork(network);
    setModalActive(false);
  }

  return (
    <div>
      <button
        className={styles.network_selector}
        onClick={() => setModalActive(true)}
      >
        <div className={styles.network_icon_box}>{networkLogoMap[network]}</div>
        {network}
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
            <form className={styles.search_container}>
              <button className={styles.icon}>
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
            {networks.map((e, i) => (
              <tr key={i}>
                <button
                  className={styles.selection}
                  onClick={() => chooseNetwork(e.name)}
                >
                  <span className={styles.network_icon_box}>
                    {networkLogoMap[e.name]}
                  </span>
                  <span className={styles.text}>{e.displayName}</span>
                  <span
                    className={`${styles.indicator} ${
                      network == e.name ? styles.active : ""
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
  );
}

const networks = [
  { name: "ethereum", displayName: "ETH" },
  { name: "binance", displayName: "BNB" },
  { name: "wbtc", displayName: "WBTC" },
];
