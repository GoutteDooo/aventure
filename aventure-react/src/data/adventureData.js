// src/data/adventureData.js
const storySteps = [
  {
    id: 0,
    main: "Fin du Combat",
    title: ``,
    text: ``,
    speak: ``,
    isCombat: false,
    choices: [],
  },
  {
    id: 1,
    main: "Aventure",
    title: `A l'entrée du donjon`,
    text: `Vous voici prêt à entrer dans le donjon de Zrog. Le terrible dragon menaçant d'exterminer l'humanité toute entière.
            Vous vous sentez gonflé à bloc, prêt à terrasser cette bête ailée. 
            Un épouvantail se dresse près de la porte, avec un panneau sur le côté.`,
    speak: ``,
    isCombat: false,
    choices: [
      { text: `Lire le panneau`, nextId: 2 },
      { text: `Entrer dans le donjon`, nextId: 5 },
    ],
  },
  {
    id: 2,
    main: "Aventure",
    title: `A l'entrée du donjon`,
    text: `Vous voici prêt à entrer dans le donjon de Zrog. Le terrible dragon menaçant d'exterminer l'humanité toute entière.
            Vous vous sentez gonflé à bloc, prêt à terrasser cette bête ailée. 
            Un épouvantail se dresse près de la porte, avec un panneau sur le côté.`,
    speak: `Même cet épouvantail est bien plus fort que vous.
    Abandonnez. Jamais vous ne parviendrez à me vaincre moi, Le Grand Dragon Zorg. Pauvres âmes faibles !`,
    isCombat: false,
    choices: [
      { text: `Affronter l'épouvantail (didacticiel)`, nextId: 3 },
      { text: `Entrer dans le donjon`, nextId: 5 },
    ],
  },
  {
    id: 3,
    main: "Combat",
    title: `Adversaire : Epouvantail`,
    text: `L'épouvantail se dresse face à vous, le regard fixe. Il a l'air totalement indifférent face à vos provocations.`,
    speak: ``,
    isCombat: true,
    enemyId: 1,
    choices: [
      { text: `Affronter l'épouvantail (didacticiel)`, nextId: 4 },
      { text: `Entrer dans le donjon`, nextId: 5 },
    ],
  },
  {
    id: 4,
    main: "Aventure",
    title: `Suite entrée du donjon`,
    text: `L'épouvantail est vaincu. Dans un excès de colère, vous avez détruit le panneau de Zrog. "Pourquoi tant de rage ? Il va falloir apprendre à me maîtriser."`,
    speak: ``,
    isCombat: false,
    choices: [{ text: `Entrer dans le donjon`, nextId: 5 }],
  },
  {
    id: 5,
    main: "Aventure",
    title: `Salle 13`,
    text: `Après avoir parcouru un long corridor, vous voici dans une grande salle ornée de nombreux cadres anciens et têtes d'animaux sur les murs.
    Au centre, une vieille fontaine usagée et craquelée par le temps. Plus aucune goutte d'eau ne subsiste. Une lueur étrange provient du centre de la fontaine cependant. Sur votre gauche, une grande porte en bois. Sur votre droite, un couloir d'où proviennent de nombreux échos. Ces sons vous font penser à de mystérieuses créatures sortant des limbes les plus profondes du monde.`,
    speak: ``,
    isCombat: false,
    choices: [
      { text: `Inspecter le centre de la fontaine`, nextId: 6 },
      { text: `Ouvrir la porte de gauche`, nextId: 7 },
      { text: `Parcourir le couloir de droite`, nextId: 8 },
    ],
  },
  {
    id: 6,
    main: "Découverte",
    title: `Salle 13`,
    text: `Après avoir parcouru un long corridor, vous voici dans une grande salle ornée de nombreux cadres et têtes d'animaux sur les murs.
    Au centre, une vieille fontaine usagée et craquelée par le temps. Plus aucune goutte d'eau ne subsiste. Une lueur étrange provient du centre de la fontaine cependant. Sur votre gauche, une grande porte en bois. Sur votre droite, un couloir d'où proviennent de nombreux échos. Ces sons vous font penser à de mystérieuses créatures sortant des limbes les plus profondes du monde.`,
    speak: `Vous venez de trouver une potion de santé !`,
    isCombat: false,
    events: [
      {
        type: "item",
        itemId: 1,
      },
    ],
    choices: [
      { text: `Ouvrir la porte de gauche`, nextId: 7 },
      { text: `Parcourir le couloir de droite`, nextId: 8 },
    ],
  },
];

export default storySteps;
