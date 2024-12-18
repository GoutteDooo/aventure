import React from 'react';
import AnimatedText from '../functions/AnimatedText';

const CombatDescription = ({combatDesc, handleMsAnimatedText}) => {
    return (
        <div className="combat__display__container">
          {combatDesc && (
            <AnimatedText text={combatDesc} ms={handleMsAnimatedText()} />
          )}
        </div>
    );
};

export default CombatDescription;