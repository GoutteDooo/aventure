import React, { useEffect, useState } from 'react';

const Combat = ({enemy}) => {
  const [playerStats, setPlayerStats] = useState(null);
  const [playerTurn, setPlayerTurn] = useState(false); //vérifie si joueur a l'initiative avant de pouvoir attaquer

  const handlePlayerTurn = () => {
    if (playerTurn) {
      return;
    }
  }

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
      <div className="combat-container">
        <div className="combat">
          <div className={`combat__player__stats ${playerTurn ? "combat__play" : "combat__wait"}`}>
            <div className='combat__player__stats--name'>{playerStats.name}</div>
            <p>Vie : {playerStats.stats.health}</p>
            <p>Attaque : {playerStats.stats.attack}</p>
            <p>Défense : {playerStats.stats.defense}</p>
            <p>Adresse : {playerStats.stats.accuracy}</p>
            <p>Initiative : {playerStats.stats.initiative}</p>
          </div>
          <div className={`combat__ennemy__stats ${playerTurn ? "combat__ennemy__wait" : "combat__ennemy__play"}`}>
            <div className="combat__ennemy__stats--name">
              {enemy.name}
            </div>
            <p>Vie : {enemy.health}</p>
            <p>Attaque : {enemy.attack}</p>
            <p>Defense : {enemy.defense}</p>
            </div>
        </div>
        {/* Si tour du joueur, alors afficher*/}
        {playerTurn && (
          <div className="your-turn">C'est votre tour</div>
        )}
      </div>
    );
};

export default Combat;