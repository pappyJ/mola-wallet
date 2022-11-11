import { ReactNode, useEffect, useState } from "react";
import styles from "styles/components/confirm.module.css";

export default function Confirm({
  confirm,
  activateConfirm,
}: {
  confirm: confirm | null;
  activateConfirm: (confirm: confirm | null) => void;
}) {
  const [prevConfirm, setPrevConfirm] = useState<confirm | null>(null);

  function handleAffirmitive() {
    confirm?.onAffirm && confirm.onAffirm();
    activateConfirm(null);
  }

  function handleNegative() {
    confirm?.onNegate && confirm.onNegate();
    activateConfirm(null);
  }

  useEffect(() => {
    setTimeout(() => setPrevConfirm(confirm), 500);
  }, [confirm]);

  return (
    <div
      className={`${styles.main} ${
        confirm != null || confirm != undefined ? styles.active : ""
      }`}
    >
      <div className={`${styles.container} c-scroll`}>
        <div className={styles.top}>
          {confirm?.QuestionComponent || prevConfirm?.QuestionComponent}
        </div>
        <div className={styles.bottom}>
          <button type="button" onClick={handleAffirmitive}>
            {confirm
              ? confirm?.affirmText ?? "Yes"
              : prevConfirm?.affirmText ?? "Yes"}
          </button>
          <button
            type="button"
            className={styles.secondary}
            onClick={handleNegative}
          >
            {confirm
              ? confirm.negateText ?? "No"
              : prevConfirm?.negateText ?? "No"}
          </button>
        </div>
      </div>
    </div>
  );
}

export function useConfirm(): {
  confirm: confirm | null;
  activateConfirm: (confirm: confirm | null) => void;
} {
  const [confirms, setConfirms] = useState<confirm[]>([]);
  const [confirm, setConfirm] = useState<confirm | null>(null);

  function activateConfirm(confirm: confirm | null) {
    if (confirm) setConfirms((prev) => [...prev, confirm]);
    else setConfirm(null);
  }

  useEffect(() => {
    if (confirm == null && confirms.length > 0) {
      setConfirm(confirms[0]);
      setConfirms((prev) => prev.slice(1));
    }
  }, [confirms, confirm]);

  return {
    confirm,
    activateConfirm,
  };
}

type confirm = {
  QuestionComponent: ReactNode;
  affirmText?: string;
  negateText?: string;
  onAffirm?: () => any;
  onNegate?: () => any;
};
