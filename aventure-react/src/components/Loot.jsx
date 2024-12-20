import React from "react";

const Loot = ({ loots, gain, onClose }) => {
  return (
    <div className="bg__loots">
      <div className="loots">
        <div className="loots__infos">
          <div className="loots__drop">
            <h1>Trouvailles :</h1>
            <ul>
              {loots.map((loot, index) => (
                <li key={index}>{loot}</li>
              ))}
            </ul>
          </div>
          <div className="loots__gain">
            <h1>Gains :</h1>
            <ul>
              {Object.entries(gain).map(([key, {value, description}], index) => (
                <li key={index}>
                  {description} : {value}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <button className="loots__next" onClick={onClose}>
            Etape suivante
        </button>
      </div>
    </div>
  );
};

export default Loot;
