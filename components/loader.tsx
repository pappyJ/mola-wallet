import { useState } from "react";
import styles from "styles/components/loaders.module.css";

export default function Loader({ loader }: { loader: boolean }) {
  return (
    <div className={`${styles.main} ${loader ? styles.active : ""}`}>
      <span></span>
    </div>
  );
}

export function useLoader() {
  const [active, setActive] = useState(false);

  function startLoader() {
    setActive(true);
  }

  function stopLoader() {
    setActive(false);
  }

  return { loader: active, startLoader, stopLoader };
}
