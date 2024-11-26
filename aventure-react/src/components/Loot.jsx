import React from 'react';

const Loot = ({loots}) => {
    return (
        <div className='loot'>
            <h1>Récupéré : </h1>
            {loots.map((loot) => {
                <p>{loot}</p>
            })}
        </div>
    );
};

export default Loot;