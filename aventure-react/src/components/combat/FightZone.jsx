import React from 'react';
import PlayerStats from './PlayerStats';
import CombatDescription from './CombatDescription';
import EnemyStats from './EnemyStats';

const FightZone = ({playerTurn,
    isAttacked,
    animationPlayer,
    playerStatsFull,
    playerName,
    combatDesc,
    setCombatDesc,
    enemyAttacked,
    enemyAttacking,
    isIntro,
    handleAnimationAttack,
    handleEnemyClick,
    enemyState,
    enemyAttack,
    setEnemyAttack,
    findAttack,
    orderAttack,
    indexOrderAttack,
    findDescBeforeAtk
  }) => {

      const handleMsAnimatedText = () => {
        if (playerTurn) return 30;
        if (enemyAttacking) return 10;
        return 10;
      };

    return (
        <div className="combat">
          <PlayerStats playerTurn={playerTurn} isAttacked={isAttacked} animationPlayer={animationPlayer} playerStatsFull={playerStatsFull} playerName={playerName} />

          <CombatDescription combatDesc={combatDesc} setCombatDesc={setCombatDesc} handleMsAnimatedText={handleMsAnimatedText} enemyAttacking={enemyAttacking} enemyAttack={enemyAttack} setEnemyAttack={setEnemyAttack} enemyState={enemyState} playerTurn={playerTurn} isIntro={isIntro} findAttack={findAttack} orderAttack={orderAttack} indexOrderAttack={indexOrderAttack} findDescBeforeAtk={findDescBeforeAtk} />

          <EnemyStats playerTurn={playerTurn} enemyAttacked={enemyAttacked} enemyAttacking={enemyAttacking} handleAnimationAttack={handleAnimationAttack} handleEnemyClick={handleEnemyClick} enemyState={enemyState} />
        </div>
    );
};

export default FightZone;