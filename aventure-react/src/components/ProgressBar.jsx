import React, { useContext } from 'react';
import { PlayerContext } from '../utils/Context';

const ProgressBar = () => {
    const { playerStats, setPlayerStats, findItem, useItem } =
      useContext(PlayerContext);
      
    const calcProgressBar = () => {
    const progress = playerStats.statsLevel.actualExp / playerStats.statsLevel.expToNextLevel;
    return progress * 100;
    }
    
    return (
        <div className="inventory__level">
          <div className="inventory__level__actualLevel">
            Niveau {playerStats.statsLevel.actualLevel}
            <div className="inventory__level__actualLevel__progressBar">
              <div className="progressBar__fill"
              style={{width:`${calcProgressBar()}%`}}></div>
            </div>
          </div>
          <div className="inventory__level__skillsTree">Arbre des compétences</div>
        </div>
    );
};

export default ProgressBar;