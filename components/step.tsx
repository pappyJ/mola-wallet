import { useState, useLayoutEffect, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "styles/components/step.module.css";

type steps = { title: string; title2?: string; description?: string }[];

export function useStep(steps: steps): [number] {
  const [step, setStep] = useState(1);
  const router = useRouter();

  function setStepByQuery() {
    let step = Number(new URLSearchParams(window.location.search).get("step"));

    if (typeof !isNaN(step) && step <= steps.length && step >= 1) setStep(step);
    else setStep(1);
  }

  useLayoutEffect(setStepByQuery, [steps]);

  useEffect(() => {
    router.events.on("routeChangeComplete", setStepByQuery);
    return () => router.events.off("routeChangeComplete", setStepByQuery);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [step];
}

export default function Steps({ steps, step }: { steps: steps; step: number }) {
  return (
    <div className={styles.steps}>
      <div className={styles.hr} />
      <div className={styles.container}>
        <div className={styles.index_list_container}>
          {steps.map((e, i) => (
            <div className={styles.index_list} key={i}>
              <div
                className={`${styles.index} ${
                  step - 1 == i ? styles.active : ""
                }`}
              >
                {i + 1}
              </div>
            </div>
          ))}
        </div>
        <div className={styles.steps_list_container}>
          {steps.map((e, i) => (
            <div
              className={`${styles.steps_list} ${
                step - 1 == i ? styles.active : ""
              }`}
              key={i}
            >
              <p>
                STEP {i + 1}: {e.title}
              </p>
            </div>
          ))}
        </div>
      </div>
      <h2>{steps[step - 1].title2 ?? steps[step - 1].title}</h2>
      <p>{steps[step - 1].description ?? ""}</p>
    </div>
  );
}
