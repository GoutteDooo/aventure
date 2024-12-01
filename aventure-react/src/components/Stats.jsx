import React, { useContext, useEffect } from 'react';
import { PlayerContext } from '../utils/Context';

const Stats = () => {
    const {playerStats, setPlayerStats} = useContext(PlayerContext);

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
    console.log("stats : ",playerStats);
    

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