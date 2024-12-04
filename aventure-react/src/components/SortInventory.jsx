import React, { useContext, useEffect, useState } from "react";
import itemsData from "../data/itemsData";
import { PlayerContext } from "../utils/Context";

const SortInventory = ({ itemFound, setSortInventory, setShowPopUp }) => {
  const { playerStats, setPlayerStats, findItem } = useContext(PlayerContext);
  const [activeItem, setActiveItem] = useState(null);
  useEffect(() => {
    document.body.classList.add("no-interaction");
    return () => {
      document.body.classList.remove("no-interaction");
    };
  }, []);
  const [currentItemIdFound, setCurrentItemIdFound] = useState(itemFound);

  const handleClose = () => {
    setSortInventory(false);
    setShowPopUp(false);
  }

  const handleExchange = () => {
    //Détecter l'index de activeItem
    const indexToReplace = activeItem.index;
    
    //Enregistrer l'item à remplacer, et y mettre le trouvé à la place
    const itemToReplace = activeItem;
    playerStats.inventory[indexToReplace] = findItem(null, currentItemIdFound).name;

    //Remplacer le nouvel item à droite par l'item de l'inventaire enregisté
    setCurrentItemIdFound(findItem(itemToReplace.item).id);
    setActiveItem(null)
  }

  const handleActiveItem = (item, index) => {
    if (item !== "") setActiveItem({ item, index });
    
  }


  return (
    <div className="sortInv">
      <div className="sortInv__content">
        <div className="sortInv__content__inventory">
          {playerStats.inventory &&
            playerStats.inventory.map((item, index) => (
            <div
              key={index}
              className={`inventory__container__item 
                    ${item ? "inventory__container__item--active" : ""}
                    ${
                      activeItem && activeItem.index === index
                        ? "inventory__container__item--selected"
                        : ""
                    } 
                    `}
              onClick={() => handleActiveItem(item, index)}
            >
              {item}
            </div>
          ))}
          </div>
        <div className="sortInv__content__itemDesc">
          <div className="sortInv__content__itemDesc__name">
            {activeItem && activeItem.item}
          </div>
          <div className="sortInv__content__itemDesc__useless">
            {activeItem && findItem(activeItem.item).desc_useless}

          </div>
          <div className="sortInv__content__itemDesc__use">
            {activeItem && findItem(activeItem.item).desc_use}
            {activeItem && findItem(activeItem.item).using === "all" && 
            <button className="sortInv__content__itemDesc__use__button">Utiliser</button>
            }
          </div>
        </div>
        <div className="sortInv__content__itemFound">
          <div className="sortInv__content__itemFound__name">
            <div
              className={`inventory__container__item inventory__container__item--selected`}
              onClick={() => handleItemActive(item, index)}
            >
              {findItem(null, currentItemIdFound).name}
            </div>
          </div>
          <div className="sortInv__content__itemFound__desc">
            <div className="sortInv__content__itemFound__desc__useless">
              {findItem(null, currentItemIdFound).desc_useless}
            </div>
            <div className="sortInv__content__itemFound__desc__use">
              {findItem(null, currentItemIdFound).desc_use}
            </div>
          </div>
        </div>
      </div>
      {activeItem && 
      <button className="sortInv__exchange" onClick={handleExchange}>Echanger</button>
    }
      <button className="sortInv__finish" onClick={handleClose}>Terminer</button>
    </div>
  );
};

export default SortInventory;
