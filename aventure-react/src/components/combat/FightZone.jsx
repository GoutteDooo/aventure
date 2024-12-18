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
    handleMsAnimatedText,
    enemyAttacked,
    enemyAttacking,
    handleAnimationAttack,
    handleEnemyClick,
    enemyState}) => {

      const handleMsAnimatedText = () => {
        if (playerTurn) return 30;
        if (enemyAttacking) return 10;
        return 10;
      };
      
    return (
        <div className="combat">
          <PlayerStats playerTurn={playerTurn} isAttacked={isAttacked} animationPlayer={animationPlayer} playerStatsFull={playerStatsFull} playerName={playerName} />

          <CombatDescription combatDesc={combatDesc} handleMsAnimatedText={handleMsAnimatedText} />

          <EnemyStats playerTurn={playerTurn} enemyAttacked={enemyAttacked} enemyAttacking={enemyAttacking} handleAnimationAttack={handleAnimationAttack} handleEnemyClick={handleEnemyClick} enemyState={enemyState} />
        </div>
    );
};

export default FightZone;