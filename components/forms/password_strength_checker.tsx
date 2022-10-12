import { useEffect, useState } from "react";
import styles from "styles/components/forms/password_checker.module.css";

export default function PasswordChecker({ password }: { password: string }) {
  const [strength, setStrength] = useState(calculateStrength(password));

  function calculateStrength(password: string) {
    return Math.min(password.length * 7, 100);
  }

  function strengthColorMap(strength: number) {
    return strength < 40 ? "#ff350a" : strength < 75 ? "#ffe22c" : "#22ff30";
  }

  function strengthTextMap(strength: number) {
    return strength < 40 ? "Low" : strength < 75 ? "Medium" : "High";
  }

  useEffect(() => {
    setStrength(calculateStrength(password));
  }, [password]);

  return (
    <div className={styles.main}>
      <div className={styles.strength_meter_container}>
        <div
          className={styles.strength_meter}
          style={{
            width: `${strength}%`,
            backgroundColor: strengthColorMap(strength),
          }}
        ></div>
      </div>
      <div className={styles.strength_text}>{strengthTextMap(strength)}</div>
    </div>
  );
}
