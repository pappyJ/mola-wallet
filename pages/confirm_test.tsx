import Layout from "components/layouts";
import Confirm, { useConfirm } from "components/confirm";
import { NextPageX } from "types/next";

const ConfirmTestPage: NextPageX = () => {
  const { confirm, activateConfirm } = useConfirm();

  function activateConfirm1() {
    activateConfirm({
      QuestionComponent: "Confirm 1",
      affirmText: "Enter",
      negateText: "Cancel",
      onAffirm: () => console.log("1", true),
      onNegate: () => console.log("1", false),
    });
  }

  function activateConfirm2() {
    activateConfirm({
      QuestionComponent: <p>Confirm 2</p>,
      onAffirm: () => console.log("2", true),
      onNegate: () => console.log("2", false),
    });
  }

  return (
    <div style={{ height: 300 }}>
      <button onClick={activateConfirm1}>ActivateConfirm 1</button>
      <button onClick={activateConfirm2}>ActivateConfirm 2</button>
      <Confirm confirm={confirm} activateConfirm={activateConfirm} />
    </div>
  );
};

ConfirmTestPage.Layout = Layout;
export default ConfirmTestPage;
