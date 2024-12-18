import React, { useContext, useEffect, useState } from "react";
import Loot from "../Loot";
import { PlayerContext } from "../../utils/Context";
import AnimatedText from "../functions/AnimatedText";
import CombatTurns from "./CombatTurns";
import Buttons from "./buttons/Buttons";
import useCombatActions from "./hooks/useCombatActions";
import { calculateDamage } from "../../utils/CombatUtils";
import PlayerStats from "./PlayerStats";
import EnemyStats from "./EnemyStats";
import CombatDescription from "./CombatDescription";
import FightZone from "./FightZone";
import DisplayTurns from "./DisplayTurns";
import FinishCombat from "./FinishCombat";

const Combat = ({ enemy, onCombatFinish }) => {
  const { playerStats, setPlayerStats, playerStatsFull, setPlayerStatsFull } =
    useContext(PlayerContext);
  const [playerTurn, setPlayerTurn] = useState(true); //vérifie si joueur a l'initiative avant de pouvoir attaquer
  const [playerName, setPlayerName] = useState(() => {
    const savedPlayerName = localStorage.getItem("playerName");
    return savedPlayerName ? savedPlayerName : "John Doe";
  });
  const [isIntro, setIsIntro] = useState(true);
  // const [isAttacking, setIsAttacking] = useState(false);
  const [isAttacked, setIsAttacked] = useState(false);
  // const [isInAction, setIsInAction] = useState(false);
  const [combatFinished, setCombatFinished] = useState(false);
  const [showLoot, setShowLoot] = useState(false);
  const [combatDesc, setCombatDesc] = useState("");
  const [actionCounter, setActionCounter] = useState(0);
  //Relatifs à/aux ennemi-s
  const [enemyState, setEnemyState] = useState(enemy);
  const orderName = enemyState.combatData.attackSyst.orderUsed;
  const orderAttack = enemyState.combatData.attackSyst[orderName];
  const [indexOrderAttack, setIndexOrderAttack] = useState(0);
  const [enemyAttacked, setEnemyAttacked] = useState(false);
  const [enemyAttacking, setEnemyAttacking] = useState(false);
  const [enemyAttack, setEnemyAttack] = useState(null);
  const [animationAttack, setAnimationAttack] = useState(null);

  //Relatifs au Joueur pendant le combat
  const [animationPlayer, setAnimationPlayer] = useState("");
  const [isAnimationPlaying, setIsAnimationPlaying] = useState(false); //Met en pause tout le composant lorsqu'actif

  //hooks perso
  const {isInAction,setIsInAction, isAttacking,setIsAttacking, cancelAction, handleAttack, handleDefense} = useCombatActions();

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

  //Lorsque le joueur attaque l'ennemi
  const handleEnemyClick = () => {
    if (isAttacking) {
      setEnemyAttacked(true);
      const damages = Math.max(
        playerStatsFull.attack * 0.1,
        calculateDamage(
          playerStatsFull.attack,
          playerStatsFull.accuracy,
          playerStatsFull.chance
        ) - enemyState.defense
      );
      enemyState.health -= damages;
      setIsAttacking(false);
      setIsInAction(false);
    }
  };

  const findAttack = (id = orderAttack[indexOrderAttack]) => {
    const attack = enemyState.combatData.attacks.find(
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
    const nextAttackId = orderAttack[indexOrderAttack + 1];
    const nextAttack = findAttack(nextAttackId);
    let nextId = indexOrderAttack + 1;

    //Check si nextAttack existe && Check si condition i+1 remplie
    if (nextAttack.isConditional && !nextAttack.condition(enemyState)) {
      nextId = indexOrderAttack; //On reset l'index à sa valeur initiale
    }
    if (orderName === "orderForwards") {
      setIndexOrderAttack((actualIndex) => {
        if (actualIndex === orderAttack.length - 1) {
          return orderAttack.length - 1; //valeur cappée
        }
        return nextId;
      });
    }
  };

  const handleMsAnimatedText = () => {
    if (playerTurn) return 30;
    if (enemyAttacking) return 10;
    return 10;
  };

  const handleAnimationAttack = () => {
    const animation = enemyAttack.animation;
    return `combat__ennemy__attack ${animation}`;
  };

  const handleAnimationPlayer = (damagesTaken = null) => {
    if (damagesTaken == 0) setAnimationPlayer("");
    else if (damagesTaken <= playerStatsFull.maxHealth * 0.1) {
      setAnimationPlayer("combat__hit");
    } else if (damagesTaken <= playerStatsFull.maxHealth * 0.4) {
      setAnimationPlayer("combat__hit__middle");
    }
  };

  //Joueur s'est pris des damages
  const playerGetsHit = () => {
    const enemyDamage =
      calculateDamage(
        enemyAttack.effects.getDamages(enemyState),
        enemyState.accuracy,
        enemyState.chance
      ) - playerStatsFull.defense;
    setPlayerStats((prevStats) => ({
      ...prevStats,
      stats: {
        ...prevStats.stats,
        health: prevStats.stats.health - enemyDamage,
      },
    }));
    //Gère l'animation du joueur lors des damages reçus
    handleAnimationPlayer(enemyDamage);
  };

  const enemyHealed = () => {
    const healPoints = enemyAttack.effects.heal;
    setEnemyState((prevStats) => ({
      ...prevStats,
      health: prevStats.health + healPoints,
    }));
    handleAnimationPlayer(0);
  };

  /*---------- USE EFFECTS ----------*/

  //Gère la réaction de l'ennemi une fois que le joueur a fait son action
  useEffect(() => {
    console.log("playerTurn useEffect : ",playerTurn);
    
    if (playerTurn === null) return; //Permet une bonne actualisation lors des doubles tours
    if (!playerTurn && enemyState.health > 0){
      setActionCounter(() => actionCounter + 1);
      setEnemyAttacking(true); // = Son animation se joue
      const animation = enemyAttack.animation;
      const animationDuration = enemyAttack.animationDuration;
      setAnimationAttack(() => ({
        animation,
        animationDuration,
      }));
      const enemyAction = setTimeout(() => {
        //animation + effets
        if (typeof enemyAttack.effects.getDamages === "function") {
          //ennemi attaque joueur
          if (enemyAttack.effects.getDamages(enemyState)) {
            playerGetsHit();
          }
        } else if (enemyAttack.effects.heal) {
          enemyHealed();
        }

        setEnemyAttacking(false);
        setIsAttacked(true);
      }, animationDuration);
      // Nettoyage du timeout si le composant est démonté ou si la dépendance change
      return () => {
        clearTimeout(enemyAction);
      };
    } else if (enemyState.health <= 0) {
      setCombatFinished(true);
    }
  }, [playerTurn]);

  //Si joueur n'est plus en action, alors on décoche tout les states de combat
  useEffect(() => {
    console.log("enemyattacked : ", enemyAttacked);
    if (enemyAttacked) {
      setTimeout(() => {
        setEnemyAttacked(false);
      }, 600);
    }
  }, [isInAction, enemyAttacked]);

  //Gère l'animation du joueur quand attaqué & localStorage sa health
  useEffect(() => {
    console.log("isAttacked: ", isAttacked);

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
  }, [actionCounter]);

  /**A chaque fois que c'est le tour du joueur,
   * l'ennemi aura son compteur d'orderAttack incrémenté de 1
   * upOrderAttack vérifie également si la condition d'attaque d'ennemi est respectée pour pouvoir la lancer
   *
   * Update aussi l'attaque de l'ennemi
   */
  useEffect(() => {
    if (playerTurn && !isIntro) {
      upOrderAttack();
    }
  }, [playerTurn]);

  /**Gère la description lors du combat de A à Z */
  useEffect(() => {
    setEnemyAttack(findAttack(orderAttack[indexOrderAttack]));
    //Toujours en dernier pour avoir tout le temps l'intro
    if (isIntro) {
      //seul state dépendant d'un autre useEffect
      setCombatDesc(enemyState.combatData.narrative.intro);
      return;
    } else if (enemyAttacking && enemyAttack) {
      setCombatDesc(enemyAttack.desc);
    } else if (playerTurn) {
      if (enemyAttack && findDescBeforeAtk(enemyAttack)) {
        setCombatDesc(enemyAttack.descBeforeAtk);
      } else {
        setCombatDesc((prevDesc) => {
          const narrativeOptions = enemyState.combatData.narrative.playerTurn;

          if (narrativeOptions.length === 1) {
            return narrativeOptions[0]; // Si un seul texte, pas besoin de randomiser
          }

          let randomText;
          do {
            const indexRandom = Math.floor(
              Math.random() * narrativeOptions.length
            );
            randomText = narrativeOptions[indexRandom];
          } while (randomText === prevDesc);

          return randomText;
        });
      }
    }
  }, [enemyAttacking, enemyAttack, enemyState, playerTurn, isIntro]);

  return !showLoot ? (
    <div
      className={`combat-container ${isAttacking ? "combat--attacking" : ""}`}
    >
      <CombatTurns
        playerTurn={playerTurn}
        setPlayerTurn={setPlayerTurn}
        enemy={enemy}
        enemyAttacked={enemyAttacked}
        isAttacked={isAttacked}
        isIntro={isIntro}
      />

      <FightZone playerTurn={playerTurn} isAttacked={isAttacked} animationPlayer={animationPlayer} playerStatsFull={playerStatsFull} playerName={playerName} combatDesc={combatDesc} handleMsAnimatedText={handleMsAnimatedText} enemyAttacked={enemyAttacked} enemyAttacking={enemyAttacking} handleAnimationAttack={handleAnimationAttack} handleEnemyClick={handleEnemyClick} enemyState={enemyState} />

      {/* Affichage tour du joueur et ennemi */}
      <DisplayTurns playerTurn={playerTurn} enemyAttacked={enemyAttacked} isInAction={isInAction} cancelAction={cancelAction} handleAttack={handleAttack} handleDefense={handleDefense} />
    </div>
  ) : (
    /* IF COMBAT FINISHED */
    <FinishCombat enemyState={enemyState} handleCloseLoot={handleCloseLoot} />
  );
};

export default Combat;
