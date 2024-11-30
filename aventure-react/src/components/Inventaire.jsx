import React, { act, useState } from "react";
import itemsData from "../data/itemsData";

const Inventaire = () => {
  const [inventaire, setInventaire] = useState(() => {
    const savedInventory = localStorage.getItem("inventory");
    return savedInventory
      ? JSON.parse(savedInventory)
      : ["Sandwich à l'ail", "Potion de santé", "", "", "", ""];
  });

  const [activeItem, setActiveItem] = useState(null);
  
  const handleItemActive = (targetItemText) => {
    // const itemClicked = itemsData.find((item) => target === item.name);
    const itemClicked = targetItemText;
    setActiveItem(itemClicked);
    console.log(itemClicked);
    
    
  }

  return (
    <div className="inventory">
      <div className="inventory__container">
        {inventaire &&
          inventaire.map((item, index) => (
            <div key={index} className={`inventory__container__item ${item ? "inventory__container__item--active" : ""}`} onClick={(e) => handleItemActive(e.target.textContent)}>
              {item}
            </div>
          ))}
      </div>
      <div className="inventory__description">
        {activeItem ? (<>
            <div className="inventory__description--useless">
                {itemsData.find((item) => item.name === activeItem).desc_useless}
        </div>
            <div className="inventory__description--use">
                {itemsData.find((item) => item.name === activeItem).desc_use}
        </div>
        </>
    ) : (
    <></>
    )}
      </div>
    </div>
  );
};

export default Inventaire;
