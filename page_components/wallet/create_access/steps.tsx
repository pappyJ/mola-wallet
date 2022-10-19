import styles from "styles/pages/wallet/create_access.module.css";

type argType = {
  steps: { title: string; title2?: string; description?: string }[];
  step: number;
};

export default function Steps({ steps, step }: argType) {
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
      <h2>
        Step {step}: {steps[step - 1].title2 ?? steps[step - 1].title}
      </h2>
    </div>
  );
}
