// src/data/enemiesData.js
const enemiesData = [
  {
    //ENNEMI TEMPLATE
    id: 0,
    name: "Template",
    maxHealth: 100,
    health: 100,
    attack: 10,
    defense: 10,
    chance: 0.1,
    accuracy: 0.8,
    initiative: 10,
    gain: {
      lootPool: [
        { loot1: "Chapeau de paille", chance: 1 },
        { loot2: "Potion de santé", chance: 0.5 },
      ],
      exp: { value: 50, description: "EXP" },
      gold: { value: 1, description: "Pièce" },
    },
    combatData: {
      // Toutes les données relatives au Combat
      attacks: [
        {
          id: 1,
          name: "Charge",
          isAttackSpecial: false,
          timerForAttack: 0, //# de tours avant l'attaque (0 étant le tour actuel)
          desc: "L'épouvantail se place à un angle de 60° et s'envole droit sur vous !",
          damages: 1,
          isConditional: false, //Savoir si l'algo peut utiliser l'attaque par défaut ou non
        },
        {
          id: 2,
          name: "Jet de Paille",
          timerForAttack: 1, //Il faudra attendre 1 tour avant de lancer cette attaque
          isAttackSpecial: true,
          descBeforeAtk:
            "L'épouvantail se comporte de manière étrange. Il arrache vigoureusement ses tiges de paille.", //description lors du temps avant l'attaque
          desc: "L'épouvantail vient de se fabriquer une sarbacane, et vous envoie maintenant ses tiges de paille à la figure.",
          damages: 10,
          isConditional: true, //Cette attaque se joue sous condition
          condition: "health < maxHealth * 0.5", //si la santé de l'ennemi est < a 50%
        },
        {
          id: 3,
          name: "Soins",
          timerForAttack: 0,
          isAttackSpecial: true,
          desc: "L'épouvantail prend quelques-uns de ses morceaux tombés au sol et se reconstitue comme il peut.",
          damages: 0,
          heal: 20,
          isConditional: true, //Cette attaque se joue sous condition
          condition: "health < maxHealth * 0.5", //si la santé de l'ennemi est < a 50%
        },
      ],
      attackSyst: {
        //rng, ordre...
        orderUsed: "nomDeLorderActif", //Un seul order, et la fonction en charge l'utilisera. Ensuite, je ne sélectionne qu'un des orders suivants :
        //N'en prendre qu'un, et remove l'array
        orderAChoisir: {
          orderRNG: [0.7, 0.2, 0.1], //Set proportion des attacks (somme === 1). Si une attaque est sous condition et qu'elle n'est pas respectée, alors prendre l'attaque à l'index n-1 et revérifier les conditions
          orderForwards: [1, 1, 3, 2], //Une fois le tableau atteint, on n'utilise plus que la dernière attaque (ID) en boucle
          //Ne peut pas jouer une attaque si la condition de cette dernière n'est pas remplie, utilisera l'attaque n-1 du coup et restera sur l'index jusqu'à ce qu'elle peut la jouer
          //Lorsqu'il joue une attaque avec timer, patienter jusqu'à la fin de ce dernier avant de passer à l'index suivant
          orderInfinite: [], // Arrivé au bout, on redémarre à l'index 0
          orderAlternate: [], // Va de gauche a droite, puis une fois atteint le dernier index, on repart de droite à gauche et ainsi de suite...
        },
      },
      resistances: {
        fire: -0.2, //faiblesse face au feu
        water: 0,
        earth: 0.2, //résistance à la terre
        physical: 0,
      },
      narrative: {
        intro:
          "L'épouvantail se dresse face à vous, le regard fixe. Il a l'air totalement indifférent face à vos provocations.",
        playerTurn: [
          "L'épouvantail se pavane fièrement en attendant que vous ayez fini de vous décider.",
          "L'épouvantail essaie de se curer le semblant de nez dessiné sur son visage en attendant que vous ayez fini de réfléchir.",
        ],
      },
    },
  },
  {
    id: 1,
    name: "Epouvantail",
    maxHealth: 1000,
    health: 20,
    attack: 2,
    defense: 0,
    chance: 0.1,
    accuracy: 0.7,
    initiative: 10,
    gain: {
      lootPool: [
        { loot1: "Chapeau de paille", chance: 1 },
        { loot2: "Potion de santé", chance: 0.5 },
      ],
      exp: { value: 10, description: "EXP" },
      gold: { value: 1, description: "Pièce" },
    },
    combatData: {
      attacks: [
        {
          id: 1,
          name: "Charge",
          hasDescBeforeAtk: false,
          timerForAttack: 0, //# de tours avant l'attaque (0 étant le tour actuel)
          desc: "L'épouvantail se place à un angle de 60° et s'envole droit sur vous !",
          effects: {
            getDamages(parent) {
              return parent.attack;
            },
          },
          isConditional: false, //Savoir si l'algo peut utiliser l'attaque par défaut ou non
          animation: "charge",
          animationDuration: 1500, //en secondes
        },
        {
          id: 2,
          name: "Jet de Paille",
          timerForAttack: 1, //Il faudra attendre 1 tour avant de lancer cette attaque
          hasDescBeforeAtk: true,
          descBeforeAtk:
            "L'épouvantail se comporte de manière étrange. Il arrache vigoureusement ses tiges de paille.", //description 1 temps avant l'attaque
          desc: "L'épouvantail s'est fabriqué une sarbacane, et vous envoie maintenant ses tiges de paille à la figure.",
          effects: {
            getDamages(parent) {
              return parent.attack * 8;
            },
          },
          isConditional: true,
          condition: (enemy) => enemy.health < enemy.maxHealth * 0.5,
          animation: "jetDePaille",
          animationDuration: 3000, //en secondes
        },
        {
          id: 3,
          name: "Soins",
          timerForAttack: 0,
          hasDescBeforeAtk: true,
          descBeforeAtk:
            "L'épouvantail se penche vers le sol, il a l'air de préparer une charge bien plus conséquente.",
          desc: "L'épouvantail ramasse quelques-uns de ses morceaux tombés au sol et se reconstitue comme il peut !",
          effects: {
            heal: 8,
          },
          isConditional: true,
          condition: (enemy) => enemy.health < enemy.maxHealth * 0.5,
          animation: "classicHeal",
          animationDuration: 3000, //en secondes
        },
      ],
      attackSyst: {
        orderUsed: "orderForwards",
        orderForwards: [1, 1, 3, 2],
      },
      resistances: {
        fire: -0.2, //faiblesse face au feu
        water: 0,
        earth: 0.2, //résistance à la terre
        physical: 0,
      },
      narrative: {
        //description lors du playerTurn
        intro:
          "L'épouvantail se dresse face à vous, le regard fixe. Il a l'air totalement indifférent face à vos provocations.",
        playerTurn: [
          "L'épouvantail se pavane fièrement en attendant que vous ayez fini de vous décider.",
          "L'épouvantail essaie de se curer le semblant de nez dessiné sur son visage en attendant que vous ayez fini de réfléchir.",
          "L'épouvantail tente de s'asseoir sur le rocher à côté de la porte pour se reposer, mais constate qu'il n'a pas les articulations nécessaires pour effectuer cette action.",
        ],
        attack: [
          ,
          (enemy) => enemy.combatData.attacks[2].descBeforeAtk,
          (enemy) => enemy.combatData.attacks[1].descBeforeAtk,
        ],
      },
    },
  },
];

export default enemiesData;
