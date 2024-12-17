import React, { useState } from "react";

const useCombatActions = () => {
  const [isInAction, setIsInAction] = useState(false);

  const handleAttack = () => {
    if (!isInAction) {
      setIsInAction(true);
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

  return { isInAction, cancelAction, handleAttack, handleDefense };
};

export default useCombatActions;
