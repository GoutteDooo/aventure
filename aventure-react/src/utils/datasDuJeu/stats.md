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
- Cela dit, ça ne veut pas dire que le joueur démarrera toujours en premier, une variance sera appliquée.
- La formule de l'initiative est la suivante :
  - Chance de jouer le premier = `0.5 * 1,%(Initiative(Joueur) - Initiative(Adversaire))`
  - Un min à 0.0333 et un max a 0.9666 sont définis.
  -

### Concernant l'attaque par surprise

- Ces attaques apparaissent lorsque le joueur entre dans une salle où des mobs sont présents.
- Lors d'une attaque surprise, ce sera toujours le mob qui commence en premier.
- Lorsque le joueur entre dans une salle ou un mob est présent, il y aura 25% de chance d'attaque surprise par défaut. Ensuite, cela varie entre l'initiative du mob et celle du joueur.
- La formule de la variance de l'attaque surprise se calcule ainsi :
  - P(surprise) = max(Pmin, min(Pmax, base + diff \* facteur))
  - avec Pmin définie a 3% et Pmax a 90%.

## Le Level

- Je pense à faire un système qui reflète le caractère du joueur.
- Par exemple :
  - Si le joueur aime attaquer dans les combats, ce sera son attaque qui augmentera principalement
  - S'il aime se protéger, ce sera sa défense
  - S'il aime utiliser de la magie, sa magie sera priorisée
  - S'il aime fuir, ce sera plutôt son initiative
  - S'il prend bcp de dégâts, ce sera sa santé max.
  - Toutes les stats prendront quoi qu'il arrive, mais le caractère du joueur influencera la distribution des points gagnés.
  - Seule la chance ne prendra pas. Il faudra trouver des éléments pour combler cette stat. (le chapeau de paille prendra avec le temps mais le joueur devra le remarquer)
- J'imagine un système progressif. Plus le level du joueur est élevé, plus les points gagnés pour la distribution des stats seront nombreux. Quelque chose comme ça par exemple (Fibonacci) :

| level | points gagnés |
| ----- | ------------- |
| 1     | X             |
| 2     | 2             |
| 3     | 3             |
| 4     | 5             |
| 5     | 8             |
| 6     | 13            |
| 7     | 21            |
| 8     | 34            |
| 9     | 55            |
| 10    | 89            |

| Caractère du joueur | Stat priorisée | Points pris | Points restants à répartir|
| ------------------- | -------------- | ----------- | ------------------------- |
| Attaque             | Attaque        | 60%         | 40%                       |
| Défense             | Défense        | 40%         | 60%                       |
| Magie               | Chance         | 33%         | 67%                       |
| Fuite               | Initiative     | 80%         | 20%                       |
| Tank                | maxHealth      | 50%         | 50%                       |

- Une fois que le caractère dominant du joueur est tracé, il suit son cours au fil du jeu.
- Le caractère peut changer en cours de jeu.
- Un caractère se renforce au fur et à mesure des actions jouées qui vont dans son sens. Mais la valeur d'un caractère atteint un plafond à un moment donné pour ne pas que le caractère devienne irratrapable lors d'un revirement de comportement de la part du joueur.
- Un caractère qui a été "débloqué" précédemment perd de la valeur lorsqu'il est remplacé par un autre, mais prends beaucoup moins de temps à repartir.
- Je pense m'inspirer une nouvelle fois de la suite de Fibonacci pour déterminer un trait de caractère.
- Le caractère prend de la valeur après chaque combat.

### Arbre des compétences
- Il y'aura un arbre des compétences.
- Chaque level gagné offre plusieurs points de compétences à distribuer dans l'arbre des compétences.
- Chaque branche de l'arbre détermine une spécialité
- Attaque / Vie ou Défense / Magie
  
| Niveau br | Attaque | Vie/Défense | Magie |
| --------- | ------- | ----------- | ----- |
| 1         | +2 Atk  | +10 Santé   | Feu   |
| 2         |         | +5 Défense  |       |
| 3         |         | "Se blinder"|       |
| 4         | +15 Atk | +50 santé   |       |
| 5         |         |             |       |
| 6         |         |             |       |
| 7         | Perce 50% de la défense adv |             |       |