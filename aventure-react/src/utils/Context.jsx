import { createContext, useEffect, useState } from "react";

export const PlayerContext = createContext();

const initialPlayerData = {
    stats: {
        maxHealth:100,
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
    inventory: ["Sandwich à l'ail", "Potion de santé", "Orbe de feu", "Trèfle à quatre feuilles", "Chapeau de paille", ""],
};

export const PlayerProvider = ({children}) => {
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

    const resetPlayerData = () => {
        localStorage.clear();
        setPlayerStats(initialPlayerData);
    }

    return (
        <PlayerContext.Provider value={{ playerStats, setPlayerStats, resetPlayerData }}>
            {children}
        </PlayerContext.Provider>
    )
}
