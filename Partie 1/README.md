# Mini Projet : Quiz interactif Partie 1


# Description

Ce projet est un quiz interactif développé en HTML, CSS et JavaScript. Il inclut un système de score, un chronomètre et un mécanisme de validation des réponses.

# Contenu du projet

quiz.html : Structure principale du quiz, style css (intégrés directement dans le fichier HTML) et script js (aussi intégré directement dans le fichier HTML) pour l'experience quiz-utilisateur. 

# Fonctionnalités

- Affichage d'un quiz à choix multiples.<br>
- Chronomètre de 50 secondes.<br>
- Score en temps réel basé sur les réponses correctes.<br>
- Validation des réponses avec désactivation des options après soumission.<br>
- Défilement automatique vers le haut après la soumission.


# Exécution

- Ouvrir le projet dans GitHub Codespaces : 

Depuis GitHub, clique sur Code > Codespaces > Create codespace on main.

- Installer l'extension "Live Preview" dans VS Code.

- Ouvrir index.html et clique sur l'icône de prévisualisation.

- Vous pouvez copier le lien et ouvrir sur un nouveau browser. 

# Explication du Code

1. Chronomètre

Le chronomètre commence à 50 secondes et diminue chaque seconde.<br>
Lorsqu'il atteint 0, le quiz se bloque et un message d'alerte s'affiche.

2. Système de Score

Chaque question a un attribut correctAnswer.<br>
Lors de la soumission, le script compare les réponses choisies avec celles correctes et met à jour le score.

3. Validation du Quiz

Après soumission, le score est mis à jour et toutes les options sont désactivées pour éviter des modifications.<br>
La page remonte automatiquement après validation.

# Amélioration possible

Ajout d'un système de correction qui affiche les bonnes réponses après soumission.
