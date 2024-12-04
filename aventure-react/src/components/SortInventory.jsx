import React, { useContext } from "react";
import itemsData from "../data/itemsData";
import { PlayerContext } from "../utils/Context";

const SortInventory = ({ itemFound }) => {
  const { playerStats, setPlayerStats, findItem } = useContext(PlayerContext);

  return (
    <div className="sortInv">
      INVENTAIRE A SORT
      {findItem(null, itemFound).name}
    </div>
  );
};

export default SortInventory;
