import React, { useContext, useEffect, useState } from "react";
import Loot from "./Loot";
import { PlayerContext } from "../utils/Context";
import AnimatedText from "./functions/AnimatedText";

const Combat = ({ enemy, onCombatFinish }) => {
  const { playerStats, setPlayerStats, playerStatsFull, setPlayerStatsFull } =
    useContext(PlayerContext);
  const [playerTurn, setPlayerTurn] = useState(true); //vérifie si joueur a l'initiative avant de pouvoir attaquer
  const [playerName, setPlayerName] = useState(() => {
    const savedPlayerName = localStorage.getItem("playerName");
    return savedPlayerName ? savedPlayerName : "John Doe";
  });
  const [isIntro, setIsIntro] = useState(true);
  const [isAttacking, setIsAttacking] = useState(false);
  const [isAttacked, setIsAttacked] = useState(false);
  const [isInAction, setIsInAction] = useState(false);
  const [combatFinished, setCombatFinished] = useState(false);
  const [showLoot, setShowLoot] = useState(false);
  const [combatDesc, setCombatDesc] = useState("");
  //Relatifs à/aux ennemi-s
  const orderName = enemy.combatData.attackSyst.orderUsed;
  const orderAttack = enemy.combatData.attackSyst[orderName];
  const [indexOrderAttack, setIndexOrderAttack] = useState(0);
  const [enemyAttacked, setEnemyAttacked] = useState(false);
  const [enemyAttacking, setEnemyAttacking] = useState(false);

  //Charger les données du joueur depuis le localStorage
  useEffect(() => {
    const storedPlayerData = localStorage.getItem("playerData");
    if (storedPlayerData) {
      setPlayerStats(JSON.parse(storedPlayerData));
    }
  }, []);

  //Ecran de chargement
  if (!playerStats) {
    return (
      <p className="animate-pulsing animate-iteration-count-infinite">
        Chargement des données du joueur...
      </p>
    );
  }
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

  const findAttack = () => {
    const idAttack = orderAttack[indexOrderAttack];
    const attack = enemy.combatData.attacks.find(
      (attack) => attack.id === idAttack
    );
    return attack;
  };

  /**
   * Cherche s'il y'a une descBeforeAtk et
   * retourne true le cas échéant
   * sinon false
   * @param {object} researchingAttack - attack
   * @returns {boolean}
   */
  const findDescBeforeAtk = (researchingAttack) => {
    if (researchingAttack.hasDescBeforeAtk) return true;
    return false;
  };

  //Gère la réaction de l'ennemi une fois que le joueur a fait son action
  useEffect(() => {
    if (!playerTurn && enemy.health > 0) {
      setEnemyAttacking(true);
      //setAttack
      setIndexOrderAttack((prevIndex) => {
        if (orderName === "orderForwards") {
          if (prevIndex === orderAttack.length - 1) {
            return orderAttack.length - 1;
          }
          return prevIndex + 1;
        }
      });
      const attack = findAttack();
      console.log(attack);
      console.log("a-t-il une descBA ? ", findDescBeforeAtk(attack));

      console.log(enemy.combatData.narrative.attack[2](enemy));

      //fin setAttack
      const enemyAction = setTimeout(() => {
        const enemyDamage = Math.max(
          Math.trunc(1 + enemy.attack * 0.1),
          damage(enemy.attack, enemy.accuracy, enemy.chance) -
            playerStatsFull.defense
        );

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

  //Si joueur n'est plus en action, alors on décoche tout les states de combat
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
    if (combatFinished && !showLoot) {
      setShowLoot(true);
    }
  }, [combatFinished, showLoot]);

  const handleCloseLoot = () => {
    setShowLoot(false);
    onCombatFinish();
  };

  const handleCombatDesc = () => {
    if (enemyAttacking) {
      setCombatDesc(enemy.combatData.attacks[0].desc);
    }
    if (playerTurn) {
      let rng = null;
      let narrativeOptions = null;
      let randomIndex = null;
      let randomText = "";
      do {
        rng = Math.random();
        narrativeOptions = enemy.combatData.narrative.playerTurn;
        randomIndex = Math.floor(rng * narrativeOptions.length);
        randomText = narrativeOptions[randomIndex];
      } while (randomText === combatDesc);

      setCombatDesc(randomText);
    }
    if (isIntro) {
      setIsIntro(false);
      setCombatDesc(enemy.combatData.narrative.intro);
    }
  };

  const handleMsAnimatedText = () => {
    if (playerTurn) return 30;
    if (enemyAttacking) return 10;
    return 1000;
  };

  useEffect(() => {
    handleCombatDesc();
  }, [enemyAttacking, enemy]);

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
          <p>
            Atk : {Math.trunc(playerStatsFull.attack)} ~{" "}
            {Math.trunc(playerStatsFull.attack * playerStatsFull.accuracy)}
          </p>
          <p>Def : {playerStatsFull.defense}</p>
          <p>Adr : {Math.trunc(playerStatsFull.accuracy * 100)}</p>
          <p>Ch : {playerStatsFull.chance * 100}</p>
          <p>Init : {playerStatsFull.initiative}</p>
        </div>
        {/* Fenêtre de description */}
        <div className="combat__display__container">
          {combatDesc && (
            <AnimatedText text={combatDesc} ms={handleMsAnimatedText()} />
          )}
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
          <p>
            Atk : {enemy.attack * enemy.accuracy} ~ {enemy.attack}
          </p>
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
              <button className="combat__button__magic">Magie</button>
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
