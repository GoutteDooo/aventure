import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/main.css";

function Home() {
  const [playerName, setPlayerName] = useState("");
  const navigate = useNavigate();

  const handleStart = () => {
    if (playerName.trim()) {
      // Sauvegarde le nom dans le localStorage
      localStorage.setItem("playerName", playerName);
      // Redirige vers la page suivante
      navigate("/adventure");
    } else {
      alert("Veuillez entrer un nom avant de commencer l’aventure !");
    }
  };

  return (
    <div className="home">
      <h1 className="home__h1">Quel est votre nom, cher aventurier ?</h1>
      <input
        type="text"
        placeholder="Votre nom"
        className="home__setPlayerName"
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
      />
      <button onClick={handleStart} className="home__start">
        {" "}
        Commencer l&apos;aventure
      </button>
    </div>
  );
}

export default Home;
