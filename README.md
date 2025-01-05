# Gestion Surveillance

## Description

"Gestion Surveillance" est une application développée pour gérer la surveillance des examens dans une institution éducative. Elle permet de gérer les examens, les modules, les départements, les enseignants, ainsi que les locaux où les examens se dérouleront. Ce projet se compose de deux parties : un Frontend développé en React et un Backend développé avec Spring Boot.

---

## Table des matières

- [Frontend - Description et Installation](#frontend---description-et-installation)



---

## Frontend - Description et Installation

### Description

Le frontend de "Gestion Surveillance" est une application React qui permet de visualiser et de gérer les informations relatives aux examens, modules, départements, enseignants et locaux. Il interagit avec le backend via des API RESTful pour récupérer et afficher les données.

### Prérequis

- Node.js (version 14 ou supérieure)

- npm (version 6 ou supérieure)

### Installation

1. Clonez le repository du frontend :

```bash

git clone https://github.com/votre-utilisateur/gestion-surveillance-frontend.git

```

2. Accédez au répertoire du projet :

```bash

cd gestion-surveillance-frontend

```

3. Installez les dépendances :

```bash

npm install

```

4. Lancez l'application en mode développement :

```bash

npm start

```

L'application sera disponible à l'adresse suivante : http://localhost:3000

### Fonctionnalités

 *Authentification** : Connexion et gestion des utilisateurs

 *Affichage des examens** : Visualisation des examens programmés, tri par date et type

 *Gestion des modules** : Consultation des modules associés aux examens

 *Gestion des locaux** : Liste des locaux disponibles et associés aux examens

 *Gestion des départements** : Accès aux départements, options et modules associés

### Services utilisés

* Axios pour effectuer des requêtes HTTP

* React Router pour la gestion des routes

* React-Redux pour la gestion de l'état global de l'application
