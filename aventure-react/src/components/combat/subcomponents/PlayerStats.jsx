import React from 'react';

const PlayerStats = ({playerTurn,isAttacked,animationPlayer, playerStatsFull, playerName}) => {
    return (
        <div
          className={`combat__player__stats ${
            playerTurn ? "combat__play" : "combat__wait"
          } ${isAttacked ? animationPlayer : ""}`}
        >
          <div className="combat__player__stats--name">{playerName}</div>
          <p>Vie : {playerStatsFull.health}</p>
          <p>
            Atk : {Math.trunc(playerStatsFull.attack)} ~{" "}
            {Math.trunc(playerStatsFull.attack * playerStatsFull.accuracy)}
          </p>
          <p>Def : {playerStatsFull.defense}</p>
          <p>Adr : {Math.trunc(playerStatsFull.accuracy * 100)}</p>
          <p>Ch : {Math.trunc(playerStatsFull.chance * 100)}</p>
          <p>Init : {playerStatsFull.initiative}</p>
        </div>
    );
};

export default PlayerStats;