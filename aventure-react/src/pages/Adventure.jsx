import "../styles/main.css";
import { useContext, useEffect, useState } from "react";
import storySteps from "../data/adventureData";
import enemiesData from "../data/enemiesData";
import itemsData from "../data/itemsData";
import popUps from "../data/popUpsData";
import Combat from "../components/Combat";
import { useNavigate } from "react-router-dom";
import { PlayerContext } from "../utils/Context";
import SortInventory from "../components/SortInventory";

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
  const [sortInventory, setSortInventory] = useState(false);

  //State en cas de combat
  const [isInCombat, setIsInCombat] = useState(false);
  const [enemy, setEnemy] = useState(null); //représente l'ennemi s'il y'a

  //Gère l'état pour passer à l'étape suivante dans d'autres composants
  const handleNextStep = (selectedNextId) => {
    const nextStep =
      currentStep.choices?.[selectedNextId]?.nextId || currentStepId + 1;
    if (nextStep === "popUp") {
      const popUpFound = popUps.find(
        (popUpToFind) =>
          popUpToFind.id === currentStep.choices[selectedNextId].popUpId
      );
      //Si déjà dans la sauvegarde
      if (
        playerStats.choiceSaved.find(
          (i) => popUpFound.id === playerStats.choiceSaved[i - 1]
        )
      ) {
        console.log("déjà passé par là, action annulée");
      } else {
        const savedChoiceId = currentStep.choices[selectedNextId].saveChoiceId;
        setPlayerStats((prevStats) => ({
          ...prevStats,
          choiceSaved: [...prevStats.choiceSaved, savedChoiceId],
        }));
        setPopUpToShow(popUpFound);
        setShowPopUp(true);
      }
    } else {
      setCurrentStepId(nextStep);
    }
  };

  /**Vérifie si l'inventaire est plein, et retourne true le cas échéant, sinon false.
   */
  const isInventoryFull = () => {
    const inventoryIsFull = playerStats.inventory.find(
      (itemName) => itemName === ""
    );

    return inventoryIsFull === "" ? false : true;
  };

  const confirmThrowAwayItem = () => {
    if (confirm("Êtes-vous sûr de jeter l'objet trouvé ? (Définitif)"))
      setShowPopUp(false);
  };

  /**
   * @param {itemId} itemId - number
   * vérifie si l'inventaire est plein
   * si oui, ne rien faire
   * sinon, switch le box vide avec l'item
   */
  const setItemToInventory = (itemId) => {
    if (!isInventoryFull()) {
      const emptyBox = playerStats.inventory.findIndex((item) => item === "");
      const itemName = itemsData.find((item) => item.id === itemId).name;
      playerStats.inventory[emptyBox] = itemName;
    } else {
      console.log("Inventaire plein");
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

  useEffect(() => {
    if (popUpToShow) {
      setItemToInventory(popUpToShow.effects.itemId);
    }
  }, [popUpToShow]);

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
            {currentStep.choices.map(
              (choice, index) =>
                // Si choiceSaved == choiceSavedid, on affiche pas
                !playerStats.choiceSaved.find(
                  (choiceId) =>
                    choiceId === currentStep.choices[index].saveChoiceId
                ) && (
                  <button
                    key={index}
                    className="adventure__choice"
                    onClick={() => handleNextStep(index)}
                  >
                    {choice.text}
                  </button>
                )
            )}
          </div>
        )}
      </div>
      <button className="adventure__status" onClick={() => navigate("/status")}>
        Status
      </button>
      {showPopUp && (
        <div className="popUp">
          <div className="popUp__title animate-pulsing animate-iteration-count-infinite">
            {popUpToShow ? (
              popUpToShow.title
            ) : (
              <>Erreur lors de l'affichage du titre !</>
            )}
          </div>
          <div className="popUp__text">
            {popUpToShow ? (
              popUpToShow.text
            ) : (
              <>Erreur lors de l'affichage du texte !</>
            )}
          </div>
          {/* Si inventaire plein, on ne peut pas fermer la popUp, il faut faire du tri */}
          {popUpToShow.event == "find item" && isInventoryFull() ? (
            <>
              Inventaire plein, faites le tri ou jeter l'item trouvé
              <button
                className="popUp__inventory__tri"
                onClick={() => setSortInventory(true)}
              >
                Faire le tri
              </button>
              {/* Le composant SortInventory s'active quand le joueur clique sur 'faire le tri' */}
              {sortInventory && (
                <SortInventory itemFound={popUpToShow.effects.itemId} />
              )}
              <button
                className="popUp__close"
                onClick={() => confirmThrowAwayItem()}
              >
                Jeter l'objet (définitif)
              </button>
            </>
          ) : (
            <>
              <button
                className="popUp__close"
                onClick={() => setShowPopUp(false)}
              >
                Fermer
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default Adventure;
