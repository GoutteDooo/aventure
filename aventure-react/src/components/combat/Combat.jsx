import React, { useContext, useEffect, useState } from "react";
import { PlayerContext } from "../../utils/Context";
import CombatTurns from "./CombatTurns";
import usePlayerActions from "./hooks/usePlayerActions";
import { calculateDamage, findDescBeforeAtk } from "../../utils/CombatUtils";
import FightZone from "./FightZone";
import DisplayTurns from "./DisplayTurns";
import FinishCombat from "./FinishCombat";
import useEnemyState from "./hooks/useEnemyState";

const Combat = ({ enemy, onCombatFinish }) => {
  const { playerStats, setPlayerStats, playerStatsFull, setPlayerStatsFull } =
    useContext(PlayerContext);
  const [playerTurn, setPlayerTurn] = useState(true); //vérifie si joueur a l'initiative avant de pouvoir attaquer
  const [playerName, setPlayerName] = useState(() => {
    const savedPlayerName = localStorage.getItem("playerName");
    return savedPlayerName ? savedPlayerName : "John Doe";
  });
  const [isIntro, setIsIntro] = useState(true);
  const [isAttacked, setIsAttacked] = useState(false);
  const [combatFinished, setCombatFinished] = useState(false);
  const [showLoot, setShowLoot] = useState(false);
  const [combatDesc, setCombatDesc] = useState("");
  const [actionCounter, setActionCounter] = useState(0);
  //Relatifs au Joueur pendant le combat
  const [animationPlayer, setAnimationPlayer] = useState("");
  const [isAnimationPlaying, setIsAnimationPlaying] = useState(false); //Met en pause tout le composant lorsqu'actif
  //hooks perso
  const {orderName, orderAttack, enemyState, setEnemyState, indexOrderAttack, setIndexOrderAttack, enemyAttacked, setEnemyAttacked, enemyAttacking, setEnemyAttacking, enemyAttack, setEnemyAttack, animationAttack, setAnimationAttack} = useEnemyState(enemy);
  const {isInAction,setIsInAction, isAttacking,setIsAttacking, cancelAction, handleAttack, handleDefense} = usePlayerActions();

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
   * Update aussi l'attaque de l'ennemi
   */
  useEffect(() => {
    if (playerTurn && !isIntro) {
      upOrderAttack();
    }
  }, [playerTurn]);


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

      <FightZone playerTurn={playerTurn} isAttacked={isAttacked} animationPlayer={animationPlayer} playerStatsFull={playerStatsFull} playerName={playerName} combatDesc={combatDesc} setCombatDesc={setCombatDesc} enemyAttacked={enemyAttacked} enemyAttacking={enemyAttacking} isIntro={isIntro} handleAnimationAttack={handleAnimationAttack} handleEnemyClick={handleEnemyClick} enemyState={enemyState} enemyAttack={enemyAttack} setEnemyAttack={setEnemyAttack} findAttack={findAttack} orderAttack={orderAttack} indexOrderAttack={indexOrderAttack} findDescBeforeAtk={findDescBeforeAtk}/>

      {/* Affichage tour du joueur et ennemi */}
      <DisplayTurns playerTurn={playerTurn} enemyAttacked={enemyAttacked} isInAction={isInAction} cancelAction={cancelAction} handleAttack={handleAttack} handleDefense={handleDefense} />
    </div>
  ) : (
    /* IF COMBAT FINISHED */
    <FinishCombat enemyState={enemyState} handleCloseLoot={handleCloseLoot} />
  );
};

export default Combat;
