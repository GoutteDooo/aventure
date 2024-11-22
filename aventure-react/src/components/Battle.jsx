import { useState, useEffect } from 'react';
import enemiesData from '../data/enemiesData';
import { savePlayerData } from '../utils/playerData';

function Battle({ enemyType, onBattleEnd }) {
  const [player, setPlayer] = useState(JSON.parse(localStorage.getItem('playerData')));
  const [enemy, setEnemy] = useState(enemiesData[enemyType]);
  const [battleLog, setBattleLog] = useState([]);
  const [defending, setDefending] = useState(false);

  const attackEnemy = () => {
    const enemyDefending = Math.random() < 0.3; // 30% de chance que l'adversaire se défende
  
    if (enemyDefending) {
      setBattleLog((prev) => [
        ...prev,
        `${enemy.name} se met en position défensive et réduit les dégâts !`,
      ]);
  
      // Réduction des dégâts infligés
      const playerDamage = Math.max(Math.floor((player.stats.attack - enemy.defense) / 2), 1);
      setEnemy((prev) => ({ ...prev, health: prev.health - playerDamage }));
  
      setBattleLog((prev) => [
        ...prev,
        `Vous infligez ${playerDamage} dégâts réduits à ${enemy.name}.`,
      ]);
    } else {
      const playerDamage = Math.max(player.stats.attack - enemy.defense, 1);
      setEnemy((prev) => ({ ...prev, health: prev.health - playerDamage }));
  
      setBattleLog((prev) => [
        ...prev,
        `Vous infligez ${playerDamage} dégâts à ${enemy.name}.`,
      ]);
    }
  
    // L'adversaire riposte (s'il n'est pas vaincu)
    if (enemy.health > 0) {
      const enemyDamage = Math.max(enemy.attack - player.stats.defense, 1);
      setPlayer((prev) => {
        const updatedPlayer = {
          ...prev,
          stats: { ...prev.stats, health: prev.stats.health - enemyDamage },
        };
        savePlayerData(updatedPlayer);
        return updatedPlayer;
      });
      setBattleLog((prev) => [
        ...prev,
        `${enemy.name} vous inflige ${enemyDamage} dégâts en retour.`,
      ]);
    }
  };
  

  const defend = () => {
    const enemyAttack = enemy.attack;
    const playerDefense = player.stats.defense;
  
    if (enemyAttack <= playerDefense) {
      setBattleLog((prev) => [...prev, `${enemy.name} tente une attaque, mais échoue contre votre défense !`]);
    } else {
      const damage = Math.ceil((enemyAttack - playerDefense) / 2); // Moitié de la différence
      setPlayer((prev) => {
        const updatedPlayer = {
          ...prev,
          stats: { ...prev.stats, health: prev.stats.health - damage },
        };
        savePlayerData(updatedPlayer);
        return updatedPlayer;
      });
      setBattleLog((prev) => [
        ...prev,
        `${enemy.name} vous attaque malgré votre défense et inflige ${damage} dégâts.`,
      ]);
    }
  
    setDefending(true); // Maintient l’état défensif pour ce tour
  };
  

  const useItem = () => {
    if (player.inventory.length === 0) {
      setBattleLog((prev) => [...prev, "Vous n'avez aucun objet à utiliser."]);
      return;
    }

    const item = player.inventory[0]; // Utilise le premier objet
    setBattleLog((prev) => [...prev, `Vous utilisez ${item}.`]);

    if (item === 'Potion de soin') {
      setPlayer((prev) => {
        const updatedPlayer = {
          ...prev,
          stats: { ...prev.stats, health: prev.stats.health + 20 },
          inventory: prev.inventory.slice(1), // Retire l'objet utilisé
        };
        savePlayerData(updatedPlayer);
        return updatedPlayer;
      });
    }
  };

  const flee = () => {
    const success = Math.random() > 0.5; // 50% de chance de fuir
    if (success) {
      setBattleLog((prev) => [...prev, 'Vous avez réussi à fuir !']);
      onBattleEnd('fled');
    } else {
      setBattleLog((prev) => [...prev, `${enemy.name} vous empêche de fuir !`]);
    }
  };

  useEffect(() => {
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

      <div className="mt-4 flex gap-4">
        <button
          onClick={attackEnemy}
          className="px-4 py-2 bg-yellow-500 rounded hover:bg-yellow-600 transition"
        >
          Attaquer
        </button>
        <button
          onClick={defend}
          className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-600 transition"
        >
          Défendre
        </button>
        <button
          onClick={useItem}
          className="px-4 py-2 bg-green-500 rounded hover:bg-green-600 transition"
        >
          Utiliser un objet
        </button>
        <button
          onClick={flee}
          className="px-4 py-2 bg-gray-500 rounded hover:bg-gray-600 transition"
        >
          Fuir
        </button>
      </div>

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
