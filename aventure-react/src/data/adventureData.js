// src/data/adventureData.js
const adventureData = {
  start: {
    text: "Vous vous réveillez dans une clairière, équipé d'un simple bâton. Devant vous, deux chemins s'ouvrent : l'un menant vers une forêt sombre, l'autre vers une colline ensoleillée.",
    choices: [
      { text: "Explorer la forêt", next: "forest" },
      { text: "Monter sur la colline", next: "hill" },
    ],
  },
  forest: {
    text: "La forêt est sombre et inquiétante. Vous entendez des bruits étranges, mais vous trouvez une potion de soin.",
    choices: [
      {
        text: "Ramasser la potion et retourner en arrière",
        next: "start",
        effect: { inventory: "Potion de soin" },
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
