// src/data/enemiesData.js
const enemiesData = [
  {
    id: 1,
    name: "Epouvantail",
    health: "20",
    attack: "1",
    defense: "1",
    chance: "0.1",
    accuracy: "0.8",
    initiative: "0",
    loots: ["Chapeau de paille"],
    gain: {
      exp: { value: 50, description: "Pts d'exp gagnés" },
      gold: { value: 1, description: "Pièces gagnées" },
    },
  },
];

export default enemiesData;
