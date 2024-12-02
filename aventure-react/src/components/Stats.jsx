import React, { useContext, useEffect, useState } from "react";
import { PlayerContext } from "../utils/Context";
import itemsData from "../data/itemsData";

const Stats = () => {
  const {
    playerStats,
    setPlayerStats,
    playerStatsEquipped,
    setPlayerStatsEquipped,
    playerStatsFull,
    setPlayerStatsFull,
  } = useContext(PlayerContext);
  const [equipmentActive, setEquipmentActive] = useState("");

  const applyEquipmentEffects = () => {
    //Réinitialiser les stats avant d'appliquer les effets
    let updatedStats = { ...playerStatsFull };

    //Trouver l'item correspondant à l'équipement équipé
    Object.values(playerStats.equipment).forEach((equipmentName) => {
      const equip = itemsData.find((item) => item.name === equipmentName);
      if (equip && equip.effect) {
        updatedStats[equip.effect] += equip.value;
      }
    });

    console.log(playerStatsFull);

    //Appliquer les effets de chaque équipement
    setPlayerStats((prevStats) => ({
      ...prevStats,
      stats: prevStats.stats,
    }));
  };

  useEffect(() => {
    applyEquipmentEffects();
  }, [playerStats.equipment]);

  const convertKey = (key) => {
    const translations = {
      maxHealth: "Santé max",
      health: "Santé actuelle",
      attack: "Attaque max",
      defense: "Défense",
      chance: "Chance",
      accuracy: "Précision",
      initiative: "Initiative",
    };
    return translations[key] || key;
  };

  const convertStat = (key, stat) => {
    if (["chance", "accuracy"].includes(key)) {
      return stat * 100;
    }
    return stat;
  };

  const handleEquipmentActive = (selectedEquipment) => {
    setEquipmentActive(selectedEquipment);
  };

  useEffect(() => {
    localStorage.setItem("playerData", JSON.stringify(playerStats));
  }, [playerStats]);

  return (
    <div className="stats">
      <div className="stats__container">
        <table>
          <thead>
            <tr>
              <th>Statistiques</th>
              <th>Valeurs</th>
            </tr>
          </thead>
          <tbody>
            {playerStats &&
              Object.entries(playerStats.stats).map(([key, value], index) => (
                <tr key={index}>
                  <td>{convertKey(key)}</td>
                  <td>{Math.trunc(convertStat(key, value))}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div className="stats__equipment">
        <div className="stats__equipment__container">
          <div
            className={`stats__equipment__container__hat ${
              equipmentActive === playerStats.equipment.hat
                ? "stats__equipment__container__hat--selected"
                : ""
            }`}
            onClick={(e) => handleEquipmentActive(e.target.textContent)}
          >
            <p>{playerStats.equipment.hat}</p>
          </div>
          <div
            className={`stats__equipment__container__outfit ${
              equipmentActive === playerStats.equipment.outfit
                ? "stats__equipment__container__hat--selected"
                : ""
            }`}
            onClick={(e) => handleEquipmentActive(e.target.textContent)}
          >
            <p>{playerStats.equipment.outfit}</p>
          </div>
          <div
            className={`stats__equipment__container__weapon ${
              equipmentActive === playerStats.equipment.weapon
                ? "stats__equipment__container__hat--selected"
                : ""
            }`}
            onClick={(e) => handleEquipmentActive(e.target.textContent)}
          >
            <p>{playerStats.equipment.weapon}</p>
          </div>
        </div>
        <div className="stats__equipment__description">
          <div className="stats__equipment__description--container">
            {equipmentActive && (
              <>
                <div className="equipment__active__name">{equipmentActive}</div>
                <div className="equipment__active__desc">
                  {
                    itemsData.find((item) => item.name === equipmentActive)
                      .desc_useless
                  }{" "}
                </div>
                <div className="equipment__active__effect">
                  {
                    itemsData.find((item) => item.name === equipmentActive)
                      .desc_use
                  }
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
