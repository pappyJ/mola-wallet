import { ReactNode, useEffect, useState } from "react";
import styles from "styles/components/modals/prompt.module.css";

export default function Prompt({
  prompt,
  activatePrompt,
}: {
  prompt: prompt | null;
  activatePrompt: (prompt: prompt | null) => void;
}) {
  const [prevPrompt, setPrevPrompt] = useState<prompt | null>(null);

  function handleAffirmitive() {
    prompt?.onAffirm && prompt.onAffirm();
    activatePrompt(null);
  }

  function handleNegative() {
    prompt?.onNegate && prompt.onNegate();
    activatePrompt(null);
  }

  useEffect(() => {
    setTimeout(() => setPrevPrompt(prompt), 500);
  }, [prompt]);

  return (
    <div
      className={`${styles.main} ${
        prompt != null || prompt != undefined ? styles.active : ""
      }`}
    >
      <div className={`${styles.container} c-scroll`}>
        <div className={styles.top}>
          {prompt?.QuestionComponent || prevPrompt?.QuestionComponent}
        </div>
        <div className={styles.bottom}>
          <button type="button" onClick={handleAffirmitive}>
            {prompt
              ? prompt?.affirmText ?? "Yes"
              : prevPrompt?.affirmText ?? "Yes"}
          </button>
          <button
            type="button"
            className={styles.secondary}
            onClick={handleNegative}
          >
            {prompt
              ? prompt.negateText ?? "No"
              : prevPrompt?.negateText ?? "No"}
          </button>
        </div>
      </div>
    </div>
  );
}

export function usePrompt(): {
  prompt: prompt | null;
  activatePrompt: (prompt: prompt | null) => void;
} {
  const [prompts, setPrompts] = useState<prompt[]>([]);
  const [prompt, setPrompt] = useState<prompt | null>(null);

  function activatePrompt(prompt: prompt | null) {
    if (prompt) setPrompts((prev) => [...prev, prompt]);
    else setPrompt(null);
  }

  useEffect(() => {
    if (prompt == null && prompts.length > 0) {
      setPrompt(prompts[0]);
      setPrompts((prev) => prev.slice(1));
    }
  }, [prompts, prompt]);

  return {
    prompt,
    activatePrompt,
  };
}

type prompt = {
  QuestionComponent: ReactNode;
  affirmText?: string;
  negateText?: string;
  onAffirm?: () => any;
  onNegate?: () => any;
};
