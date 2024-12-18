import React from 'react';
import Loot from '../Loot';

const FinishCombat = ({enemyState,
    handleCloseLoot}) => {
    return (
        <div className="combat__finished__container">
      <div className="pop-up__finished--bg">
        <p>Combat terminé</p>
      </div>
      <div className="finish__pop-up">
        <Loot
          loots={enemyState.loots}
          gain={enemyState.gain}
          onClose={handleCloseLoot}
        />
      </div>
    </div>
    );
};

export default FinishCombat;