import React, { useState } from "react";

const useCombatActions = () => {
  const [isInAction, setIsInAction] = useState(false);

  const handleAttack = () => {
    setIsInAction(true);
  };

  const handleDefense = () => {
    setIsInAction(true);
  };

  return { isInAction, handleAttack, handleDefense };
};

export default useCombatActions;
