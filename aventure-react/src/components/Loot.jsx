import React from "react";

const Loot = ({ loots, onClose }) => {
  return (
    <div className="bg__loots">
      <div className="loots">
        <div className="loots__drop">
          <h1>Récupéré : </h1>
          <ul>
            {loots.map((loot, index) => (
              <li key={index}>{loot}</li>
            ))}
          </ul>
        </div>
        <button className="loots__next" onClick={onClose}>
          Etape suivante
        </button>
      </div>
    </div>
  );
};

export default Loot;
