import React, { act, useEffect, useState } from "react";
import itemsData from "../data/itemsData";

const Inventaire = () => {
  const [playerStats, setPlayerStats] = useState(() => {
    const savedPlayerData = localStorage.getItem("playerData");
    return savedPlayerData ? JSON.parse(savedPlayerData) : {
        name: "John Doe",
        stats: {
            maxHealth:100,
            health: 90,
            attack: 10,
            defense: 0,
            chance: 0.1,
            accuracy: 0.5,
            initiative: 10,
        },
        equipment: {
            hat: "Chapeau de paille",
            outfit: "Tenue de paysan",
            weapon: "Bâton en bois",
        },
        inventory: ["Sandwich à l'ail", "Potion de santé", "Orbe de feu", "Trèfle à quatre feuilles", "", ""],
        }
    });

    const inventaire = playerStats.inventory;
    const setInventaire = (update) => {
        setPlayerStats((prevStats) => {
            const newInventory = typeof update === "function" ? update(prevStats.inventory) : update;
            return {
                ...prevStats,
                inventory: newInventory,
            }
        });
    };
    

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
                      health: Math.min(prevStats.stats.health + item.value, prevStats.stats.maxHealth),
                    },
                  }));
                  
                console.log('heal used ! inventaire : ', inventaire);
                useItem(item);
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
                useItem(item);
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
    setInventaire((prevInventaire) => prevInventaire.map((it) => it === itemUsing.name ? "" : it))
  }
  
  //Permet de mettre à jour les stats du joueur lorsqu'il change d'items, ou en ingère par exemple.
    useEffect(() => {
        localStorage.setItem("playerData",JSON.stringify(playerStats));
        console.log(inventaire);
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
