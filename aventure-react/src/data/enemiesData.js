// src/data/enemiesData.js
const enemiesData = [
  {
    id: 0,
    name: "Epouvantail",
    maxHealth: 1000,
    health: 100,
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
  {
    id: 1,
    name: "Epouvantail",
    maxHealth: 1000,
    health: 100,
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
