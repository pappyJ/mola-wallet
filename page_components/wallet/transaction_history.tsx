import styles from "styles/pages/wallet/transaction_history.module.css";
import network_styles from "styles/pages/wallet/network_selector.module.css";
import { shorten } from "utils/string";
import { useRef, useEffect } from "react";
import blockies from "ethereum-blockies";

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
        {getTransactionHistory().map((e, i) => (
          <List key={i} e={e} />
        ))}
      </div>
    </div>
  );
}

function List({ e }: { e: transactionList }) {
  const imageRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    imageRef.current?.lastChild &&
      imageRef.current.removeChild(imageRef.current.lastChild);
    imageRef.current?.appendChild(
      blockies.create({ seed: e.address, size: 10, scale: 3 })
    );
  }, [e.address]);

  return (
    <div
      className={`${styles.list} ${
        e.status === "pending"
          ? styles.pending
          : e.direction === "in"
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
          {shorten(e.address, 8, 4, 15)}
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
