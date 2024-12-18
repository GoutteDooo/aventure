import React from 'react';

const EnemyStats = ({playerTurn, enemyAttacked, enemyAttacking, handleAnimationAttack, handleEnemyClick, enemyState}) => {
    return (
        
        <div
          className={`combat__ennemy__stats ${
            playerTurn ? "combat__ennemy__wait" : "combat__ennemy__play"
          } ${enemyAttacked ? "combat__hit" : ""} ${
            enemyAttacking ? handleAnimationAttack() : ""
          }`}
          onClick={handleEnemyClick}
        >
          <div className="combat__ennemy__stats--name">{enemyState.name}</div>
          <p>Vie : {enemyState.health}</p>
          <p>
            Atk : {Math.trunc(enemyState.attack * enemyState.accuracy)} ~{" "}
            {enemyState.attack}
          </p>
          <p>Def : {enemyState.defense}</p>
        </div>
    );
};

export default EnemyStats;