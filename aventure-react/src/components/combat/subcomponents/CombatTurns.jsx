import React, { useContext, useEffect, useState } from "react";
import { PlayerContext } from "../../../utils/Context";

const CombatTurns = ({
  enemyAttacked,
  isAttacked,
  playerTurn,
  setPlayerTurn,
  enemy,
  isIntro,
}) => {
  const { playerStats, setPlayerStats, playerStatsFull, setPlayerStatsFull } =
    useContext(PlayerContext);
  const diffInit = playerStatsFull.initiative - enemy.initiative;

  const [turns, setTurns] = useState(() => {
    const diffInit = (playerStatsFull.initiative - enemy.initiative) / 100;
    let calcul = diffInit === 0 ? 0.5 : diffInit > 0 ? 0.7 : 0.3;
    calcul = Math.max(0.033, Math.min(0.9666, calcul * (1 + diffInit)));
    return Math.random() < calcul ? [0] : [enemy.name];
  });

  /**
   * Calcule au premier rendu qui doit jouer
   * Lancée à chaque re-rendu, calcule en fonction du playerTurn qui doit jouer.
   * Calcule également s'il doit y avoir double tour ou non.
   * Le double tour est calculé à chaque nouveau tour du personnage en cours et prend en compte le différentiel d'initiative entre lui et son adversaire
   * Il y'aura un total de 10 tours visibles à l'écran (ou plus si je me rends compte que c'est pas assez), et à chaque fois qu'un tour passe, un nouveau s'ajoute à la liste.
   */
  const calculateTurns = () => {
    setTurns(() => {
      const updatedTurns = turns.slice(1);
      const newTurn = playerTurn ? 0 : enemy.name;
      return [...updatedTurns, newTurn];
    });
    handleTurns(turns[0]);
  };

  const generateTurns = () => {
    let sw = true; //true == joueur, false == ennemi
    for (let i = 0; i < 10; i++) {
      setTurns((prevTurns) => {
        const newTurn = sw ? 0 : enemy.name;
        sw = searchPlayTwice(sw);
        return [...prevTurns, newTurn];
      });
    }
  };

  const handleTurns = (turnInfo) => {
    if (playerTurn === true || playerTurn === false) {
      setPlayerTurn(null);
      return;
    } else {
      if (turnInfo === 0) setPlayerTurn(true);
      else setPlayerTurn(false);
    }
    console.log("Turns, playerTurn : ", playerTurn);
  };
  const firstToPlay = () => {};

  /**
   *
   * @returns {number}
   */
  const searchPlayTwice = (levier) => {
    if (diffInit >= 3) {
      console.log("play twice !");
      return Math.random() > 0.9 ? true : !levier; //JOUEUR
    } else if (diffInit <= -3) {
      return Math.random() > 0.9 ? false : !levier; //ENNEMI
    }
    return !levier;
  };

  useEffect(() => {
    if ((isAttacked && !enemyAttacked) || (!isAttacked && enemyAttacked)) {
      let timer = 600;
      if (enemyAttacked) timer = 600;
      setTimeout(() => {
        calculateTurns();
      }, timer);
    }
  }, [isAttacked, enemyAttacked]);

  useEffect(() => {
    if (playerTurn === null) handleTurns(turns[0]);
  }, [playerTurn]);

  useEffect(() => {
    generateTurns();
  }, []);

  return (
    <div className="combatTurns">
      <div className="combatTurns__wheel">
        {turns &&
          turns.map((turn, i) => (
            <div
              className={`${turn === 0 ? "player-turn" : "enemy-turn"} ${
                i === 0 && turn === 0 ? "first-turn" : ""
              }`}
              key={i}
            >
              {turn === 0 ? "Joueur" : `${turn}`}
            </div>
          ))}
      </div>
    </div>
  );
};

export default CombatTurns;
