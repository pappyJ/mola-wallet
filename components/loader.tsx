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
  const [active, setAcitve] = useState(false);

  function startLoader() {
    setAcitve(true);
  }

  function stopLoader() {
    setAcitve(false);
  }

  return { loader: active, startLoader, stopLoader };
}
