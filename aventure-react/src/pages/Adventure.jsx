import "../styles/main.css";
import "../data/adventureData";
import { useEffect, useState } from "react";
import storySteps from "../data/adventureData";
import enemiesData from "../data/enemiesData";
import Combat from "../assets/components/Combat";

function Adventure() {
  //Lors du chargement de la page, on récupère les données dans le localStorage s'il y'a. Sinon, on démarre à la 1ere étape.
  const [currentStepId, setCurrentStepId] = useState(() => {
    const savedStep = localStorage.getItem("currentStepId");
    return savedStep ? JSON.parse(savedStep) : 1;
  });

  const currentStep = storySteps.find((step) => step.id === currentStepId);

  //State en cas de combat
  const [isInCombat, setIsInCombat] = useState(false);
  const [enemy, setEnemy] = useState(null); //représente l'ennemi s'il y'a

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
  }, [currentStep]);

  useEffect(() => {
    //Met à jour le localStorage lorsqu'une étape change
    localStorage.setItem("currentStepId", JSON.stringify(currentStepId));
  }, [currentStepId]);

  const handleChoiceClick = (nextId) => {
    setCurrentStepId(nextId);
  };

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
          <Combat enemy={enemy} />
        ) : (
          <div className="adventure__choices">
            {currentStep.choices.map((choice, index) => (
              <button
                key={index}
                className="adventure__choice"
                onClick={() => handleChoiceClick(choice.nextId)}
              >
                {choice.text}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Adventure;
