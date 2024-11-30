import React, { useEffect, useState } from 'react';

const Stats = () => {
    const [playerStats, setPlayerStats] = useState(() => {
        const savedPlayerData = localStorage.getItem("playerData");
        return savedPlayerData ? JSON.parse(savedPlayerData) : {
            name: "John Doe",
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
            inventory: ["Sandwich à l'ail", "Potion de santé", "Orbe de feu", "Trèfle à quatre feuilles", "", ""],
            }
        });

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

    useEffect(() => {
        localStorage.setItem("playerData", JSON.stringify(playerStats));
    }, [playerStats]);

    return (
        <div className='stats'>
            <div className="stats__container">
            <table>
                <thead>
                    <tr>
                        <th>Statistiques</th>
                        <th>Valeurs</th>
                    </tr>
                </thead>
                <tbody>
                    {playerStats && Object.entries(playerStats.stats).map(([key,value], index) => (
                        <tr key={index}>
                            <td>{convertKey(key)}</td>
                            <td>{convertStat(key, value)}</td>
                        </tr>
                        )
                    )}
                    </tbody>
                </table>
            </div>
            <div className="stats__equipment"></div>
        </div>
    );
};

export default Stats;