import React from 'react';

const Combat = ({enemy},{player}) => {
    return (
        <div className="combat">
          <h2>Combat contre {enemy.name}</h2>
          <p>Vie de l'ennemi : {enemy.health}</p>
          <p>Votre vie : VIE DU JOUEUR</p>
          <button onClick={""}>Attaquer</button>
        </div>
    );
};

export default Combat;