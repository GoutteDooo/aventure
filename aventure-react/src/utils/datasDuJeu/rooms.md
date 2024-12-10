# Les Salles

## Les enfers

- Les salles "Enfer" représentent l'enfer qu'on vit lorsqu'on est confronté à ses démons intérieurs. Cela peut représenter différents états/émotions : la peur, la solitude, le désespoir...
- Les salles "Enfer", si elles sont passées, représentent un gros step up pour le joueur. Il sera **admirablement récompensé en EXP**, et il pourra récupérer une **autre récompense** comme un **sort puissant** ou une **augmentation de ses stats**.

- La salle **"Enfer 1"** (je trouverais un autre nom), où le joueur est confronté à ses **incertitudes**, qui, s'il fait les mauvais choix, se transforment peu à peu en désespoir, et il devra retourner dans la salle plus tard pour trouver la solution. Qui sera de se calmer, et de ne rien répondre.
  - Il y aura des messages du type **"Je ne suis pas assez fort pour combattre Zrog..."**
  - et des **réponses** apparaîtront comme "C'est vrai... Je devrais repartir m'entraîner", ou "Si, je suis suffisamment fort !" (mode pensée positive mais ça ne fonctionne pas), et ces réponses "pensée positive" entraîneront de nouveaux doutes comme "D'accord, mais... Zrog a plus d'attaque...", et il y'aura toujours quelque chose qui ne va pas. Car c'est la réalité : Zrog sera toujours plus fort physiquement que le joueur.
  - Les réponses types "c'est vrai, je ne suis pas assez fort" entretiennent l'état incertain du joueur, et donc le font reculer jusqu'à sortir de la salle.
  - Un texte dynamique sera au centre de l'écran affichant ".", puis "..", puis "..." et recommmençant à zéro à chaque fois qui représentera la respiration. Par ailleurs, lorsque le joueur cliquera sur une réponse, le texte affiché sera celui de la réponse, supprimant les ".", car le perso ne respire plus quand il parle.
  - La seule manière de réussir cette étape, sera de **ne rien sélectionner pendant un long moment**. Le texte affiché partira, en affichant un autre du même type "Je ne suis pas assez bla bla...", puis un autre, qui commencera à s'effacer petit à petit, "... ne suis pas assez", "... pas assez...", "assez...", et les "assez" qui grandit et prend tout l'écran jusqu'à s'effondrer.
  - Une fois fini (le perso est entré en état méditatif), le joueur récupère le sort **"Focus"** qui permet de sacrifier un tour pour pouvoir infliger entre 2 et 3 coups critiques d'affilées aux tours suivants et une **bonne initiative**.
  
- La salle **Enfer 2** sera une autre salle au 1er ou 2eme étage, où le joueur sera confronté à ses peurs irrationnelles.
  - Un cri de dragon sera entendu à travers la porte. Le personnage va supposer que c'est Zrog et un texte apparaîtra du type "Quoi ? Zrog est derrière cette porte ?", et un texte décrivant la peur que ressent le personnage à cet instant précis apparaîtra.
  - Le joueur aura le choix entre **ouvrir la porte** ou **repartir**, mais à chaque fois qu'il tentera d'ouvrir la porte, de multiples confirmations seront demandées.
    - "Mais... Si j'ouvre cette porte... je vais tomber nez à nez avec Zrog, et il a sans aucun doute plus d'initiative que moi... Ce qui veut dire qu'il va commencer en premier, et son attaque est de 400 (on l'a vu au début, il y'aura une conversation entre lui et le dragon (ou l'épouvantail lui dit ?)), il va me tuer d'un seul coup et je n'aurais rien pu faire... Il vaudrait mieux que je rebrousse chemin pour m'entraîner et devenir meilleur."
    - D'autres confirmations seront demandées, jusqu'à une **ultime confirmation** avec `window.alert` : "Êtes-vous sûr d'ouvrir cette porte ? (Si votre personnage meurt, vous perdrez toute votre progression et devrez redémarrer à zéro.)"
    - Si le joueur accepte, la porte s'ouvrira et un combat contre une **Sorcière** démarrera.
    - Il s'avère que c'est la même Sorcière qui a ensorcellé son frère, et qui a entretenu le mal en lui toute sa vie.
    - *Je n'ai pas encore le déroulé du combat, mais la Sorcière ne mourra pas. J'imagine un ultime combat après que Zrog ait été pardonné, la Sorcière reprend le dessus et là je n'ai pas encore d'idées sur comment ça va se finir*