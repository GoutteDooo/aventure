import { useState } from "react";

const useEnemyState = (enemy) => {
  const [enemyState, setEnemyState] = useState(enemy);
  const [indexOrderAttack, setIndexOrderAttack] = useState(0);
  const [enemyAttacked, setEnemyAttacked] = useState(false);
  const [enemyAttacking, setEnemyAttacking] = useState(false);
  const [enemyAttack, setEnemyAttack] = useState(null);
  const [animationAttack, setAnimationAttack] = useState(null);
  const orderName = enemyState.combatData.attackSyst.orderUsed;
  const orderAttack = enemyState.combatData.attackSyst[orderName];

  return {
    enemyState,
    setEnemyState,
    indexOrderAttack,
    setIndexOrderAttack,
    enemyAttacked,
    setEnemyAttacked,
    enemyAttacking,
    setEnemyAttacking,
    enemyAttack,
    setEnemyAttack,
    animationAttack,
    setAnimationAttack,
    orderName,
    orderAttack,
  };
};
export default useEnemyState;
