import React, { useEffect, useState } from 'react';
import AnimatedText from '../functions/AnimatedText';

const CombatDescription = ({enemyAttacking, enemyAttack, setEnemyAttack, enemyState, playerTurn, isIntro, handleMsAnimatedText,findAttack, orderAttack, indexOrderAttack, findDescBeforeAtk}) => {
    const [combatDesc, setCombatDesc] = useState("");
  
  /**Gère la description lors du combat de A à Z */
  useEffect(() => {
    setEnemyAttack(findAttack(orderAttack[indexOrderAttack]));
    //Toujours en dernier pour avoir tout le temps l'intro
    if (isIntro) {
      //seul state dépendant d'un autre useEffect
      setCombatDesc(enemyState.combatData.narrative.intro);
      return;
    } else if (enemyAttacking && enemyAttack) {
      setCombatDesc(enemyAttack.desc);
    } else if (playerTurn) {
      if (enemyAttack && findDescBeforeAtk(enemyAttack)) {
        setCombatDesc(enemyAttack.descBeforeAtk);
      } else {
        setCombatDesc((prevDesc) => {
          const narrativeOptions = enemyState.combatData.narrative.playerTurn;

          if (narrativeOptions.length === 1) {
            return narrativeOptions[0]; // Si un seul texte, pas besoin de randomiser
          }

          let randomText;
          do {
            const indexRandom = Math.floor(
              Math.random() * narrativeOptions.length
            );
            randomText = narrativeOptions[indexRandom];
          } while (randomText === prevDesc);

          return randomText;
        });
      }
    }
  }, [enemyAttacking, enemyAttack, enemyState, playerTurn, isIntro]);

    return (
        <div className="combat__display__container">
          {combatDesc && (
            <AnimatedText text={combatDesc} ms={handleMsAnimatedText()} />
          )}
        </div>
    );
};

export default CombatDescription;