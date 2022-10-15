import Link from "next/link";
import { DownloadIcon, SendIcon, SwapIcon } from "components/icons";
import styles from "styles/pages/dashboard.module.css";

export default function TransactionView() {
  return (
    <div className={styles.transaction_view}>
      {sections.map((e, i) => (
        <Link key={i} href={`#${e.text}`}>
          <a className={styles.section} key={i}>
            <div className={styles.icon_container}>
              <span className={styles.icon_box}>
                <e.icon />
              </span>
            </div>
            <div className={styles.text_container}>
              <p>{e.text}</p>
            </div>
          </a>
        </Link>
      ))}
    </div>
  );
}

const sections = [
  {
    icon: DownloadIcon,
    text: "Buy",
  },
  {
    icon: SendIcon,
    text: "Send",
  },
  {
    icon: SwapIcon,
    text: "Swap",
  },
];
