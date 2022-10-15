import Link from "next/link";
import Image from "next/image";
import styles from "styles/pages/dashboard.module.css";
import { CaretRight } from "components/icons";

export default function AssetsActivityView() {
  return (
    <div className={styles.assets_activity_view}>
      <nav className={styles.nav}>
        <div className={styles.active}>
          <Link href="#assets">
            <a>ASSETS</a>
          </Link>
        </div>
        <div>
          <Link href="#activity">
            <a>ACTIVITY</a>
          </Link>
        </div>
      </nav>
      <div className={styles.assets_container}>
        {assets.map((e, i) => (
          <div key={i} className={styles.token_container}>
            <div className={styles.token_image_container}>
              <div className={styles.token_image_box}>
                <Image
                  src={e.logo}
                  alt="token_logo"
                  width="100%"
                  height="100%"
                />
              </div>
            </div>
            <div className={styles.token_value_container}>
              <div className={styles.token_amount}>{e.tokenAmount}</div>
              <div className={styles.token_fiat_equivalent}>
                {e.fiatEquivalent}
              </div>
            </div>
            <div className={styles.caret_icon_container}>
              <button className={styles.caret_icon_box}>
                <CaretRight />
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.footer}>
        <div className={styles.left}>{"Don't see your token"}</div>
        <div className={styles.center}>
          <Link href="#">
            <a>Refresh list</a>
          </Link>{" "}
          or <Link href="#">Import tokens</Link>
        </div>
        <div className={styles.right}>Need help?</div>
      </div>
    </div>
  );
}

const assets = [
  {
    logo: "/token_1.png",
    tokenAmount: "1.3135 ETH",
    fiatEquivalent: "$368.79",
  },
  {
    logo: "/token_2.png",
    tokenAmount: "203.09 DAI",
    fiatEquivalent: "$203.09",
  },
  {
    logo: "/token_3.png",
    tokenAmount: "12.32 LINK",
    fiatEquivalent: "$153.02",
  },
  {
    logo: "/token_4.png",
    tokenAmount: "3.4 UMA",
    fiatEquivalent: "$57.18",
  },
  {
    logo: "/token_5.png",
    tokenAmount: ".02 MKR",
    fiatEquivalent: "$10.54",
  },
];
