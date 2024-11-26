import React from 'react';

const Loot = ({loots}) => {
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
            <div className="loots__next">Etape suivante</div>
        </div>
    );
};

export default Loot;