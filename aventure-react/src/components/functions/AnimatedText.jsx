import React, { useEffect, useState, useRef } from "react";

const AnimatedText = ({ text, ms }) => {
  const [displayedText, setDisplayedText] = useState("");
  const animationRef = useRef(null); // Référence à l'instance en cours

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const writeText = async (text, delayMs = 100) => {
    for (let i = 0; i < text.length; i++) {
      if (animationRef.current !== text) return; // Si l'animation a été remplacée, arrêtez
      setDisplayedText(text.slice(0, i + 1));
      await delay(delayMs);
    }
  };

  useEffect(() => {
    // Avant de démarrer, "jeter" toute animation précédente
    animationRef.current = text; // Marquer l'animation en cours
    writeText(text, ms);

    return () => {
      animationRef.current = null; // Stopper toute animation en cours à la fin
    };
  }, [text, ms]); // Se relance uniquement si text ou ms change

  return <p>{displayedText}</p>;
};

export default AnimatedText;
