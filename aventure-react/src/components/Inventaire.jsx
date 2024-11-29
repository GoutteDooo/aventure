import React, { useState } from "react";

const Inventaire = () => {
  const [inventaire, setInventaire] = useState(() => {
    const savedInventory = localStorage.getItem("inventory");
    return savedInventory
      ? JSON.parse(savedInventory)
      : ["", "", "", "", "", ""];
  });

  return (
    <div className="inventory">
      <div className="inventory__container">
        {inventaire &&
          inventaire.map((item, index) => (
            <div key={index} className="inventory__container__item">
              {item}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Inventaire;
