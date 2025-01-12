# Le Système de Combat

## A base d'Objets
- Le système de combat est basé sur des objets.
- Chaque objet possède des propriétés, et des méthodes.
- Le Composant Combat qui sera monté lorsqu'un combat est détecté, s'occupera simplement de gérer les objets.
- Il fera la correspondance entre les objets et les actions. Gérera leurs interactions.
- Il s'occupera également de gérer les animations.

- J a Gauche
- Ennemi(s) à droite
## Les ennemis
- Il peut y avoir plusieurs ennemis.
- Chaque ennemi possède ses propres stats, et ses propres attaques.
- L'ordre des attaques est déterminé dans une méthode de l'objet ennemi. Chaque ennemi aura une méthode `orderAttack` qui lui permettra de définir quelle attaque sera utilisée à chaque tour.
- Certaines se déclenchent sous conditions, sinon c'est une autre par défaut qui s'enclenche.
  - Par exemple, un ennemi peut en heal un autre si l'un d'eux a moins de 30% de HP
- Pour gérer les interactions entre eux, les ennemis seront des **sous-composants** d'un composant principal qui gérera les props entre elles.
- Un **composant principal** <GroupEnemy> sera créé dans le composant <Combat>.
- <GroupEnemy> aura en props passée un tableau contenant des objets Enemy.
- Ce tableau sera mappé dans le JSX, et chaque Enemy sera un composant <Enemy> par défaut, ainsi qu'un <sous-composant personnalisé> si besoin
  - Par exemple :

## Le Combattant 

- Cela peut être :
  - Le Héros.
  - Vifou
  - Era
  - Grisouille
  - Snow
  - Choco

### 1. Heros
1. Attaque : 
   - Frapper 
   - Dégâts : Force
   - Type : Normal 

2. Colère :
  - Multi-attaque
  - Dégâts : Force * 3
  - Type : Normal - Perçant

### 2. Vifou
1. Attaque : 
   - Griffes rapides
   - Dégâts : Force * 0.7
   - Type : Terre
   - Effet : Permet de rejouer le tour suivant (une seule fois)

2. Colère :
  - Grandes Morsures
  - Dégâts : Force * 2.2
  - Type : Terre - Perçant
  - Effet : Permet de rejouer le tour suivant

### 3. Era
1. Attaque : 
   - Léchouilles
   - Heal
   - Effet :  : Mental * 1 * Adresse * (RNG - Chance) ou 30% d'HP minimum si la base ne permet pas d'atteindre ce seuil. (Sur tout les personnages)

2. Colère :
  - Crachouilles
  - Toute l'équipe génère 2x dégâts pendant 3 tours et régénère 100% des HP.

### 4. Grisouille

1. Attaque : 
   - Morsure
   - Dégâts : Force * 1.5
   - Type : Terre

2. Colère :
  - Coup De Queue
  - Dégâts : Force * 2.5
  - Type : Terre - Perçant
  - Effet : Inflige des dégâts à tous les ennemis simultanément.

### 5. Snow
1. Attaque : 
   - Parler
   - Effet : Il peut se passer plusieurs choses :
     - Snow peut gagner des objets
     - L'ennemi peut s'affaiblir en discutant
     - L'équipe peut gagner des stats bonus durant le combat
     - L'ennemi peut abandonner le combat
     - Il peut aussi ne rien se passer (bref que du + sinon rien)
     - Passe le tour ensuite
2. Colère :
  - Hurlement
  - Effet : Renforce la défense de toute l'équipe de 300%, et régénère au minimum les HP jusqu'à 80%, sinon ils sont régénérés au maximum au délà de ce seuil.

### 6.  Choco
1. Attaque :
   - Crachat enflammé
   - Dégâts : Mental * 1 * Adresse * (RNG - Chance)
   - Type : Feu
  
2. Colère :
   - Souffle de feu
   - Dégâts : Mental * 2.5 * Adresse * (RNG - Chance)
   - Type : Feu - Perçant
   - Effet : Brûle l'adversaire - Il perd 3% de ses HP pendant 3 tours

## La fenêtre de description
- Elle sera **dynamique**, et affichera tout ce qui se passe dans le combat.
- Chaque tour, il y aura un **saut à la ligne** pour la prochaine description.
- Les descriptions peuvent être très longues, et un **overflow** peut se produire si le combat dure.

## Les actions
- Chaque personnage possède **deux actions** qui lui sont uniques : 1. **Attaque** et 2. **Colère**.
- Ensuite, les autres sont des **actions communes** à tous les personnages.
- "**Se Défendre**", "**Utiliser**" et "**Fuir**" sont les actions communes.

### Se défendre
- Permet de **se protéger** des attaques des ennemis.
- La défense **augmente de 300%** jusqu'au prochain tour.

### Utiliser
- Permet d'**utiliser** un **objet activable** en combat.
- L'objet est **déclenché et détruit**.
- Exemple : Joueur utilise une `Potion de santé`.
  - Son Personnage récupère x pts de Santé, et la potion est retirée de l'équipement.

### Fuir
- Permet de **fuir le combat en cours**.
- Si l'initiative du personnage est plus élevée que l'ennemi, la fuite a **100% de chance** de succès.
- Sinon, la fuite a **50% de chance** de succès.

## COLERE
- **Attaque spéciale** lorsque les personnages ont pris un certain nombre de dégâts.
- Le nombre de points de COLERE accumulé est **calculé en fonction du Mental** du Personnage. (Plus de détails dans les Stats)

## FIN DU COMBAT

### Distribution de l'EXP
- **Pour chaque personnage** ayant participé au combat, il **recevra l'EXP que l'ennemi distribue**.
- Si l'ennemi distribue 50 EXP par exemple, et que le Joueur n'a joué qu'avec le Héros, alors, seul Héros recevra 50 EXP.
- Si le Joueur joue avec d'autres personnages, alors, l'EXP est un peu splittée de cette manière :
  - 1 Personnage = 100 % EXP
  - 2 Personnages = 90 % EXP/Perso
  - 3 Personnages = 80 % EXP/Perso
  - 4 Personnages = 70 % EXP/Perso
  - 5 Personnages = 60 % EXP/Perso !! Max d'EXP pouvant être récupéré !!
  - 6 Personnages = 50 % EXP/Perso !! Max d'EXP pouvant être récupéré !!
- Cela incite le joueur a jouer avec tout le monde.
- Un Personnage qui a **participé au combat** est un Personnage ayant effectué **une action lors de son tour**.
- On coche chaque Personnage qui a participé au combat, et à la fin, on fait le calcul de l'EXP.