import { useState } from 'react';
import adventureData from '../data/adventureData';
import Battle from './Battle';
import { savePlayerData } from '../utils/playerData';

function AdventurePage() {
  const [currentPage, setCurrentPage] = useState('start');
  const [player, setPlayer] = useState(JSON.parse(localStorage.getItem('playerData')));
  const [inBattle, setInBattle] = useState(false);
  const [enemy, setEnemy] = useState(null);

  const handleChoice = (choice) => {
    if (choice.enemy) {
      setInBattle(true);
      setEnemy(choice.enemy);
    } else {
      setCurrentPage(choice.next);
    }
  };

  const handleBattleEnd = (result) => {
    setInBattle(false);
    setEnemy(null);
  
    if (result === 'victory') {
      setCurrentPage('start'); // Ou une autre page
    } else if (result === 'defeat') {
      alert("Vous êtes mort ! Recommencez l'aventure.");
      localStorage.removeItem('playerData');
      window.location.reload();
    } else if (result === 'fled') {
      setCurrentPage('start'); // Retourne à une page sécurisée
    }
  };
  

  if (inBattle && enemy) {
    return <Battle enemyType={enemy} onBattleEnd={handleBattleEnd} />;
  }

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
