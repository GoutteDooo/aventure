// Fichier : src/utils/playerData.js

export function initializePlayer() {
  // Vérifie si les données du joueur existent déjà
  const existingPlayer = JSON.parse(localStorage.getItem("playerData"));
  if (existingPlayer) {
    return existingPlayer;
  }

  // Valeurs par défaut
  const newPlayer = {
    name: localStorage.getItem("playerName") || "Aventurier",
    stats: {
      health: 100,
      attack: 10,
      defense: 5,
      accuracy: 0.5, // 80% de précision
    },
    inventory: [],
    equipment: {
      hat: "Chapeau de paille",
      outfit: "Tenue de paysan",
      weapon: "Bâton en bois",
    },
  };

  // Sauvegarde les nouvelles données
  localStorage.setItem("playerData", JSON.stringify(newPlayer));
  return newPlayer;
}

export function savePlayerData(playerData) {
  localStorage.setItem("playerData", JSON.stringify(playerData));
}
