import React, { useContext, useEffect, useState } from "react";
import Loot from "./Loot";
import { PlayerContext } from "../utils/Context";

const Combat = ({ enemy, onCombatFinish }) => {
  const {playerStats, setPlayerStats, playerStatsFull, setPlayerStatsFull} = useContext(PlayerContext);
  const [playerTurn, setPlayerTurn] = useState(true); //vérifie si joueur a l'initiative avant de pouvoir attaquer
  const [playerName, setPlayerName] = useState(() => {
    const savedPlayerName = localStorage.getItem("playerName");
    return savedPlayerName ? savedPlayerName : "John Doe";
  });
  const [isAttacking, setIsAttacking] = useState(false);
  const [isInAction, setIsInAction] = useState(false);
  const [enemyAttacked, setEnemyAttacked] = useState(false);
  const [enemyAttacking, setEnemyAttacking] = useState(false);
  const [isAttacked, setIsAttacked] = useState(false);
  const [combatFinished, setCombatFinished] = useState(false);
  const [showLoot, setShowLoot] = useState(false);

  //Charger les données du joueur depuis le localStorage
  useEffect(() => {
    const storedPlayerData = localStorage.getItem("playerData");
    if (storedPlayerData) {
      setPlayerStats(JSON.parse(storedPlayerData));
    }
  }, []);

  //Fonction calcul des dommages avec coup critique
  const damage = (attack, accuracy, chance) => {
    const rngStrike = Math.random();
    const rngAttack = Math.random();
    let brutDamages = Math.round(attack - (1 - accuracy) * rngAttack * attack);
    if (rngStrike >= 1 - chance) brutDamages *= 2;

    return brutDamages;
  };

  const handleAttack = () => {
    if (!isInAction) {
      setIsInAction(true);
      setIsAttacking(true);
    }
  };

  //Lorsque le joueur attaque l'ennemi
  const handleEnemyClick = () => {
    if (isAttacking && playerTurn) {
      setEnemyAttacked(true);
      const damages = Math.max(
        playerStatsFull.attack * 0.1,
        damage(
          playerStatsFull.attack,
          playerStatsFull.accuracy,
          playerStatsFull.chance
        ) - enemy.defense
      );
      enemy.health -= damages;
      setIsAttacking(false);
      setIsInAction(false);
      setPlayerTurn(false);
    }
  };

  //Gère la réaction de l'ennemi une fois que le joueur a fait son action
  useEffect(() => {
    if (!playerTurn && enemy.health > 0) {
      setEnemyAttacking(true);
      const enemyAction = setTimeout(() => {
        const enemyDamage = Math.max(
          Math.trunc(1 + enemy.attack * 0.1),
          damage(enemy.attack, enemy.accuracy, enemy.chance) -
            playerStatsFull.defense
        );
        console.log("dommages adverses : ",enemyDamage);
        

        setPlayerStats((prevStats) => ({
          ...prevStats,
          stats: {
            ...prevStats.stats,
            health: prevStats.stats.health - enemyDamage,
          },
        }));
        setIsAttacked(true);
        setPlayerTurn(true); // Retourne au tour du joueur
      }, 2000);

      // Nettoyage du timeout si le composant est démonté ou si la dépendance change
      return () => {
        setEnemyAttacking(false);
        clearTimeout(enemyAction);
      };
    } else if (enemy.health <= 0) {
      setCombatFinished(true);
    }
  }, [playerTurn]);

  //Si n'est plus en action, alors on décoche tout les states de combat
  useEffect(() => {
    if (!isInAction) {
      setIsAttacking(false);
    }
    if (enemyAttacked) {
      setTimeout(() => {
        setEnemyAttacked(false);
      }, 600);
    }
  }, [isInAction, enemyAttacked]);

  //Gère l'animation du joueur quand attaqué & localStorage sa health
  useEffect(() => {
    if (isAttacked) {
      localStorage.setItem("playerData", JSON.stringify(playerStats));
      setTimeout(() => {
        setIsAttacked(false);
      }, 1500);
    }
  }, [isAttacked]);

  //Gère l'état lorsque le combat est terminé
  useEffect(() => {
    if (combatFinished  && !showLoot) {
      setShowLoot(true);
      }
  }, [combatFinished, showLoot]);

  const handleCloseLoot = () => {
    setShowLoot(false);
    onCombatFinish();
  }

  //Ecran de chargement
  if (!playerStats) {
    return (
      <p className="animate-pulsing animate-iteration-count-infinite">
        Chargement des données du joueur...
      </p>
    );
  }

  return !showLoot ? (
    <div
      className={`combat-container ${isAttacking ? "combat--attacking" : ""}`}
    >
      <div className="combat">
        <div
          className={`combat__player__stats ${
            playerTurn ? "combat__play" : "combat__wait"
          } ${isAttacked ? "combat__hit" : ""}`}
        >
          <div className="combat__player__stats--name">{playerName}</div>
          <p>Vie : {playerStatsFull.health}</p>
          <p>Atk : {Math.trunc(playerStatsFull.attack)} ~ {Math.trunc(playerStatsFull.attack * playerStatsFull.accuracy)}</p>
          <p>Def : {playerStatsFull.defense}</p>
          <p>Adr : {Math.trunc(playerStatsFull.accuracy * 100)}</p>
          <p>Ch : {playerStatsFull.chance * 100}</p>
          <p>Init : {playerStatsFull.initiative}</p>
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
          <p>Atk : {enemy.attack}</p>
          <p>Def : {enemy.defense}</p>
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
  ) : (
    /* IF COMBAT FINISHED */
    <div className="combat__finished__container">
      <div className="pop-up__finished--bg">
        <p>Combat terminé</p>
      </div>
      <div className="finish__pop-up">
        <Loot loots={enemy.loots} gain={enemy.gain} onClose={handleCloseLoot} />
      </div>
    </div>
  );
};

export default Combat;
