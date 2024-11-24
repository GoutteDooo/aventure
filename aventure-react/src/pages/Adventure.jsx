import "../styles/main.css"
import "../data/adventureData"
import { useEffect, useState } from "react";
import storySteps from "../data/adventureData";

function Adventure() {
  const [currentStepId, setCurrentStepId] = useState(1);
  const currentStep = storySteps.find((step) => step.id === currentStepId);

  const handleChoiceClick = (nextId) => {
    setCurrentStepId(nextId);
  }

  useEffect(() => {
    console.log(currentStep);
  
  }, [currentStepId])
  
  

  return (
    <div className="adventure">
      <h1 className="adventure__h1">{currentStep.main}</h1>
      <div className="adventure__story">
        <div className="adventure__title">{currentStep.title}</div>
        <div className="adventure__text">
          <p>
            {currentStep.text}
          </p>
          {currentStep.speak && (
            <div className="adventure__speak">
            <p>
              {currentStep.speak}
            </p>  
          </div>
          )}
        </div>
        <div className="adventure__choices">
          {currentStep.choices.map((choice, index) => {
            <button key={index} className="adventure__choice" onClick={() => handleChoiceClick(choice.nextId)}>
              {choice.text}
            </button>
          })}
        </div>
      </div>
    </div>
  );
}

export default Adventure;
