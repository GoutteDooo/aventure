import { useState } from "react";

const useCombatActions = () => {
  const [isInAction, setIsInAction] = useState(false);
  const [isAttacking, setIsAttacking] = useState(false);

  const handleAttack = () => {
    if (!isInAction) {
      setIsInAction(true);
      setIsAttacking(true);
      console.log("isInAction!", isInAction);
    }
  };

  const cancelAction = () => {
    setIsInAction(false);
  };

  const handleDefense = () => {
    if (!isInAction) {
      setIsInAction(true);
    }
  };

  return {
    isInAction,
    setIsInAction,
    isAttacking,
    setIsAttacking,
    cancelAction,
    handleAttack,
    handleDefense,
  };
};

export default useCombatActions;
