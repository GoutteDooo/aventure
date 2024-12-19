import React, { useContext, useEffect, useState } from "react";
import itemsData from "../data/itemsData";
import { PlayerContext } from "../utils/Context";

const SortInventory = ({ itemFound, setSortInventory, setShowPopUp }) => {
  const { playerStats, setPlayerStats, findItem, useItem, insertItem } =
    useContext(PlayerContext);
  const [activeItem, setActiveItem] = useState(null);
  useEffect(() => {
    document.body.classList.add("no-interaction");
    return () => {
      document.body.classList.remove("no-interaction");
    };
  }, []);
  const [currentItemIdFound, setCurrentItemIdFound] = useState(itemFound);

  const handleClose = () => {
    if (confirm("Etes-vous sûr de confirmer ces changements ?")) {
      setSortInventory(false);
      setShowPopUp(false);
    }
  };

  const handleExchange = () => {
    //Détecter l'index de activeItem
    const indexToReplace = activeItem.index;

    //Enregistrer l'item à remplacer, et y mettre le trouvé à la place
    const itemToReplace = activeItem;
    playerStats.inventory[indexToReplace] = findItem(
      null,
      currentItemIdFound
    ).name;

    //Remplacer le nouvel item à droite par l'item de l'inventaire enregisté
    setCurrentItemIdFound(findItem(itemToReplace.item).id);
    setActiveItem(null);
  };

  const handleActiveItem = (item, index) => {
    if (item !== "") setActiveItem({ item, index });
  };

  const handleItemUsed = () => {
    if (
      confirm(
        "Êtes-vous sûr d'utiliser cet item ? (Le nouvel objet trouvé ira directement au nouvel emplacement libre)"
      )
    ) {
      useItem(findItem(activeItem.item), activeItem.index);
      insertItem(currentItemIdFound, activeItem.index);
      setActiveItem(null);
      setShowPopUp(false);
      setSortInventory(false);
    }
  };

  /**
   *
   * @param {string} itemName
   * Dommage, mais comme activeItem est une string, je dois passer par là
   * Lorsque viendra la refactorisation, je referais peut-être ça
   */
  /*
  const useItem = () => {
    if (!activeItem) return; //sécurité

    const item = findItem(activeItem.item);
    switch (item.effect) {
      case "heal":
        if (playerStats.stats.health < playerStats.stats.maxHealth) {
          setPlayerStats((prevStats) => ({
            ...prevStats,
            stats: {
              ...prevStats.stats,
              health: Math.min(
                prevStats.stats.health + item.value,
                prevStats.stats.maxHealth
              ),
            },
          }));
          removeItem(item);
        } else {
          console.log("N'a pas pu utiliser l'item. Santé déjà au max.");
        }
        break;

      case "chance":
        setPlayerStats((prevStats) => ({
          ...prevStats,
          stats: {
            ...prevStats.stats,
            chance: prevStats.stats.chance + item.value / 100,
          },
        }));
        removeItem(item);
        break;
      default:
        break;
    }
  };
*/
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
          <div
            className={`sortInv__content__itemDesc__use ${
              activeItem &&
              itemsData.find((item) => item.name === activeItem.item).desc_class
            }`}
          >
            {activeItem && findItem(activeItem.item).desc_use}
            {activeItem && findItem(activeItem.item).using === "all" && (
              <button
                className="sortInv__content__itemDesc__use__button"
                onClick={handleItemUsed}
              >
                Utiliser
              </button>
            )}
          </div>
        </div>
        <div className="sortInv__content__itemFound">
          <div className="sortInv__content__itemFound__name">
            <div
              className={`inventory__container__item inventory__container__item--selected`}
            >
              {findItem(null, currentItemIdFound).name}
            </div>
          </div>
          <div className="sortInv__content__itemFound__desc">
            <div className="sortInv__content__itemFound__desc__useless">
              {findItem(null, currentItemIdFound).desc_useless}
            </div>
            <div
              className={`sortInv__content__itemFound__desc__use ${
                activeItem &&
                itemsData.find((item) => item.name === activeItem.item)
                  .desc_class
              }`}
            >
              {findItem(null, currentItemIdFound).desc_use}
            </div>
          </div>
        </div>
      </div>
      {activeItem && (
        <button className="sortInv__exchange" onClick={handleExchange}>
          Echanger
        </button>
      )}
      <button className="sortInv__finish" onClick={handleClose}>
        Terminer
      </button>
    </div>
  );
};

export default SortInventory;
