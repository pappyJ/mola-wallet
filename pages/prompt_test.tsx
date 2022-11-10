import Layout from "components/layouts";
import Prompt, { usePrompt } from "components/modals/prompt";
import { NextPageX } from "types/next";

const PromptTestPage: NextPageX = () => {
  const { prompt, activatePrompt } = usePrompt();

  function activatePrompt1() {
    activatePrompt({
      QuestionComponent: <p>Prompt 1</p>,
      affirmText: "Enter",
      negateText: "Cancel",
      onAffirm: () => console.log("1", true),
      onNegate: () => console.log("1", false),
    });

    setTimeout(activatePrompt2, 500);
  }

  function activatePrompt2() {
    activatePrompt({
      QuestionComponent: <p>Prompt 2</p>,
      onAffirm: () => console.log("2", true),
      onNegate: () => console.log("2", false),
    });
  }

  return (
    <div style={{ height: 300 }}>
      <button onClick={activatePrompt1}>ActivatePrompt 1</button>
      <button onClick={activatePrompt2}>ActivatePrompt 2</button>
      <Prompt prompt={prompt} activatePrompt={activatePrompt} />
    </div>
  );
};

PromptTestPage.Layout = Layout;
export default PromptTestPage;
