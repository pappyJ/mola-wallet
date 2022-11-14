import { CaretDownOutline, EtherumIcon } from "components/icons";
import styles from "styles/pages/wallet/network_selector.module.css";
import { useContext, useState } from "react";
import { NetworkContext } from "./context";

export default function NetworkSelector() {
  const [network, setNetwork] = useContext(NetworkContext);
  const [modalActive, setModalActive] = useState(false);

  const networkLogoMap: { [key: string]: JSX.Element } = {
    ethereum: <EtherumIcon />,
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
        <div className={styles.ethereum_icon_box}>
          {networkLogoMap[network]}
        </div>
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
            <input type="text" />
            <div className={styles.btns}></div>
          </div>
          <div className={styles.select_container}>
            <button
              className={styles.selection}
              onClick={() => chooseNetwork("ethereum")}
            >
              Eth
            </button>
            <button
              className={styles.selection}
              onClick={() => chooseNetwork("binance")}
            >
              BNB
            </button>
            <button
              className={styles.selection}
              onClick={() => chooseNetwork("wbtc")}
            >
              WBTC
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
