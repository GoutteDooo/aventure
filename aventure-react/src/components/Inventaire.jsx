import React, { act, useEffect, useState } from "react";
import itemsData from "../data/itemsData";

const Inventaire = () => {
  const [inventaire, setInventaire] = useState(() => {
    const savedInventory = localStorage.getItem("playerData.inventory");
    return savedInventory
      ? JSON.parse(savedInventory)
      : ["Sandwich à l'ail", "Potion de santé", "Orbe de feu", "Trèfle à quatre feuilles", "", ""];
  });
  const [playerStats, setPlayerStats] = useState(() => {
    const savedPlayerStats = localStorage.getItem("playerData");
    return savedPlayerStats ? JSON.parse(savedPlayerStats) : console.log("erreur lors de la requête des données du joueur.");
  })

  const [activeItem, setActiveItem] = useState(null);
  
  const handleItemActive = (targettedItem) => {
    if (targettedItem.textContent != "") {
        const itemClicked = targettedItem;
        setActiveItem(itemClicked);
    }
  }

  const findItem = (itemHTML) => {
    const itemFound = itemsData.find((item) => itemHTML.textContent === item.name);
    return itemFound;
  }

  const handleItemEffect = (itemHTML) => {
    const item = findItem(itemHTML);
    switch (item.effect) {
        case "heal":
            if (playerStats.stats.health < playerStats.stats.maxHealth){
                setPlayerStats((prevStats) => ({
                    ...prevStats,
                    stats: {
                        ...prevStats.stats,
                        health: (prevStats.health + item.value) > prevStats.maxHealth ? prevStats.maxHealth : prevStats.health + item.value,
                    }
                }))
                useItem(itemHTML.textContent);
            } else {
                console.log("non");
                
            }
            break;
        case "stats:chance":
            if (playerStats.stats.chance < 1) {
                setPlayerStats((prevStats) => ({
                    ...prevStats,
                    stats: {
                        ...prevStats.stats,
                        chance: prevStats.stats.chance + item.value / 100,
                    }
                }));
                console.log("chance : ", playerStats.stats.chance);
                useItem(itemHTML.textContent);
            } else {
                console.log("N'a pas pu ingérer. Chance à son max.");
            }
                break;
        default:
            break;
    }
  }

  const useItem = (itemUsing) => {
    setActiveItem(null);
    setInventaire((prevInventaire) => {
         const updatedInventory = prevInventaire.map((item) => item === itemUsing ? "" : item
        );
        console.log("inventaire après filtre :", updatedInventory);
        return updatedInventory;
    });

  }

  //Permet de mettre à jour les stats du joueur lorsqu'il change d'items, ou en ingère par exemple.
useEffect(() => {
    localStorage.setItem("playerData",JSON.stringify(playerStats));
},[playerStats])

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
                    {(findItem(activeItem).using === "all" || findItem(activeItem).using === "no-combat") && (
                        <button className="inventory__description__button" onClick={() => handleItemEffect(activeItem)}>Utiliser</button>
                    )}
                </>
            )}
        </div>
    </div>
  );
};

export default Inventaire;
