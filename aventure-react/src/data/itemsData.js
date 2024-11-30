const itemsData = [
  {
    id: 1,
    name: "Potion de santé",
    effect: "direct:heal",
    value: 20,
    desc_useless:
      "Une vieille fiole poussiéreuse contenant un liquide verdâtre foncé.",
    desc_use: "Soigne 100% des HP",
    desc_class: "positive",
  },
  {
    id: 2,
    name: "Chapeau de paille",
    effect: "stats:chance",
    value: 3,
    desc_useless: "",
    desc_use: "",
    desc_class: "positive",
  },
  {
    id: 3,
    name: "Tenue de paysan",
    effect: "stats:defense",
    value: 1,
    desc_useless: "",
    desc_use: "",
    desc_class: "positive",
  },
  {
    id: 4,
    name: "Bâton en bois",
    effect: "stats:attack",
    value: 1,
    desc_useless: "",
    desc_use: "",
    desc_class: "positive",
  },
  {
    id: 5,
    name: "Sandwich à l'ail",
    effect: "direct:heal",
    value: 100,
    desc_useless:
      "Un délicieux sandwich confectionné avec soin par votre épouse.",
    desc_use: "Soigne 100 HP",
    desc_class: "positive",
  },
  {
    id: 6,
    name: "Orbe de feu",
    effect: "direct:damage",
    value: 100,
    desc_useless:
      "Une boule de cristal. A l'intérieur, une petite flamme esseulée tournoie indéfiniment, ne demandant qu'à s'échapper de sa prison de verre.",
    desc_use: "Inflige 100 dégâts de Feu à la cible.",
    desc_class: "neutral",
  },
];

export default itemsData;
