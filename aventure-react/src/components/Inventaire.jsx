import React, { useContext, useEffect, useState } from "react";
import itemsData from "../data/itemsData";
import { PlayerContext } from "../utils/Context";

const Inventaire = () => {
  const [playerName, setPlayerName] = useState(() => {
    const savedPlayerName = localStorage.getItem("playerName");
    return savedPlayerName ? savedPlayerName : "John Doe";
  });
  const { playerStats, setPlayerStats } = useContext(PlayerContext);

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
    if (item !== "") setActiveItem({item, index});
  };

  /**J'AI FAIT UNE BOURDE
   * findItem fonctionne en recherchant le code HTML + le textContent.
   * Donc, lors de la recherche de l'item, il ne prend que le text entre les balises
   * IL NE FAUT DONC PAS INSERER UN TEXTE DANS CETTE FONCTION, MAIS LA LIGNE DE CODE HMTL
   */
  const findItem = (itemToFind) => {
    const itemFound = itemsData.find(
      (item) => item.name === itemToFind
    );
    return itemFound;
  };

  const handleItemEffect = () => {
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
            },
          }));
          useItem(item);
        } else {
          console.log("N'a pas pu ingérer. Chance à son max.");
        }
        break;
      default:
        break;
    }
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
      useItem(equipmentItem);
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
      const equippingItemSlot = playerStats.inventory.findIndex((item) => item === equipmentName);
      console.log("slot qui va être vidé : ", equippingItemSlot);
      
      //Une fois fait, on remove l'item du slot
      //Puis, on y insère l'actualEquippedItem
      useItem(equipmentItem);
    //   console.log("équip enlevé de l'inventaire.");
    playerStats.inventory[equippingItemSlot] = actualEquippedItem;
    }
  };

  const useItem = (itemUsing) => {
    setActiveItem(null);
    const itemUsingSlot = playerStats.inventory.findIndex((item) => item === itemUsing.name);
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
              {
                itemsData.find((item) => item.name === activeItem.item)
                  .desc_use
              }
            </div>
            {(findItem(activeItem.item).using === "all" ||
              findItem(activeItem.item).using === "no-combat") && (
              <button
                className="inventory__description__button"
                onClick={() => handleItemEffect(activeItem.item)}
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
