import React from 'react';
import adventureData from '../data/adventureData';

function DungeonMap({ currentRoom }) {
  return (
    <div className="p-4 bg-gray-900 text-white rounded shadow-lg">
      <h2 className="text-lg font-bold mb-4">Plan du donjon</h2>
      <div className="grid grid-cols-5 gap-2">
        {Object.entries(adventureData).map(([room, data]) => (
          <div
            key={room}
            className={`p-2 text-center rounded ${
              currentRoom === room ? 'bg-green-500' : 'bg-gray-700'
            }`}
            title={data.text} // Affiche la description de la salle au survol
          >
            {room}
          </div>
        ))}
      </div>
    </div>
  );
}

export default DungeonMap;
