import React from 'react';
import Inventaire from '../components/Inventaire';
import { useNavigate } from 'react-router-dom';

const Status = () => {
    const navigate = useNavigate();
    return (
        <div className='status'>
            <Inventaire />
            <button className="status__return" onClick={() => navigate("/adventure")}>Retourner à l'aventure</button>
        </div>
    );
};

export default Status;