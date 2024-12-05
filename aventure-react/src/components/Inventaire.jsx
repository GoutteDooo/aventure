import React, { useContext, useEffect, useState } from "react";
import itemsData from "../data/itemsData";
import { PlayerContext } from "../utils/Context";

const Inventaire = () => {
  const [playerName, setPlayerName] = useState(() => {
    const savedPlayerName = localStorage.getItem("playerName");
    return savedPlayerName ? savedPlayerName : "John Doe";
  });
  const { playerStats, setPlayerStats, findItem, useItem } =
    useContext(PlayerContext);

  const inventaire = playerStats.inventory;
  const setInventaire = (update) => {
    setPlayerStats((prevStats) => {
      const newInventory =
        typeof update === "function" ? update(prevStats.inventory) : update;
      return {
        ...prevStats,
        inventory: newInventory,
      };
    });
  };

  const [activeItem, setActiveItem] = useState(null);

  const handleItemActive = (item, index) => {
    if (item !== "") setActiveItem({ item, index });
  };

  const handleItemUsed = () => {
    useItem(findItem(activeItem.item), activeItem.index);
    setActiveItem(null);
  };

  const handlePutOnEquipment = (equipmentName) => {
    const equipmentItem = findItem(equipmentName);

    //sécurité
    if (!["hat", "outfit", "weapon"].includes(equipmentItem.direction)) {
      console.error("Direction d'équipement invalide", equipmentItem.direction);
      return;
    }
    //S'il y'a déjà une place dans l'équipement, échanger les équips
    if (playerStats.equipment[equipmentItem.direction] == "") {
      setPlayerStats((prevStats) => ({
        ...prevStats,
        equipment: {
          ...prevStats.equipment,
          [equipmentItem.direction]: equipmentItem.name,
        },
      }));
      removeItem(equipmentItem);
    } else {
      const actualEquippedItem = playerStats.equipment[equipmentItem.direction];
      setPlayerStats((prevStats) => ({
        ...prevStats,
        equipment: {
          ...prevStats.equipment,
          [equipmentItem.direction]: equipmentItem.name,
        },
      }));

      //Détecter dans quel slot l'item à enlever est, et l'enregistrer.
      const equippingItemSlot = playerStats.inventory.findIndex(
        (item) => item === equipmentName
      );

      //Une fois fait, on remove l'item du slot
      removeItem(equipmentItem);
      //Puis, on y insère l'actualEquippedItem
      playerStats.inventory[equippingItemSlot] = actualEquippedItem;
    }
  };

  /**
   *
   * @param {Object} itemUsing
   * enlève dans l'inventaire l'item utilisé sans activer son effet
   */
  const removeItem = (itemToRemove) => {
    setActiveItem(null);
    const itemUsingSlot = playerStats.inventory.findIndex(
      (item) => item === itemToRemove.name
    );
    playerStats.inventory[itemUsingSlot] = "";
  };

  //Permet de mettre à jour les stats du joueur lorsqu'il change d'items, ou en ingère par exemple.
  useEffect(() => {
    localStorage.setItem("playerData", JSON.stringify(playerStats));
  }, [playerStats]);

  return (
    <div className="inventory">
      <h1>{playerName}</h1>
      <div className="inventory__container">
        {inventaire &&
          inventaire.map((item, index) => (
            <div
              key={index}
              className={`inventory__container__item 
                    ${item ? "inventory__container__item--active" : ""} 
                    ${
                      activeItem && activeItem.index === index
                        ? "inventory__container__item--selected"
                        : ""
                    }`}
              onClick={() => handleItemActive(item, index)}
            >
              {item}
            </div>
          ))}
      </div>
      <div className="inventory__description">
        {activeItem && (
          <>
            <div className="inventory__description--useless">
              {
                itemsData.find((item) => item.name === activeItem.item)
                  .desc_useless
              }
            </div>
            <div
              className={`inventory__description--use ${
                itemsData.find((item) => item.name === activeItem.item)
                  .desc_class
              }`}
            >
              {itemsData.find((item) => item.name === activeItem.item).desc_use}
            </div>
            {(findItem(activeItem.item).using === "all" ||
              findItem(activeItem.item).using === "no-combat") && (
              <button
                className="inventory__description__button"
                // onClick={() => handleItemEffect(activeItem.item)}
                onClick={() => handleItemUsed()}
              >
                Utiliser
              </button>
            )}
            {findItem(activeItem.item).using === "equip" && (
              <button
                className="inventory__description__button"
                onClick={() => handlePutOnEquipment(activeItem.item)}
              >
                Equiper
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Inventaire;
