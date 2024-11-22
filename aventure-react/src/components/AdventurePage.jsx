import { useState } from 'react';
import adventureData from '../data/adventureData';
import { savePlayerData } from '../utils/playerData';

function AdventurePage() {
  const [currentPage, setCurrentPage] = useState('start');
  const [player, setPlayer] = useState(JSON.parse(localStorage.getItem('playerData')));

  const handleChoice = (choice) => {
    // Applique les effets du choix, s'il y en a
    if (choice.effect) {
      const updatedPlayer = { ...player };

      // Ajout d’un objet à l’inventaire
      if (choice.effect.inventory) {
        updatedPlayer.inventory.push(choice.effect.inventory);
      }

      // Modification de la vie
      if (choice.effect.health) {
        updatedPlayer.stats.health += choice.effect.health;
      }

      setPlayer(updatedPlayer);
      savePlayerData(updatedPlayer);
    }

    // Passe à la page suivante
    setCurrentPage(choice.next);
  };

  const pageData = adventureData[currentPage];

  return (
    <div className="p-4 bg-gray-800 text-white rounded shadow-lg">
      <p className="mb-4">{pageData.text}</p>
      <div className="flex flex-col gap-2">
        {pageData.choices.map((choice, index) => (
          <button
            key={index}
            className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 transition"
            onClick={() => handleChoice(choice)}
          >
            {choice.text}
          </button>
        ))}
      </div>
    </div>
  );
}

export default AdventurePage;
