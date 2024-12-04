import React, { useContext, useEffect } from "react";
import itemsData from "../data/itemsData";
import { PlayerContext } from "../utils/Context";

const SortInventory = ({ itemFound }) => {
  const { playerStats, setPlayerStats, findItem } = useContext(PlayerContext);

  useEffect(() => {
    document.body.classList.add("no-interaction");
    return () => {
      document.body.classList.remove("no-interaction");
    };
  }, []);

  return (
    <div className="sortInv">
      <div className="sortInv__overlay"></div>
      <div className="sortInv__content">
        INVENTAIRE A SORT
        <p>{findItem(null, itemFound).name}</p>
      </div>
    </div>
  );
};

export default SortInventory;
