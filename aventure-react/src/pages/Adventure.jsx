import "../styles/main.css";
import { useContext, useEffect, useState } from "react";
import storySteps from "../data/adventureData";
import enemiesData from "../data/enemiesData";
import itemsData from "../data/itemsData";
import popUps from "../data/popUpsData";
import Combat from "../components/Combat";
import { useNavigate } from "react-router-dom";
import { PlayerContext } from "../utils/Context";

function Adventure() {
  const { playerStats, setPlayerStats } = useContext(PlayerContext);
  //Lors du chargement de la page, on récupère les données dans le localStorage s'il y'a. Sinon, on démarre à la 1ere étape.
  const [currentStepId, setCurrentStepId] = useState(() => {
    const savedStep = localStorage.getItem("currentStepId");
    return savedStep ? JSON.parse(savedStep) : 1;
  });

  const navigate = useNavigate();

  const currentStep = storySteps.find((step) => step.id === currentStepId);

  const [showPopUp, setShowPopUp] = useState(false);
  const [popUpToShow, setPopUpToShow] = useState(null);

  //State en cas de combat
  const [isInCombat, setIsInCombat] = useState(false);
  const [enemy, setEnemy] = useState(null); //représente l'ennemi s'il y'a

  //Gère l'état pour passer à l'étape suivante dans d'autres composants
  const handleNextStep = (selectedNextId) => {
    const nextStep = currentStep.choices?.[selectedNextId]?.nextId || currentStepId + 1;
    if (nextStep === "popUp") {
        const popUpFound = popUps.find((popUpToFind) => popUpToFind.id === currentStep.choices[selectedNextId].popUpId);

        const savedChoiceId = currentStep.choices[selectedNextId].saveChoiceId;
        playerStats.choiceSaved.push(savedChoiceId);//Enregistré définitivement

        setPopUpToShow(popUpFound);
        setShowPopUp(true);
      } else {
        setCurrentStepId(nextStep);
    }
  };

  //Detecte s'il y'a un combat ou non
  useEffect(() => {
    if (currentStep.isCombat) {
      const foundEnemy = enemiesData.find((e) => e.id === currentStep.enemyId);
      setEnemy(foundEnemy);
      setIsInCombat(true);
    } else {
      setIsInCombat(false);
      setEnemy(null);
    }
  }, [currentStep, isInCombat]);

  useEffect(() => {
    //Met à jour le localStorage lorsqu'une étape change
    localStorage.setItem("currentStepId", JSON.stringify(currentStepId));
  }, [currentStepId]);


  return (
    <div className="adventure">
      <h1 className="adventure__h1">{currentStep.main}</h1>
      <div className="adventure__story">
        <div className="adventure__title">{currentStep.title}</div>
        <div className="adventure__text">
          <p>{currentStep.text}</p>
          {currentStep.speak && (
            <div className="adventure__speak">
              <p>{currentStep.speak}</p>
            </div>
          )}
        </div>
        {isInCombat && enemy ? (
          <Combat enemy={enemy} onCombatFinish={handleNextStep} />
        ) : (
          <div className="adventure__choices">
            {currentStep.choices.map((choice, index) => (
              <button
                key={index}
                className="adventure__choice"
                onClick={() => handleNextStep(index)}
              >
                {choice.text}
              </button>
            ))}
          </div>
        )}
      </div>
      <button className="adventure__status" onClick={() => navigate("/status")}>
        Status
      </button>
      {showPopUp && (
        <div className="popUp">
          <div className="popUp__title animate-pulsing animate-iteration-count-infinite">{popUpToShow ? (popUpToShow.title) : (<>Erreur lors de l'affichage du titre !</>)}</div>
          <div className="popUp__text">{popUpToShow ? (popUpToShow.text) : (<>Erreur lors de l'affichage du texte !</>)}</div>
          <button className="popUp__close" onClick={() => setShowPopUp(false)}>Fermer</button>
        </div>
      )}
    </div>
  );
}

export default Adventure;
