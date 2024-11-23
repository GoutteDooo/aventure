import React, { useState, useEffect } from 'react';
import { initializePlayer } from '../utils/playerData';

function HUD() {
  const [player, setPlayer] = useState(initializePlayer());
  const [isVisible, setIsVisible] = useState(false); // state pour display/hide le HUD

  useEffect(() => {
    // Si les données du joueur changent, on les met à jour dans le localStorage
    localStorage.setItem('playerData', JSON.stringify(player));
  }, [player]);

  return (
    <>
    {/*Bouton pour open/close le panneau*/}
    <button onClick={() => setIsVisible(!isVisible)} className="fixed top-4 left-4 z-50 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
      {isVisible ? 'Fermer Stats' : 'Afficher Stats'}
    </button>

    {/* Panneau HUD */}
    <div
        className={`fixed top-0 left-0 h-full bg-gray-800 text-white shadow-lg transform ${
          isVisible ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 w-64 p-4 pt-16`}
      >
      <h2 className="text-lg font-bold mb-2">Statistiques</h2>
      <p><strong>Nom :</strong> {player.name}</p>
      <p><strong>Vie :</strong> {player.stats.health}</p>
      <p><strong>Attaque :</strong> {player.stats.attack}</p>
      <p><strong>Défense :</strong> {player.stats.defense}</p>
      <p><strong>Précision :</strong> {Math.round(player.stats.accuracy * 100)}%</p>

      <h3 className="mt-4 font-bold">Équipement</h3>
      <p><strong>Chapeau :</strong> {player.equipment.hat}</p>
      <p><strong>Tenue :</strong> {player.equipment.outfit}</p>
      <p><strong>Arme :</strong> {player.equipment.weapon}</p>

      <h3 className="mt-4 font-bold">Inventaire</h3>
      {player.inventory.length === 0 ? (
        <p>Aucun objet</p>
      ) : (
        <ul>
          {player.inventory.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      )}
    </div>
      </>
  );
}

export default HUD;
