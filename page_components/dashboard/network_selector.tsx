import { CaretDown } from "components/icons";
import styles from "styles/pages/dashboard.module.css";

export default function NetworkSelector() {
  return (
    <div className={styles.network_selector}>
      <span className={styles.signal}></span>
      <span className={styles.text}>Etherum Main Network</span>
      <span className={styles.caret_container}>
        <CaretDown />
      </span>
    </div>
  );
}
