import { useState, useEffect } from 'react';
import enemiesData from '../data/enemiesData';
import { savePlayerData } from '../utils/playerData';

function Battle({ enemyType, onBattleEnd }) {
  const [player, setPlayer] = useState(JSON.parse(localStorage.getItem('playerData')));
  const [enemy, setEnemy] = useState(enemiesData[enemyType]);
  const [battleLog, setBattleLog] = useState([]);

  const attackEnemy = () => {
    const playerDamage = Math.max(player.stats.attack - enemy.defense, 1);
    const enemyDamage = Math.max(enemy.attack - player.stats.defense, 1);

    // Mise à jour des états
    setEnemy((prev) => ({ ...prev, health: prev.health - playerDamage }));
    setPlayer((prev) => {
      const updatedPlayer = {
        ...prev,
        stats: { ...prev.stats, health: prev.stats.health - enemyDamage },
      };
      savePlayerData(updatedPlayer);
      return updatedPlayer;
    });

    // Ajouter les événements au journal
    setBattleLog((prev) => [
      ...prev,
      `Vous infligez ${playerDamage} dégâts à ${enemy.name}.`,
      `${enemy.name} vous inflige ${enemyDamage} dégâts.`,
    ]);
  };

  useEffect(() => {
    // Vérifie si le combat est terminé
    if (enemy.health <= 0) {
      setBattleLog((prev) => [...prev, `${enemy.name} est vaincu !`]);
      onBattleEnd('victory');
    } else if (player.stats.health <= 0) {
      setBattleLog((prev) => [...prev, `Vous êtes vaincu par ${enemy.name}...`]);
      onBattleEnd('defeat');
    }
  }, [enemy.health, player.stats.health]);

  return (
    <div className="bg-red-800 text-white p-4 rounded shadow-lg">
      <h2 className="text-lg font-bold mb-4">Combat : {enemy.name}</h2>
      <p><strong>Vie de l'ennemi :</strong> {enemy.health}</p>
      <p><strong>Votre vie :</strong> {player.stats.health}</p>

      <button
        onClick={attackEnemy}
        className="px-4 py-2 bg-yellow-500 rounded hover:bg-yellow-600 transition mt-4"
      >
        Attaquer
      </button>

      <div className="mt-4">
        <h3 className="font-bold">Journal de combat</h3>
        <ul className="list-disc pl-6">
          {battleLog.map((log, index) => (
            <li key={index}>{log}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Battle;
