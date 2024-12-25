# Stats Expliquées

## Attaque (max) (ou Force)

- La Force permet de définir le **nombre de dégâts qu'un personnage peut infliger**.
- L'attaque est **calculée en fonction de la défense adverse**.
- La formule pour calculer l'attaque est la suivante :
  - `dégâts bruts = Force - ((( 1 - Adresse%) * Max(0, (RNG - Chance%)) * Force)`

- Exemple avec une Force de 100, une Adresse de 50 et un RNG de 20% : `dégâts = 81` / avec un RNG de 0.8, `dégâts = 60`
- **La range de dégâts bruts** est comprise entre `[Force ; Force * Adresse]`
- **La range de dégâts nets** est comprise entre `[Force - DéfenseMaxAdv ; Force * Adresse - DéfenseMaxAdv]`
- Exemple avec une Force de 100, une Adresse de 50 et face à une DéfenseMax de 30: `[70 ; 20]`
- Des **coups critiques** seront également disponibles. Ils seront appliqués avec une stat "Chance".

### Coups critiques (chance)

- Les coups critiques sont calculés **en fonction de la Chance du Héros**.
- Lorsqu'un coup critique est donné, les **dégâts sont multipliés par deux**.
- La probabilité de faire un coup critique est par défaut de **10%**.
- Plus la chance du personnage est élevée, plus la probabilité de coup critique augmente, jusqu'à atteindre un **palier de 50%.**
- **1 pt de chance équivaut à 1% de probabilité de faire un coup critique supplémentaire.**
- Par défaut, **le Héros a une chance égale à 0.**

## Défense

- La défense est calculée lors de l'attaque, qu'elle soit adverse ou notre.
- La défense permet de soustraire quelques dégâts et est calculée avec la formule suivante :
  - `dégats nets = (100 - défense)% * dégâts bruts`
  - Soit, face à une **attaque brute de 100** contre une **défense de 15**, le résultat est le suivant : **dégâts nets = 85**

## Chance
- La Chance représente **la probabilité de faire un coup critique**, ou de **favoriser un RNG**.
- A chaque fois qu'un RNG est joué, la **Chance du Héros intervient** dans le calcul **en faveur de celui-ci**.
- Par exemple, lorsque le Joueur attaque avec une Chance de 10, le RNG calculé aura une range de `[0; 1 - Chance%]` soit `[0; 90%]`.
- Donc en faveur du Héros, puisque ses dégâts bruts ne sont plus compris entre `[100 ; 50]` mais entre `[100 ; 55]`.

## Adresse

- L'adresse définie la **variance de dégâts entre les dégâts bruts max et les dégâts bruts minimum**.
- Plus l'adresse est élevée, plus les dégâts sont proches de l'attaque max. (attaque précise)

## Santé

- La Santé représente la santé du joueur.
- Si elle tombe à 0, le joueur perd la partie et doit recommencer au dernier checkpoint.

## Mental

- Le Mental représente **la capacité au Héros de pouvoir démarrer en premier lors d'un combat**, **la capacité de pouvoir fuir le combat**, **la capacité pour Era de pouvoir bien healer**, aussi, **la capacité à remplir rapidement sa COLERE**.
- Le personnage ayant le Mental la plus élevée démarre en premier.
- Si l'un des personnages a 2x plus de Mental que l'autre, il aura une **chance de 20%** de pouvoir jouer deux fois d'affilées. **Effets inclus.** `(L'attaque rapide de Vifou lui permettrait de pouvoir jouer trois fois d'affilées par exemple.)`
- Pour la `fuite` :
  - Si le joueur a plus de Mental que l'ennemi, la probabilité de pouvoir fuir est de 100%.
  - Sinon, la probabilité de pouvoir fuir est de 50%.
- Pour la `COLERE` :
  - La COLERE est accumulée **en fonction des dégâts que le personnage a subis**.
  - Le seuil de **300% d'HP perdu** est fixé pour déclencher la COLERE.
  - Le Mental est un **multiplicateur de points** et est calculé ainsi : 
    - `Points de COLERE reçus (en %) = (Mental / 100) * (Dégâts nets / (SantéMax * 300))`
    - Exemple avec *100 dégâts nets* reçus et une *SantéMax de 200* et un *Mental de 150* : `1.5 * (100 / 600) = 0.25` pts de COLERE reçus (au lieu de 0.1666 avec un Mental de 100)

### Mental - Petit Aparté Concernant l'Attaque Par Surprise

- Ces attaques **apparaissent** lorsque le joueur entre dans une salle **où des mobs sont présents**.
- Lors d'une attaque surprise, ce sera **toujours le mob qui commence en premier**.
- Si le joueur a **moins de Mental que l'ennemi**, l'ennemi aura une **chance de 50%** de pouvoir attaquer par surprise.
- Sinon, le joueur pourra choisir de lancer l'attaque ou non.

## Le Level

- Chaque personnage possède un **niveau**.
- A chaque niveau gagné, les personnages augmentent leurs stats.

### Tableau des stats

#### Héros

| Niveau | Force  | Défense (%) | Mental | Santé | Chance (%) | Adresse (%) |
| ------ | -----  | ----------- | ------ | ----- | ---------- | ----------- |
| 1      | 100    | 0           | 100    | 200   | 0          | 50          |
| 2      | 150    | 5           | 110    | 300   | 0          | 52          |
| 3      | 250    | 8           | 120    | 500   | 0          | 55          |
| 4      | 400    | 13          | 150    | 800   | 0          | 58          |
| 5      | 700    | 21          | 170    | 1200  | 0          | 63          |
| 6      | 1000   | 28          | 220    | 2000  | 0          | 70          |
| 7      | 1800   | 33          | 300    | 3200  | 0          | 80          |

#### Vifou

| Niveau | Force  | Défense (%) | Mental | Santé | Chance (%) | Adresse (%) |
| ------ | -----  | ----------- | ------ | ----- | ---------- | ----------- |
| 1      | 70     | 0           | 100    | 120   | 5          | 70          |
| 2      | 105    | 2           | 120    | 200   | 6          | 72          |
| 3      | 175    | 4           | 150    | 300   | 7          | 75          |
| 4      | 280    | 7           | 200    | 420   | 8          | 78          |
| 5      | 490    | 10          | 280    | 770   | 9          | 82          |
| 6      | 700    | 13          | 330    | 1200  | 10         | 85          |
| 7      | 1260   | 18          | 400    | 2100  | 15         | 90          |


#### Era

| Niveau | Force  | Défense (%) | Mental | Santé | Chance (%) | Adresse (%) |
| ------ | -----  | ----------- | ------ | ----- | ---------- | ----------- |
| 1      | 20     | 5           | 80     | 100   | 5          | 60          |
| 2      | 30     | 8           | 120    | 120   | 6          | 63          |
| 3      | 50     | 15          | 200    | 200   | 7          | 66          |
| 4      | 80     | 22          | 360    | 340   | 8          | 72          |
| 5      | 150    | 30          | 480    | 520   | 9          | 78          |
| 6      | 200    | 38          | 800    | 750   | 10         | 82          |
| 7      | 300    | 45          | 1600   | 1100  | 15         | 85          |

#### Grisouille

| Niveau | Force  | Défense (%) | Mental | Santé | Chance (%) | Adresse (%) |
| ------ | -----  | ----------- | ------ | ----- | ---------- | ----------- |
| 1      | 80     | 0           | 50     | 250   | 0          | 80          |
| 2      | 120    | 1           | 65     | 400   | 1          | 81          |
| 3      | 200    | 2           | 90     | 700   | 2          | 83          |
| 4      | 320    | 3           | 120    | 1000  | 3          | 86          |
| 5      | 560    | 5           | 150    | 1600  | 4          | 89          |
| 6      | 800    | 8           | 180    | 2400  | 5          | 93          |
| 7      | 1500   | 13          | 250    | 4200  | 6          | 97          |

#### Snow

| Niveau | Force  | Défense (%) | Mental | Santé | Chance (%) | Adresse (%) |
| ------ | -----  | ----------- | ------ | ----- | ---------- | ----------- |
| 1      | 80     | 10          | 150    | 120   | 5          | 80          |
| 2      | 120    | 15          | 180    | 200   | 7          | 81          |
| 3      | 180    | 22          | 220    | 300   | 9          | 83          |
| 4      | 230    | 28          | 280    | 450   | 12         | 86          |
| 5      | 280    | 34          | 350    | 800   | 15         | 89          |
| 6      | 330    | 40          | 420    | 1300  | 20         | 93          |
| 7      | 400    | 48          | 550    | 2100  | 25         | 99          |

#### Choco

| Niveau | Force  | Défense (%) | Mental | Santé | Chance (%) | Adresse (%) |
| ------ | -----  | ----------- | ------ | ----- | ---------- | ----------- |
| 1      | 60     | 3           | 80     | 120   | 2          | 60          |
| 2      | 90     | 5           | 110    | 200   | 3          | 62          |
| 3      | 120    | 8           | 160    | 360   | 4          | 65          |
| 4      | 160    | 11          | 300    | 520   | 5          | 68          |
| 5      | 230    | 14          | 550    | 830   | 6          | 73          |
| 6      | 280    | 17          | 920    | 1220  | 8          | 78          |
| 7      | 360    | 22          | 1600   | 2100  | 10         | 80          |