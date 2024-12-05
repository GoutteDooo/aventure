import React, { useContext, useState } from 'react';
import { PlayerContext } from '../utils/Context';

const HealthBar = () => {
    const { playerStats, setPlayerStats } =
      useContext(PlayerContext);
    const [showToolTip, setShowToolTip] = useState(false);
    
    const health = playerStats.stats.health;
    const maxHealth = playerStats.stats.maxHealth;
    const healthPercentage = (health / maxHealth) * 100;
    
    return (
        <div className="healthBar">
            Santé
            <div className="healthBar__percentage"
              onMouseEnter={() => setShowToolTip(true)}
              onMouseLeave={() => setShowToolTip(false)}>
              <div className="healthBar__fill"
              style={{width:`${healthPercentage}%`}}
              ></div>
            </div>
          {/* ToolTip */}
            {showToolTip && (
              <div className="healthBar__tooltip">
                {exp} / {expToNextLevel}
              </div>
            )}
        </div>
    );
};

export default HealthBar;