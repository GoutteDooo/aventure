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
  const [actionCounter, setActionCounter] = useState(0);
  //Relatifs à/aux ennemi-s
  const orderName = enemy.combatData.attackSyst.orderUsed;
  const orderAttack = enemy.combatData.attackSyst[orderName];
  const [indexOrderAttack, setIndexOrderAttack] = useState(0);
  const [enemyAttacked, setEnemyAttacked] = useState(false);
  const [enemyAttacking, setEnemyAttacking] = useState(false);
  const [enemyAttack, setEnemyAttack] = useState(null);
  const [animationAttack, setAnimationAttack] = useState(null);

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

  const findAttack = (id = orderAttack[indexOrderAttack]) => {
    const attack = enemy.combatData.attacks.find(
      (attack) => attack.id === id
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
  
  /**Gère l'ordre de l'attaque de l'ennemi
   * La fonction s'active à chaque tour de l'ennemi.
   * @actualIndex est l'index de l'attaque actuelle
   * @actualIndex + 1 sera l'index au prochain tour
   * Si la @condition de la prochaine attaque n'est pas remplie, alors l'index reste tel qu'il est. Sinon, index + 1.
   */
  const upOrderAttack = () => {
    const nextAttackId = orderAttack[indexOrderAttack+1];
    const nextAttack = findAttack(nextAttackId);
    let nextId = indexOrderAttack + 1;
    
    
    //Check si nextAttack existe && Check si condition i+1 remplie
    if (nextAttack.isConditional && !nextAttack.condition(enemy)) {
      nextId = indexOrderAttack; //On reset l'index à sa valeur initiale
    }
      if (orderName === "orderForwards") {
        setIndexOrderAttack((actualIndex) => {
        if (actualIndex === orderAttack.length - 1) {
          return orderAttack.length - 1;//valeur cappée
        }
        return nextId;
      });
    }
  }


  const handleMsAnimatedText = () => {
    if (playerTurn) return 30;
    if (enemyAttacking) return 10;
    return 1000;
  };

  const handleAnimationAttack = () => {
    const animation = enemyAttack.animation;
    return `combat__ennemy__attack ${animation}`;
  }

  //Joueur s'est pris des damages
  const playerGetsHit = () => { 
    console.log("L'ennemi inflige un total de ", enemyAttack.effects.getDamages(enemy)," dégâts");
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
  }

  const enemyHealed = () => {
    console.log("L'ennemi s'est soigné de ", enemyAttack.effects.heal);
    
  }

  /*---------- USE EFFECTS ----------*/

  //Gère la réaction de l'ennemi une fois que le joueur a fait son action
  useEffect(() => {
    if (!playerTurn && enemy.health > 0) {
      setActionCounter(() => actionCounter+1);
      setEnemyAttacking(true);// = Son animation se joue
      const animation = enemyAttack.animation;
      const animationDuration = enemyAttack.animationDuration;
      setAnimationAttack(() => ({
        animation,
        animationDuration,
      }));
      const enemyAction = setTimeout(() => {
        //animation + effets
      if (typeof enemyAttack.effects.getDamages === "function") {//ennemi attaque joueur
        if (enemyAttack.effects.getDamages(enemy)) { 
          playerGetsHit();
        }
      } else if (enemyAttack.effects.heal) { 
          enemyHealed();
      }
        

        setIsAttacked(true);
        setPlayerTurn(true); // Retourne au tour du joueur
      }, animationDuration);
      

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

  useEffect(() => {
    if (actionCounter > 0) if (isIntro) setIsIntro(false);
  }, [actionCounter])

  /**A chaque fois que c'est le tour du joueur,
   * l'ennemi aura son compteur d'orderAttack incrémenté de 1
   * upOrderAttack vérifie également si la condition d'attaque d'ennemi est respectée pour pouvoir la lancer
   * 
   * Update aussi l'attaque de l'ennemi
   */
  useEffect(() => {
    if (playerTurn && !isIntro) {
      upOrderAttack()
    };
  },[playerTurn])

  /**Gère la description lors du combat de A à Z */
  useEffect(() => {
    setEnemyAttack(findAttack(orderAttack[indexOrderAttack]));
    //Toujours en dernier pour avoir tout le temps l'intro
    if (isIntro) { //seul state dépendant d'un autre useEffect
      setCombatDesc(enemy.combatData.narrative.intro);
      return;
    } else if (enemyAttacking && enemyAttack) {
      setCombatDesc(enemyAttack.desc);
    } else if (playerTurn) {
      if (enemyAttack && findDescBeforeAtk(enemyAttack)) {
        setCombatDesc(enemyAttack.descBeforeAtk);
      } else {
        setCombatDesc((prevDesc) => {
          const narrativeOptions = enemy.combatData.narrative.playerTurn;
        
          if (narrativeOptions.length === 1) {
            return narrativeOptions[0]; // Si un seul texte, pas besoin de randomiser
          }
        
          let randomText;
          do {
            const indexRandom = Math.floor(Math.random() * narrativeOptions.length);
            randomText = narrativeOptions[indexRandom];
          } while (randomText === prevDesc);
        
          return randomText;
        });
      }
    }
    }, [enemyAttacking, enemyAttack, enemy, playerTurn, isIntro]);

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
            enemyAttacking ? handleAnimationAttack() : ""
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
