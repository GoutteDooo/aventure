const itemsData = [
  {
    id: 1,
    name: "Potion de santé",
    direction: "inventory",
    effect: "heal",
    value: 100000,
    desc_useless:
      "Une vieille fiole poussiéreuse contenant un liquide verdâtre foncé visqueux.",
    desc_use: "Soigne 100% des HP",
    desc_class: "positive",
    using: "all",
  },
  {
    id: 2,
    name: "Chapeau de paille",
    direction: "hat",
    effect: "chance",
    value: 0.03,
    desc_useless:
      "Ce chapeau vous rappelle votre oncle, qui le portait régulièrement et en a fini par vous en faire cadeau.",
    desc_use: "Augmente la chance de 3",
    desc_class: "positive",
    using: "equip",
  },
  {
    id: 3,
    name: "Tenue de paysan",
    direction: "outfit",
    effect: "defense",
    value: 1,
    desc_useless:
      "Une vieille tenue encore à peu près présentable, sortie du plus profond recoin de votre placard.",
    desc_use: "Augmente la défense de 1",
    desc_class: "positive",
    using: "equip",
  },
  {
    id: 4,
    name: "Bâton en bois",
    direction: "weapon",
    effect: "attack",
    value: 1,
    desc_useless: `Un jour, vous avez eu l'idée de devenir berger en voyant ce bâton. Puis, vous avez réalisé que c'était plus intéressant de devenir guerrier.`,
    desc_use: "Augmente l'attaque de 1",
    desc_class: "positive",
    using: "equip",
  },
  {
    id: 5,
    name: "Sandwich à l'ail",
    direction: "inventory",
    effect: "heal",
    value: 100,
    desc_useless:
      "Un délicieux sandwich confectionné avec soin par votre épouse.",
    desc_use: "Soigne 100 HP",
    desc_class: "positive",
    using: "all",
  },
  {
    id: 6,
    name: "Orbe de feu",
    direction: "inventory",
    effect: "damage",
    value: 100,
    desc_useless:
      "Une boule de cristal. A l'intérieur, une petite flamme esseulée tournoie indéfiniment dans des directions aléatoires, ne demandant qu'à s'échapper de sa prison de verre.",
    desc_use: "Inflige 100 dégâts de Feu à la cible. (Usage unique) ",
    desc_class: "neutral",
    using: "combat",
  },
  {
    id: 7,
    name: "Trèfle à quatre feuilles",
    direction: "inventory",
    effect: "stats:chance",
    value: 1,
    desc_useless:
      "Ce trèfle paraît parfait, tant les dimensions des feuilles et de la tige sont symétriques. Sa beauté vous ouvre l'appétit.",
    desc_use: "Augmente la chance de 1. (Usage unique) ",
    desc_class: "positive",
    using: "all",
  },
];

export default itemsData;
