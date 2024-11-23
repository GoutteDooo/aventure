import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [playerName, setPlayerName] = useState('');
  const navigate = useNavigate();

  const handleStart = () => {
    if (playerName.trim()) {
      // Sauvegarde le nom dans le localStorage
      localStorage.setItem('playerName', playerName);
      // Redirige vers la page suivante
      navigate('/adventure');
    } else {
      alert('Veuillez entrer un nom avant de commencer l’aventure !');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-800 text-white">
      <h1 className="text-4xl font-bold mb-6">Quel est votre nom, cher aventurier ?</h1>
      <input
        type="text"
        placeholder="Votre nom"
        className="mb-4 p-2 rounded border border-gray-500 text-gray-900"
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
      />
      <button
        onClick={handleStart}
        className="px-6 py-2 bg-blue-600 rounded hover:bg-blue-700 transition"
      > Commencer l&apos;aventure</button>
    </div>
  );
}

export default Home;
