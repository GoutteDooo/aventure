// src/data/adventureData.js
const adventureData = {
  start: {
    text: "Bienvenue, aventurier. Vous voici prêt à démarrer votre quête pour parvenir à vaincre Le Grand Dragon Zrog qui terrifie le monde. Vous aurez plusieurs choix lors de votre quête. Vos décisions auront des conséquences sur le futur. Alors, faites ce qui vous semble le plus juste. Vous êtes dans une pièce vide avec une porte dans le fond. Un épouvantail se dresse en face de vous.",
    choices: [
      {
        text: "Affronter l'épouvantail (didacticiel)",
        next: "battle",
        enemy: "epouvantail",
      },
      { text: "Ouvrir la porte", next: "level1" },
    ],
  },
  battle: {
    text: "",
    choices: [],
  },
  forest: {
    text: "La forêt est sombre et inquiétante. Vous entendez des bruits étranges derrière un arbre, et apercevez une potion au sol.",
    choices: [
      {
        text: "Ramasser la potion et retourner en arrière",
        next: "start",
        effect: { inventory: "Potion de soin" },
      },
      {
        text: "Aller voir derrière l'arbre",
        next: "battle",
        enemy: "wolf",
      },
    ],
  },
  hill: {
    text: "Depuis la colline, vous apercevez un village au loin. Vous décidez de vous y rendre.",
    choices: [{ text: "Aller au village", next: "village" }],
  },
  village: {
    text: "Le village est paisible. Vous pouvez vous reposer et récupérer un peu de vie.",
    choices: [
      { text: "Reprendre l’aventure", next: "start", effect: { health: 20 } },
    ],
  },
};

export default adventureData;
