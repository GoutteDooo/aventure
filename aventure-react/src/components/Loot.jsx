import React, { useEffect, useState, useContext } from 'react';

const Loot = ({loots}) => {
    const savedStep = JSON.parse(localStorage.getItem("currentStepId"));
    const [currentStepId, setCurrentStepId] = useState(savedStep);

    useEffect(() => {
      //Met à jour le localStorage lorsqu'une étape change
      localStorage.setItem("currentStepId", JSON.stringify(currentStepId));
    }, [currentStepId]);

    return (
        <div className='loots'>
            <div className="loots__drop">
            <h1>Récupéré : </h1>
            <ul>
                {loots.map((loot, index) => (
                    <li key={index}>{loot}</li>
                ))}
            </ul>
            </div>
            <button className="loots__next" onClick={() => setCurrentStepId(savedStep+1)}>Etape suivante</button>
        </div>
    );
};

export default Loot;