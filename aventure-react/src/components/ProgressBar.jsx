import React, { useContext, useState } from 'react';
import { PlayerContext } from '../utils/Context';
import SkillsTree from './SkillsTree';
import HealthBar from './HealthBar';

const ProgressBar = () => {
    const { playerStats, setPlayerStats } =
      useContext(PlayerContext);
    const [showToolTip, setShowToolTip] = useState(false);
    
    const exp = playerStats.statsLevel.actualExp;
    const expToNextLevel = playerStats.statsLevel.expToNextLevel;
    const progressPercentage = (exp / expToNextLevel) * 100;
    
    return (
        <div className="progressBar">
          <div className="progressBar__actualLevel">
            Niveau {playerStats.statsLevel.actualLevel}
            <div className="progressBar__actualLevel__percentage"
              onMouseEnter={() => setShowToolTip(true)}
              onMouseLeave={() => setShowToolTip(false)}>
              <div className="progressBar__fill"
              style={{width:`${progressPercentage}%`}}
              ></div>
            </div>
          </div>
          {/* ToolTip */}
            {showToolTip && (
              <div className="progressBar__tooltip">
                {exp} / {expToNextLevel}
              </div>
            )}
          <SkillsTree />
          <HealthBar />
        </div>
    );
};

export default ProgressBar;