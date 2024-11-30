import React, { act, useState } from "react";
import itemsData from "../data/itemsData";

const Inventaire = () => {
  const [inventaire, setInventaire] = useState(() => {
    const savedInventory = localStorage.getItem("inventory");
    return savedInventory
      ? JSON.parse(savedInventory)
      : ["Sandwich à l'ail", "Potion de santé", "Orbe de feu", "", "", ""];
  });

  const [activeItem, setActiveItem] = useState(null);
  
  const handleItemActive = (targettedItem) => {
    if (targettedItem.textContent != "") {
        const itemClicked = targettedItem;
        setActiveItem(itemClicked);
    }
  }

  return (
    <div className="inventory">
      <div className="inventory__container">
        {inventaire &&
          inventaire.map((item, index) => (
            <div 
                key={index} 
                className={
                    `inventory__container__item 
                    ${item ? "inventory__container__item--active" : ""} 
                    ${activeItem && activeItem.textContent === item ? "inventory__container__item--selected" : ""}`}
                    onClick={(e) => handleItemActive(e.target)}
            >
              {item}
            </div>
          ))}
        </div>
        <div className="inventory__description">
            {activeItem && (
                <>
                    <div className="inventory__description--useless">
                        {itemsData.find((item) => item.name === activeItem.textContent).desc_useless}
                    </div>
                    <div className={`inventory__description--use ${itemsData.find((item) => item.name === activeItem.textContent).desc_class}`}>
                        {itemsData.find((item) => item.name === activeItem.textContent).desc_use}
                    </div>
                </>
            )}
        </div>
    </div>
  );
};

export default Inventaire;
