import { createContext, useEffect, useState } from "react";

export const PlayerContext = createContext();

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
    outfit: "",
    weapon: "Bâton en bois",
  },
  inventory: [
    "Sandwich à l'ail",
    "Potion de santé",
    "Orbe de feu",
    "Trèfle à quatre feuilles",
    "Tenue de paysan",
    "",
  ],
};

const initialPlayerStatsEquipped = {
  stats: {
    maxHealth: 0,
    attack: 0,
    defense: 0,
    chance: 0,
    accuracy: 0,
    initiative: 0,
  },
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

  useEffect(() => {
    localStorage.setItem("playerData", JSON.stringify(playerStats));
  }, [playerStats]);

  useEffect(() => {
    localStorage.setItem(
      "playerStatsEquipped",
      JSON.stringify(playerStatsEquipped)
    );
  }, [playerStatsEquipped]);

  const resetPlayerData = () => {
    localStorage.clear();
    setPlayerStats(initialPlayerData);
    setPlayerStatsEquipped(initialPlayerStatsEquipped);
  };

  return (
    <PlayerContext.Provider
      value={{
        playerStats,
        setPlayerStats,
        resetPlayerData,
        playerStatsEquipped,
        setPlayerStatsEquipped,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};
