import React from 'react';

const Defense = ({handleDefense}) => {

    return (
        <button className="combat__button__defense" onClick={handleDefense}>Se protéger</button>
    );
};

export default Defense;