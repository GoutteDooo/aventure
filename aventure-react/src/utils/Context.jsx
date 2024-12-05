import { createContext, useEffect, useState } from "react";
import itemsData from "../data/itemsData";

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
    "Trèfle à quatre feuilles",
    "Trèfle à quatre feuilles",
    "Trèfle à quatre feuilles",
    "Trèfle à quatre feuilles",
    "Amanite tue-mouches",
  ],
  choiceSaved: [],
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

  /**
   * Recherche un item dans les données d'items par son nom ou son ID.
   * !! Ne pas entrer les deux valeurs, une seule.
   * Si les deux sont entrées, ce sera id qui sera pris en premier
   * Pour appeler par un id, écrire dans les paramètres : (null, id)
   *
   * @param {string} [itemToFindByName] - Le nom de l'item à rechercher (facultatif).
   * @param {number} [itemToFindById] - L'ID de l'item à rechercher (facultatif).
   * @returns {Object | undefined} - L'objet correspondant à l'item trouvé, ou `undefined` s'il n'existe pas.
   */
  const findItem = (itemToFindByName = null, itemToFindById = null) => {
    if (itemToFindById) {
      const itemFound = itemsData.find((item) => item.id === itemToFindById);
      return itemFound;
    }
    if (itemToFindByName) {
      const itemFound = itemsData.find(
        (item) => item.name === itemToFindByName
      );
      return itemFound;
    }

    return undefined;
  };

  /**
   *
   * @param {object} itemToUse - l'item en tant qu'objet
   * @param {number} indexItem - index de l'item dans l'inventaire
   * Active l'effet de l'item, et le remove de l'inventaire
   * setActiveItem sera géré par le composant utilisant cette fonction
   */
  const useItem = (itemToUse = null, indexItem = null) => {
    let itemIsUsed = false;

    switch (itemToUse.effect) {
      case "accuracy":
      case "attack":
      case "chance":
      case "defense":
      case "initiative":
      case "maxHealth":
        if (playerStats.stats.chance < 1) {
          upStatsPlayer(itemToUse.effect, itemToUse.value);
          itemIsUsed = true;
        }
        break;
      case "heal":
        console.log("heal OK");

        if (playerStats.stats.health < playerStats.stats.maxHealth) {
          console.log("heal activé");
          healPlayer(itemToUse.value);
          itemIsUsed = true;
        }
        break;
    }
    console.log("useItem activé");

    if (itemIsUsed) removeItem(indexItem);
  };

  /**
   *
   * @param {number} index
   * Retire l'item de l'inventaire à l'index passé en paramètre
   */
  const removeItem = (index) => {
    playerStats.inventory[index] = "";
  };

  const healPlayer = (healPoints) => {
    setPlayerStats((prevStats) => ({
      ...prevStats,
      stats: {
        ...prevStats.stats,
        health: Math.min(
          prevStats.stats.health + healPoints,
          prevStats.stats.maxHealth
        ),
      },
    }));
  };

  /**
   *
   * @param {string} statToUp
   * @param {number} value
   * Augmente la stat passée en paramètre de value
   */
  const upStatsPlayer = (statToUp, value) => {
    setPlayerStats((prevStats) => ({
      ...prevStats,
      stats: {
        ...prevStats.stats,
        [statToUp]: prevStats.stats[statToUp] + value,
      },
    }));
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
        findItem,
        useItem,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};
