// utils/combatUtils.js
export const calculateDamage = (attack, accuracy, chance) => {
    let baseDamage = attack - (1 - accuracy) * Math.random() * attack;
    if (Math.random() >= 1 - chance) baseDamage *= 2;
    return Math.max(0, Math.round(baseDamage));
  };
  

  
  /**
   * @param {object} researchingAttack - attack
   * @returns {boolean}
   */
  /**
   * Cherche s'il y'a une descBeforeAtk et retourne true le cas échéant sinon false */
  export const findDescBeforeAtk = (researchingAttack) => {
    if (researchingAttack.hasDescBeforeAtk) return true;
    return false;
  };