Ce Fichier contient les stats des ennemis.

# Epouvantail
- **Stats** : 
  - Force : 10
  - Défense : 5
  - Chance : 0
  - Adresse : 70
  - Santé : 200
  - Mental : 0

- **Résistances** :
  - Feu : 0;
  - Eau : 0;
  - Terre : 0;
  - Physique : 0;

- **Didacticiel**
- **Attaques** :
  - **Charge**
    - **Cas d'utilisation** : Juste après "Tirs de Paille", sinon *Standard*
    - **Dégâts** : Force * 1 * Adresse * (RNG - Chance)
    - **Effet** : *Pas d'effet*
    
  - **Reconsolidation**
    - **Cas d'utilisation** : Si vie inférieure à 50% - (usage unique)
    - **Dégâts** : *Pas de dégâts*
    - **Effet** : Heal - Santé + 50

  - **Tirs de paille**
    - **Cas d'utilisation** : Juste après "Reconsolidation"
    - **Dégâts** : Force * 2 * Adresse * (RNG - Chance)
    - **Effet** : *Pas d'effet*

- **Système d'actions** :
  1. "*Reconsolidation*" est prioritaire.
  2. Si "*Reconsolidation*" a été déjà été jouée, alors "*Tirs de paille*" est prioritaire.
  3. Sinon, on joue "*Charge*".

- **Gains** :
  1. Chapeau de paille
  2. Expérience : 10
  
- **Descriptions** :
  - **Intro** :
    - L'épouvantail se dresse face à vous, le regard fixe. Il a l'air totalement indifférent face à vos provocations.
  
  - **Turns** :
    - L'épouvantail se pavane fièrement en attendant que vous ayez fini de vous décider.
    - L'épouvantail essaie de se curer le semblant de nez dessiné sur son visage en attendant que vous ayez fini de réfléchir.
    - L'épouvantail tente de s'asseoir sur le rocher à côté de la porte pour se reposer, mais constate qu'il n'a pas les articulations nécessaires pour effectuer cette action.
  
  - **Pré-Attaques** :
    - **Attaque à venir** : "Charge"
      - **Pré-Description** : *Pas de pré-description*
      - **Description** : "L'épouvantail se place à un angle de 60° et s'envole droit sur vous !"

    - **Attaque à venir** : "Reconsolidation"
      - **Pré-description** : "L'épouvantail s'abaisse vers le sol, il semble préparer une grosse attaque."
      - **Description** : "L'épouvantail récupère ses morceaux tombés au sol et se reconstitue comme il peut."

    - **Attaque à venir** : "Tirs de paille"
      - **Pré-description** : "L'épouvantail se comporte de manière étrange. Il arrache vigoureusement ses tiges de paille qui le composent."
      - **Description** : "L'épouvantail s'est fabriqué une sarbacane, et vous envoie ses tiges de paille à la figure !"
