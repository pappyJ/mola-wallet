import styles from "styles/pages/Home.module.css";
import Link from "next/link";

export default function SectionC() {
  return (
    <div className={`${styles.section_c} ${styles.section}`}>
      <div>
        <div className={styles.padder}>
          <div className={styles.left}>
            <div className={styles.sec}>
              <h2>Tokens</h2>
              <p>
                Mola support most ERC20 tokens through our API&apos;s but if you
                dont see the token you are looking for, you can add as a custom
                token right in the interface!
              </p>
              <Link href="#">
                <a
                  className={styles.action_primary}
                  style={{ marginTop: "3.6rem" }}
                >
                  Get Tokens
                </a>
              </Link>
            </div>
          </div>
          <div className={styles.right}>
            <div className={styles.img}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
