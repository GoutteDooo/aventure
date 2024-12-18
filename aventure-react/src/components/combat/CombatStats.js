const CombatStats = ({
  playerStats,
  enemyState,
  playerTurn,
  isAttacked,
  animationPlayer,
}) => (
  <div className="combat">
    <div
      className={`combat__player__stats ${
        playerTurn ? "combat__play" : "combat__wait"
      } ${isAttacked ? animationPlayer : ""}`}
    >
      <div className="combat__player__stats--name">{playerStats.name}</div>
      <p>Vie : {playerStats.health}</p>
      <p>
        Atk : {playerStats.attack} ~{" "}
        {Math.trunc(playerStats.attack * playerStats.accuracy)}
      </p>
      <p>Def : {playerStats.defense}</p>
    </div>
    <div
      className={`combat__ennemy__stats ${
        playerTurn ? "combat__ennemy__wait" : "combat__ennemy__play"
      }`}
    >
      <div className="combat__ennemy__stats--name">{enemyState.name}</div>
      <p>Vie : {enemyState.health}</p>
      <p>
        Atk : {Math.trunc(enemyState.attack * enemyState.accuracy)} ~{" "}
        {enemyState.attack}
      </p>
      <p>Def : {enemyState.defense}</p>
    </div>
  </div>
);
export default CombatStats;
