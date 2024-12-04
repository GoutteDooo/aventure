import React, { useContext, useEffect } from "react";
import itemsData from "../data/itemsData";
import { PlayerContext } from "../utils/Context";

const SortInventory = ({ itemFound, setSortInventory }) => {
  const { playerStats, setPlayerStats, findItem } = useContext(PlayerContext);

  useEffect(() => {
    document.body.classList.add("no-interaction");
    return () => {
      document.body.classList.remove("no-interaction");
    };
  }, []);

  const handleClose = () => {
    setSortInventory(false);
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
                    `}
              onClick={() => handleItemActive(item, index)}
            >
              {item}
            </div>
          ))}
          </div>
        <div className="sortInv__content__itemDesc">item desc</div>
        <div className="sortInv__content__itemFound">
          <div className="sortInv__content__itemFound__name">
            <div
              className={`inventory__container__item inventory__container__item--selected`}
              onClick={() => handleItemActive(item, index)}
            >
              {findItem(null, itemFound).name}
            </div>
          </div>
          <div className="sortInv__content__itemFound__desc">
            <div className="sortInv__content__itemFound__desc__useless">
              {findItem(null, itemFound).desc_useless}
            </div>
            <div className="sortInv__content__itemFound__desc__use">
              {findItem(null, itemFound).desc_use}
            </div>
          </div>
        </div>
      </div>
      <button className="sortInv__finish" onClick={handleClose}>Valider</button>
    </div>
  );
};

export default SortInventory;
