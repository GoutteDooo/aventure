import React, { useEffect, useState } from 'react';

const Combat = ({enemy}) => {
  const [playerStats, setPlayerStats] = useState(null);

  //Charger les données du joueur depuis le localStorage
  useEffect(() => {
    const storedPlayerData = localStorage.getItem("playerData");
    if (storedPlayerData) {
      setPlayerStats(JSON.parse(storedPlayerData));
    }
  }, [])

  if (!playerStats) {
    return <p className='animate-pulsing animate-iteration-count-infinite'>Chargement des données du joueur...</p>
  }

    return (
        <div className="combat">
          <div className="combat__ennemi-stats">
            <h2>{enemy.name}</h2>
            <p>Vie de l'ennemi : {enemy.health}</p>
          </div>
          <p>Votre vie : {playerStats.stats.health}</p>
          <button onClick={""}>Attaquer</button>
        </div>
    );
};

export default Combat;