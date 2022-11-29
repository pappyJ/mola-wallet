import styles from "styles/pages/wallet/transaction_history.module.css";
import network_styles from "styles/pages/wallet/network_selector.module.css";
import { shorten } from "utils/string";
import { useRef, useEffect } from "react";
import blockies from "ethereum-blockies";
import { Notifier } from "utils/notifications";
import { INotification } from "interfaces/INotification";
import { TX_STATUS, TX_TYPE } from "constants/digits";

type transactionList = {
  address: string;
  amount: string;
  status: string;
  direction: string;
  time: number;
};

export default function TransactionHistory() {
  function getTransactionHistory(): transactionList[] {
    return [
      {
        address: "0xb7409a1046b02b1b6970507871B8B9cc5dA546a4",
        amount: "0.0001ETH",
        status: "pending",
        direction: "out",
        time: Date.now(),
      },
      {
        address: "0xb7409a1046b02b1b6970507871B8B9cc5dA546a4",
        amount: "0.0001ETH",
        status: "completed",
        direction: "out",
        time: Date.now(),
      },
    ];
  }

  return (
    <div className={styles.main}>
      <p className={styles.heading}>TX History</p>
      <div style={{ margin: "2rem 0 4rem" }}>
        {Object.values(Notifier.state).map((e) => (
          <List key={e.id} e={e} />
        ))}
      </div>
    </div>
  );
}

function List({ e }: { e: INotification }) {
  const imageRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    imageRef.current?.lastChild &&
      imageRef.current.removeChild(imageRef.current.lastChild);
    imageRef.current?.appendChild(
      blockies.create({ seed: e.from, size: 10, scale: 3 })
    );
  }, [e.from]);

  return (
    <div
      className={`${styles.list} ${
        e.status === TX_STATUS.PENDING
          ? styles.pending
          : e.direction === TX_TYPE.IN
          ? styles.in
          : styles.out
      }`}
    >
      <span
        className={network_styles.network_icon_box}
        style={{ borderRadius: "50%", overflow: "hidden" }}
        ref={imageRef}
      ></span>
      <div style={{ width: "100%", marginLeft: "0.5rem" }}>
        <p>
          <span className={styles.field_label}>From:</span>
          {shorten(e.from, 8, 4, 15)}
        </p>
        <p>
          <span className={styles.field_label}>Amount:</span>
          {e.amount}
        </p>
      </div>
      <div className={styles.time_box}>
        <div className={styles.direction}>{e.direction}</div>
        <div>{Math.round((Date.now() - e.time) / 1000)} secs</div>
      </div>
    </div>
  );
}
