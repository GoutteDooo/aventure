import React from "react";
import Buttons from "../buttons/Buttons";

const DisplayTurns = ({
  playerTurn,
  enemyAttacked,
  isInAction,
  cancelAction,
  handleAttack,
  handleDefense,
}) => {
  return (
    <div>
      {playerTurn && !enemyAttacked ? (
        <>
          <div className="your-turn">C'est votre tour</div>
          {isInAction ? (
            <button className="combat__button__cancel" onClick={cancelAction}>
              Annuler
            </button>
          ) : (
            <Buttons
              handleAttack={handleAttack}
              handleDefense={handleDefense}
            />
          )}
        </>
      ) : (
        <div className="ennemy-turn">Au tour de votre adversaire</div>
      )}
    </div>
  );
};

export default DisplayTurns;
