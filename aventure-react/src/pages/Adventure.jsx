import "../styles/main.css"
import "../data/adventureData"
import { useEffect, useState } from "react";
import storySteps from "../data/adventureData";

function Adventure() {
  const [currentStepId, setCurrentStepId] = useState(1);
  const currentStep = storySteps.find((step) => step.id === currentStepId);
  console.log("currentStep : ", currentStep);
  useEffect(() => {

  }, [currentStepId])
  
  

  return (
    <div className="adventure">
      <h1 className="adventure__h1">Aventure</h1>
      <div className="adventure__story">
        <div className="adventure__title">A l'entree du donjon</div>
        <div className="adventure__text">
          <p>
            Vous voici prêt à entrer dans le donjon de Zrog. Le terrible dragon menaçant d'exterminer l'humanité toute entière. 
            <br /> 
            Vous vous sentez gonflé à bloc, prêt à terrasser cette bête ailée. 
            <br />
            Un épouvantail se dresse près de la porte, avec un panneau en-dessous indiquant :
          </p>
          <div className="adventure__speak">
            <p>
              Meme un simple epouvantail est plus fort que vous. 
              <br />
              Jamais vous n'arriverez à me vaincre, Pauvres âmes faibles !!
            </p>  
          </div>
        </div>
      </div>
    </div>
  );
}

export default Adventure;
