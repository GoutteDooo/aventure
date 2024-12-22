# Le Système de Combat
- J a Gauche
- Ennemi(s) à droite
## Les ennemis
- Il peut y avoir plusieurs ennemis.
- Chaque ennemi possède ses propres stats, et ses propres attaques.
- L'ordre des attaques est prédéfini à l'avance.
- Certaines se déclenchent sous conditions, sinon c'est une autre par défaut qui s'enclenche.
  - Par exemple, un ennemi peut en heal un autre si l'un d'eux a moins de 30% de HP
- Pour gérer les interactions entre eux, les ennemis seront des **sous-composants** d'un composant principal qui gérera les props entre elles.
- Un **composant principal** <GroupEnemy> sera créé dans le composant <Combat>.
- <GroupEnemy> aura en props passée un tableau contenant des objets Enemy.
- Ce tableau sera mappé dans le JSX, et chaque Enemy sera un composant <Enemy> par défaut, ainsi qu'un <sous-composant personnalisé> si besoin
  - Par exemple :

## Le Joueur

## La fenêtre de description

## Les actions

## COLERE