import React, { useEffect, useState } from 'react';

const CombatTurns = ({playerTurn, enemy}) => {
    const [turns, setTurns] = useState([]);

    /**
     * Calcule au premier rendu qui doit jouer
     * Lancée à chaque re-rendu, calcule en fonction du playerTurn qui doit jouer.
     * Calcule également s'il doit y avoir double tour ou non.
     * Le double tour est calculé à chaque nouveau tour du personnage en cours et prend en compte le différentiel d'initiative entre lui et son adversaire
     * Il y'aura un total de 10 tours visibles à l'écran (ou plus si je me rends compte que c'est pas assez), et à chaque fois qu'un tour passe, un nouveau s'ajoute à la liste.
     */
    const calculateTurns = () => {

    }

    useEffect(() => {
        
    })

    return (
        <div className='combat__turn'>
            <div className="combat__turn__wheel">
                {}
            </div>
        </div>
    );
};

export default CombatTurns;