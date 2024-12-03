import { createContext, useEffect, useState } from "react";

export const PlayerContext = createContext();
/**
 * choiceSaved :
 * Certains choix sauvegardé pour ne pas qu'ils réapparaissent en cours de jeu
 */
const initialPlayerData = {
  stats: {
    maxHealth: 100,
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
  inventory: [
    "Nunchaku en acier",
    "&",
    "&",
    "Trèfle à quatre feuilles",
    "&",
    "",
  ],
  choiceSaved: []
};

const initialPlayerStatsEquipped = {
  maxHealth: 0,
  health: 0,
  attack: 0,
  defense: 0,
  chance: 0,
  accuracy: 0,
  initiative: 0,
};

export const PlayerProvider = ({ children }) => {
  const [playerStatsEquipped, setPlayerStatsEquipped] = useState(() => {
    const savedPlayerStatsEquipped = localStorage.getItem(
      "playerStatsEquipped"
    );
    return savedPlayerStatsEquipped
      ? JSON.parse(savedPlayerStatsEquipped)
      : initialPlayerStatsEquipped;
  });

  const [playerStats, setPlayerStats] = useState(() => {
    try {
      const savedPlayerData = localStorage.getItem("playerData");
      return savedPlayerData ? JSON.parse(savedPlayerData) : initialPlayerData;
    } catch (err) {
      console.error("Erreur lors du chargement des données : ", err);
      return initialPlayerData;
    }
  });

  const [playerStatsFull, setPlayerStatsFull] = useState(null);

  const addStats = (currentStats, statsToAdd) => {
    const combinedStats = {};

    //Parcoure les clés de currentStats (playerStats...)
    for (const key in currentStats) {
      if (statsToAdd[key] !== undefined) {
        combinedStats[key] = currentStats[key] + statsToAdd[key];
      } else {
        combinedStats[key] = currentStats[key];
      }
    }
    //Si statsToAdd a des stats que currentStats n'a pas, les ajouter
    for (const key in statsToAdd) {
      if (combinedStats[key] === undefined) {
        combinedStats[key] = statsToAdd[key];
      }
    }
    return combinedStats;
  };

  useEffect(() => {
    localStorage.setItem("playerData", JSON.stringify(playerStats));
  }, [playerStats]);

  useEffect(() => {
    localStorage.setItem(
      "playerStatsEquipped",
      JSON.stringify(playerStatsEquipped)
    );
  }, [playerStatsEquipped]);

  //Update les stats dans playerStatsFull
  useEffect(() => {
    const combinedStats = addStats(playerStats.stats, playerStatsEquipped);
    setPlayerStatsFull(combinedStats);
  }, [playerStats, playerStatsEquipped]);

  const resetPlayerData = () => {
    localStorage.clear();
    setPlayerStats(initialPlayerData);
    setPlayerStatsEquipped(initialPlayerStatsEquipped);
  };

  const insertItemToInventory = (item) => {};

  return (
    <PlayerContext.Provider
      value={{
        playerStats,
        setPlayerStats,
        resetPlayerData,
        playerStatsEquipped,
        setPlayerStatsEquipped,
        playerStatsFull,
        setPlayerStatsFull,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};
