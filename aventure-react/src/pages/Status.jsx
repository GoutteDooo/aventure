import React, { useContext, useEffect, useState } from 'react';
import Inventaire from '../components/Inventaire';
import { useNavigate } from 'react-router-dom';
import Stats from '../components/Stats';
import { PlayerContext } from '../utils/Context';

const Status = () => {
    const navigate = useNavigate();
    const currentStep = localStorage.getItem("currentStepId");
    const [currentStepId, setCurrentStepId] = useState(() => {
        return currentStep ? JSON.parse(currentStep) : 1;
    });
    const { resetPlayerData } = useContext(PlayerContext);

    const handleRestart = () => {
        if (window.confirm("Êtes-vous sûr de vouloir réinitialiser toutes vos stats ? ")) {
            navigate("/");
            resetPlayerData();
        }
    }

    useEffect(() => {
        //Met à jour le localStorage lorsque player a cliqué sur bouton
        localStorage.setItem("currentStepId", JSON.stringify(currentStepId));
        //A faire également pour les datas du joueur
      }, [currentStepId]);
    
    return (
        <div className='status'>
            <Inventaire />
            <Stats />
            <button className="status__return" onClick={() => navigate("/adventure")}>Retourner à l'aventure</button>
            <button className='restartButton' onClick={() => handleRestart()}>
                Effacer sa mémoire (retour au début)
            </button>
        </div>
    );
};

export default Status;