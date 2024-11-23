// src/data/adventureData.js
const adventureData = {
  start: {
    text: "Bienvenue, aventurier. Vous voici prêt à entrer dans le donjon pour affronter Le Grand Dragon Zrog qui terrifie le monde. Face à vous se dresse un épouvantail a l'air maléfique, comme si Zrog méprisait les aventuriers qui oseraient entrer dans son donjon en leur montrant qu'ils ne pourraient même pas vaincre un simple bonhomme de paille.",
    choices: [
      {
        text: "Affronter l'épouvantail (didacticiel)",
        next: "battle",
        enemy: "epouvantail",
      },
      { text: "Ouvrir la porte", next: "E13" },
    ],
  },
  battle: {
    text: "",
    choices: [],
  },
  E13: {
    text: "Salle E13",
    choices: [
      {
        text: "Ramasser la potion",
        next: "E13",
        effect: { inventory: "Potion de soin" },
      },
      {
        text: "Porte de gauche",
        next: "E12",
        // enemy: "mobs",
      },
      {
        text: "Porte de droite",
        next: "E14",
      },
    ],
  },
  E12: {
    text: "Salle E12",
    choices: [
      {
        text: "Porte de gauche",
        next: "E11",
      },
      {
        text: "Retour en arrière",
        next: "E13",
      },
    ],
  },
  E11: {
    text: "Salle E11",
    choices: [
      {
        text: "Retour en arrière",
        next: "E12",
      },
    ],
  },
  E14: {
    text: "Salle E14",
    choices: [
      {
        text: "Retour en arrière",
        next: "E13",
      },
      {
        text: "Porte de droite",
        next: "E15",
      },
    ],
  },
  E15: {
    text: "Salle E15",
    choices: [
      {
        text: "Retour en arrière",
        next: "E14",
      },
      {
        text: "Porte de droite",
        next: "E16",
      },
      {
        text: "Prendre les escaliers",
        next: "E24",
      },
    ],
  },
  E16: {
    text: "Salle E16",
    choices: [
      {
        text: "Retour en arrière",
        next: "E15",
      },
    ],
  },
  E24: {
    text: "Salle E24",
    choices: [
      {
        text: "Redescendre",
        next: "E15",
      },
      {
        text: "Porte de droite",
        next: "E25",
      },
      {
        text: "Porte de gauche",
        next: "E23",
      },
    ],
  },
  E25: {
    text: "Salle E25",
    choices: [
      {
        text: "Retour en arrière",
        next: "E24",
      },
    ],
  },
  E23: {
    text: "Salle E23",
    choices: [
      {
        text: "Retour en arrière",
        next: "E24",
      },
      {
        text: "Porte de gauche",
        next: "E22",
      },
    ],
  },
  E22: {
    text: "Salle E22",
    choices: [
      {
        text: "Retour en arrière",
        next: "E23",
      },
      {
        text: "Porte de gauche",
        next: "E21",
      },
      {
        text: "Prendre les escaliers",
        next: "E32",
      },
    ],
  },
  E21: {
    text: "Salle E21",
    choices: [
      {
        text: "Retour en arrière",
        next: "E22",
      },
    ],
  },
  E32: {
    text: "Salle E32",
    choices: [
      {
        text: "Redescendre",
        next: "E22",
      },
      {
        text: "Porte de gauche",
        next: "E31",
      },
      {
        text: "Porte de droite",
        next: "E33",
      },
    ],
  },
  E31: {
    text: "Salle E31",
    choices: [
      {
        text: "Retour en arrière",
        next: "E32",
      },
    ],
  },
  E33: {
    text: "Salle E33",
    choices: [
      {
        text: "Retour en arrière",
        next: "E32",
      },
      {
        text: "Porte de droite",
        next: "E34",
      },
    ],
  },
  E34: {
    text: "Salle E34",
    choices: [
      {
        text: "Escalader dans le plafond",
        next: "E43",
      },
      {
        text: "Porte de droite",
        next: "E35",
      },
    ],
  },
  E35: {
    text: "Salle E35",
    choices: [
      {
        text: "Retour en arrière",
        next: "E34",
      },
    ],
  },
  E43: {
    text: "Salle E43",
    choices: [
      {
        text: "Porte de droite",
        next: "E44",
      },
      {
        text: "Porte de gauche",
        next: "E42",
      },
    ],
  },
  E44: {
    text: "Salle E44",
    choices: [
      {
        text: "Retour en arrière",
        next: "E43",
      },
    ],
  },
  E42: {
    text: "Salle E42",
    choices: [
      {
        text: "Retour en arrière",
        next: "E43",
      },
      {
        text: "Prendre les escaliers en flamme",
        next: "E52",
      },
      {
        text: "Porte de gauche",
        next: "E41",
      },
    ],
  },
  E41: {
    text: "Salle E41",
    choices: [
      {
        text: "Grimper dans le trou",
        next: "E51",
      },
      {
        text: "Retour en arrière",
        next: "E41",
      },
    ],
  },
  E52: {
    text: "Zrog le dragon",
    choices: [
      {
        text: "Redescendre les escaliers",
        next: "E42",
      },
    ],
  },
  E51: {
    text: "Salle bonus E51",
    choices: [
      {
        text: "Affronter Zrog",
        next: "E52",
      },
      {
        text: "Redescendre du trou",
        next: "E41",
      },
    ],
  },
};

export default adventureData;
