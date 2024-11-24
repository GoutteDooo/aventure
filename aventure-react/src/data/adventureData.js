// src/data/adventureData.js
const storySteps = [
  {
    id: 1,
    main: "Aventure",
    title: `A l'entrée du donjon`,
    text: `Vous voici prêt à entrer dans le donjon de Zrog. Le terrible dragon menaçant d'exterminer l'humanité toute entière.
            Vous vous sentez gonflé à bloc, prêt à terrasser cette bête ailée. 
            Un épouvantail se dresse près de la porte, avec un panneau en-dessous indiquant :`,
    speak: `Même cet épouvantail est bien plus fort que vous.
    Abandonnez. Jamais vous n'arriverez à me vaincre, Pauvres âmes faibles !!`,
    choices: [
      { text: `Affronter l'épouvantail (didacticiel)`, nextId: 2 },
      { text: `Entrer dans le donjon`, nextId: 3 },
    ],
  },
  /* En dessous à modifier */
  {
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
  {
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
  {
    text: "Salle E11",
    choices: [
      {
        text: "Retour en arrière",
        next: "E12",
      },
    ],
  },
  {
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
  {
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
  {
    text: "Salle E16",
    choices: [
      {
        text: "Retour en arrière",
        next: "E15",
      },
    ],
  },
  {
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
  {
    text: "Salle E25",
    choices: [
      {
        text: "Retour en arrière",
        next: "E24",
      },
    ],
  },
  {
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
  {
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
  {
    text: "Salle E21",
    choices: [
      {
        text: "Retour en arrière",
        next: "E22",
      },
    ],
  },
  {
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
  {
    text: "Salle E31",
    choices: [
      {
        text: "Retour en arrière",
        next: "E32",
      },
    ],
  },
  {
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
  {
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
  {
    text: "Salle E35",
    choices: [
      {
        text: "Retour en arrière",
        next: "E34",
      },
    ],
  },
  {
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
  {
    text: "Salle E44",
    choices: [
      {
        text: "Retour en arrière",
        next: "E43",
      },
    ],
  },
  {
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
  {
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
  {
    text: "Zrog le dragon",
    choices: [
      {
        text: "Redescendre les escaliers",
        next: "E42",
      },
    ],
  },
  {
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
];

export default storySteps;
