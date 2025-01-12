class Enemy {
  gains = {
    lootPool: [
      { loot1: "DefaultLoot", chance: 1 },
      { loot2: "DefaultLoot", chance: 0.5 },
    ],
    exp: 10,
  };
  combatData = {
    attacks: [],
    attackSystem: {},
    resistances: {},
    narrative: [],
  };
  constructor(
    id,
    name,
    maxHealth,
    health,
    strength,
    defense,
    chance,
    accuracy,
    initiative
  ) {
    this.id = id;
    this.name = name;
    this.maxHealth = maxHealth;
    this.health = health;
    this.strength = strength;
    this.defense = defense;
    this.chance = chance;
    this.accuracy = accuracy;
    this.initiative = initiative;
  }

  set attacks(attack) {
    this.combatData.attacks = attack;
  }

  set attackSystem(attackSystem) {
    this.combatData.attackSystem = attackSystem;
  }

  set resistances(resistances) {
    this.combatData.resistances = resistances;
  }

  set narrative(narrative) {
    this.combatData.narrative = narrative;
  }

  generateAttack(
    name,
    timer,
    descBef,
    desc,
    animationName,
    animationDuration,
    effects
  ) {
    console.log("attack : ", this.combatData.attacks);
    let id = this.combatData.attacks.length;

    const getDamages = () => {
      return (
        this.strength *
        ((1 - this.accuracy) * Math.max(0, 1 - Math.random()) * this.strength)
      );
    };
    this.combatData.attacks[id] = {
      name,
      timer,
      descBef,
      desc,
      animationName,
      animationDuration,
      effects,
      getDamages,
    };
  }

  generateAttackSystem(orderUsed, orderForwards) {
    if (orderUsed !== "orderForwards" && orderUsed !== "orderBackwards") {
      throw new Error(
        "orderUsed must be either 'orderForwards' or 'orderBackwards'"
      );
    }
    this.combatData.attackSystem = {
      orderUsed,
      orderForwards,
    };
  }

  generateResistances(fire, water, earth, physical) {
    this.combatData.resistances = {
      fire,
      water,
      earth,
      physical,
    };
  }

  generateNarrative(string, type) {
    const types = ["intro", "playerTurn", "attack", "combat"];
    if (!types.includes(type)) {
      throw new Error("type must be one of the following: " + types.join(", "));
    }
    this.combatData.narrative = {
      intro,
      playerTurn,
      attack,
      combat,
    };
  }
}

const template = new Enemy(0, "Template", 100, 100, 5, 3, 0.1, 0.7, 10);
template.generateAttack(
  "Charge",
  0,
  "Charge",
  "L'épouvantail se place à un angle de 60° et s'envole droit sur vous !",
  "charge",
  1500,
  "earth"
);
template.generateAttack(
  "Jet de Paille",
  1,
  "Jet de Paille",
  "L'épouvantail s'est fabriqué une sarbacane, et vous envoie ses tiges de paille à la figure !",
  "jetDePaille",
  3000,
  "earth"
);
template.generateAttack(
  "Soins",
  0,
  "Soins",
  "L'épouvantail ramasse quelques-uns de ses morceaux tombés au sol et se reconstitue comme il peut !",
  "classicHeal",
  3000,
  "earth"
);

console.dir(template);
console.log(template.combatData.attacks);

/*
combatData: {
  attacks: [
    {
      id: 1,
      name: "Charge",
      timer: 0, //# de tours avant l'attaque (l'unité est le nombre de tours a s'écouler avant d'attaquer)
      descriptionBeforeAttack: null,
      description: "L'épouvantail se place à un angle de 60° et s'envole droit sur vous !",
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
      (enemy) => enemy.combatData.attacks[2].descBeforeAtk,
      (enemy) => enemy.combatData.attacks[1].descBeforeAtk,
    ],
  },
},*/
