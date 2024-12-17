import React from 'react';
import Defense from './Defense';

const Buttons = ({handleAttack, handleDefense}) => {
    return (
        <div className="combat__player__turn">
          <button className="combat__button__attack" onClick={handleAttack}>
            Attaquer
          </button>
          <Defense handleDefense={handleDefense}/>
          <button className="combat__button__magic">Magie</button>
          <button className="combat__button__use">Utiliser</button>
          <button className="combat__button__fled">Fuir</button>
        </div>
    );
};

export default Buttons;