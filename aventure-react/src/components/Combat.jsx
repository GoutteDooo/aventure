import React, { useEffect, useState } from 'react';

const Combat = ({enemy}) => {
  const [playerStats, setPlayerStats] = useState(null);
  const [playerTurn, setPlayerTurn] = useState(true); //vérifie si joueur a l'initiative avant de pouvoir attaquer
  const [isAttacking, setIsAttacking] = useState(false);
  const [isInAction, setIsInAction] = useState(false);

  const handlePlayerTurn = () => {
    if (playerTurn) {
      return;
    }
  }
  const handleAttack = () => {
    if (!isInAction) {
      setIsInAction(true);
      setIsAttacking(true);
    }
  }

  useEffect(() => {
    //Si n'est plus en action, alors on décoche tout les states de combat
    if (!isInAction) {
      setIsAttacking(false);
    }
  }, [isInAction])

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
      <div className={`combat-container ${isAttacking ? "combat--attacking" : ""}`}>
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
        {playerTurn ? (
          <>
            <div className="your-turn">C'est votre tour</div>
            {isInAction ? (
              <button className="combat__button__cancel" onClick={() => setIsInAction(false)}>Annuler</button>
            ) : (
              <div className="combat__player__turn">
              <button className="combat__button__attack" onClick={handleAttack}>Attaquer</button>
              <button className="combat__button__defense">Se protéger</button>
              <button className="combat__button__use">Utiliser</button>
              <button className="combat__button__fled">Fuir</button>
            </div>
            )}
          </>
        ) : (
          <div className="ennemy-turn">Au tour de votre adversaire</div>
        )}
      </div>
    );
};

export default Combat;