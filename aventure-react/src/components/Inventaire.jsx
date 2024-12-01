import React, { useContext, useEffect, useState } from "react";
import itemsData from "../data/itemsData";
import { PlayerContext } from "../utils/Context";

const Inventaire = () => {
    const [playerName, setPlayerName] = useState(() => {
        const savedPlayerName = localStorage.getItem("playerName");
        return savedPlayerName ? savedPlayerName : "John Doe";
    });
    const {playerStats, setPlayerStats} = useContext(PlayerContext);

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
    },[playerStats])

  return (
    <div className="inventory">
      <h1>{playerName}</h1>
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
