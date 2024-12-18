// utils/combatUtils.js
export const calculateDamage = (attack, accuracy, chance) => {
    let baseDamage = attack - (1 - accuracy) * Math.random() * attack;
    if (Math.random() >= 1 - chance) baseDamage *= 2;
    return Math.max(0, Math.round(baseDamage));
  };
  