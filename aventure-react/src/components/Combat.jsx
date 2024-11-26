import React, { useEffect, useState } from "react";

const Combat = ({ enemy }) => {
  const [playerStats, setPlayerStats] = useState(null);
  const [playerTurn, setPlayerTurn] = useState(true); //vérifie si joueur a l'initiative avant de pouvoir attaquer
  const [isAttacking, setIsAttacking] = useState(false);
  const [isInAction, setIsInAction] = useState(false);
  const [enemyAttacked, setEnemyAttacked] = useState(false);
  const [enemyAttacking, setEnemyAttacking] = useState(false);

  //Charger les données du joueur depuis le localStorage
  useEffect(() => {
    const storedPlayerData = localStorage.getItem("playerData");
    if (storedPlayerData) {
      setPlayerStats(JSON.parse(storedPlayerData));
    }
  }, []);

  const handleAttack = () => {
    if (!isInAction) {
      setIsInAction(true);
      setIsAttacking(true);
    }
  };

  const handleEnemyClick = () => {
    if (isAttacking && playerTurn) {
      setEnemyAttacked(true);
      const damage = Math.max(0, playerStats.stats.attack - enemy.defense);
      enemy.health -= damage;
      setIsAttacking(false);
      setIsInAction(false);
      setPlayerTurn(false);
    }
  };

  useEffect(() => {
    if (!playerTurn) {
      setEnemyAttacking(true);
      const enemyAction = setTimeout(() => {
        console.log("enemyAction ON");

        const enemyDamage = Math.max(
          0,
          enemy.attack - playerStats.stats.defense
        );

        setPlayerStats((prevStats) => ({
          ...prevStats,
          stats: {
            ...prevStats.stats,
            health: prevStats.stats.health - enemyDamage,
          },
        }));

        setPlayerTurn(true); // Retourne au tour du joueur
      }, 2000);

      // Nettoyage du timeout si le composant est démonté ou si la dépendance change
      return () => {
        console.log("enemyAction CLEARED");
        setEnemyAttacking(false);
        clearTimeout(enemyAction);
      };
    }
  }, [playerTurn]);

  useEffect(() => {
    //Si n'est plus en action, alors on décoche tout les states de combat
    if (!isInAction) {
      setIsAttacking(false);
    }
    if (enemyAttacked) {
      setTimeout(() => {
        setEnemyAttacked(false);
      }, 600);
    }
  }, [isInAction, enemyAttacked]);

  if (!playerStats) {
    return (
      <p className="animate-pulsing animate-iteration-count-infinite">
        Chargement des données du joueur...
      </p>
    );
  }

  return (
    <div
      className={`combat-container ${isAttacking ? "combat--attacking" : ""}`}
    >
      <div className="combat">
        <div
          className={`combat__player__stats ${
            playerTurn ? "combat__play" : "combat__wait"
          }`}
        >
          <div className="combat__player__stats--name">{playerStats.name}</div>
          <p>Vie : {playerStats.stats.health}</p>
          <p>Attaque : {playerStats.stats.attack}</p>
          <p>Défense : {playerStats.stats.defense}</p>
          <p>Adresse : {playerStats.stats.accuracy}</p>
          <p>Initiative : {playerStats.stats.initiative}</p>
        </div>
        <div
          className={`combat__ennemy__stats ${
            playerTurn ? "combat__ennemy__wait" : "combat__ennemy__play"
          } ${enemyAttacked ? "combat__hit" : ""} ${
            enemyAttacking ? "combat__ennemy__attack" : ""
          }`}
          onClick={handleEnemyClick}
        >
          <div className="combat__ennemy__stats--name">{enemy.name}</div>
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
            <button
              className="combat__button__cancel"
              onClick={() => setIsInAction(false)}
            >
              Annuler
            </button>
          ) : (
            <div className="combat__player__turn">
              <button className="combat__button__attack" onClick={handleAttack}>
                Attaquer
              </button>
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
