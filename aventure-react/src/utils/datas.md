# stats expliquées

## Attaque (max)

- L'attaque est calculée en fonction de la défense adverse.
- La formule pour calculer l'attaque est la suivante :
- `dégâts bruts = attaque - ((( 1 - %adresse) * rng) * attaque)`
- exemple avec une atk de 10, une adresse de 0.5 et un rng de 0.2 : dégâts = 9 et rng de 0.8 = 6
- La range de dégâts est comprise entre [attaque ; attaque * adresse]
- Des coups critiques seront également disponibles. Ils seront appliqués avec une stat "Chance".

## Défense

- La défense est calculée lors de l'attaque, quelle soit adverse ou notre.
- La défense permet de soustraire quelques dégâts et est calculée avec la formule suivante :
  - `dégats nets = dégâts bruts - défense`
  - Soit, avec une atk de 10 contre une défense de 5, une adresse de 0.5 et une rng de 0.2, le résultat est le suivant : dégâts nets = 9 - 5 = 4

## Coups critiques (chance)

- Les coups critiques sont calculés en fonction de la chance du personnage.
- Lorsqu'un coup critique est donné, les dégâts sont multipliés par deux.
- La probabilité de faire un coup critique est par défaut de 10%.
- Plus la chance du personnage est élevée, plus la probabilité de coup critique augmente, jusqu'à atteindre un palier de 50%.
- 1 pt de chance équivaut à 1% de probabilité de coup critique supplémentaire.
- Par défaut, le joueur a une chance égale à 0.

## Adresse

- L'adresse définie la variance de dégâts entre l'attaque max et l'attaque minimum.
- Plus l'adresse est élevée, plus les dégâts sont proches de l'attaque max.

## Vie

- La vie représente la santé du joueur.
- Si elle tombe à 0, le joueur perd la partie et doit tout recommencer à zéro.

## Initiative

- L'initiative représente la capacité au joueur de pouvoir démarrer en premier lors d'un combat.
- Plus son initiative est élevée, plus le joueur aura de chance de démarrer en premier.
- Cela dit, ça ne veut pas dire que le joueur démarrera toujours en premier, une variance sera appliquée, notamment en cas d'attaque par surprise.
- La formule de l'initiative est la suivante :
  - Chance de jouer le premier = `0.5 * 1,%(Initiative(Joueur) - Initiative(Adversaire))`
  - Un min à 0.0333 et un max a 0.9666 sont définis.
  -

### Concernant l'attaque par surprise
