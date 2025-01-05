# Gestion Surveillance

## Frontend - Description et Installation

### Description

Le frontend de "Gestion Surveillance" est une application React qui permet de visualiser et de gérer les informations relatives aux examens, modules, départements, enseignants et locaux. Il interagit avec le backend via des API RESTful pour récupérer et afficher les données.

---
# Table des matières

1. [Gestion Surveillance](#gestion-surveillance)

   - [Prérequis](#prérequis)
   - [Installation](#installation)


2. [Services utilisés](#services-utilisés)


3. [Architecture du projet](#architecture-du-projet)
---



### Prérequis

- Node.js (version 14 ou supérieure)

- npm (version 6 ou supérieure)

### Installation

1. Clonez le repository du frontend :

```bash

git clone https://github.com/Anejjar24/Gestion-surveillance-react-front.git
```

2. Accédez au répertoire du projet :

```bash

cd Gestion-surveillance-react-front-main

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



### Services utilisés

* Axios pour effectuer des requêtes HTTP

* React Router Dom pour la gestion des routes

### Architucture du projet

```
src/
├── api/                # 🔌 APIs et services REST
├── assets/            # 🎨 Ressources statiques (images, styles, fonts)
├── components/        # 🧩 Composants réutilisables
├── context/          # 🌍 Contextes React
├── examples/         # 📚 Exemples et démonstrations
├── layouts/          # 📐 Layouts et templates
├── modals/           # 💫 Fenêtres modales
├── services/         # ⚙️ Services et logique métier (axios et appels Rest)
├── App.js           # 📱 Composant principal
├── index.js         # 🚀 Point d'entrée
└── routes.js        # 🛣️ Configuration des routes

Configuration Files/
├── .env              # 🔐 Variables d'environnement
├── .eslintrc.json    # 📝 Configuration ESLint
├── .gitignore        # 🙈 Fichiers ignorés par Git
├── .npmrc            # 📦 Configuration NPM
├── .prettierrc.json  # 💅 Configuration Prettier
├── CHANGELOG.md      # 📋 Journal des modifications 
├── genezio.yaml      # ⚙️ Configuration Genezio
├── ISSUE_TEMPLATE.md # 🐛 Template pour les issues
├── jsconfig.json     # 🛠️ Configuration JavaScript
├── LICENSE.md        # 📄 Licence du projet
├── package-lock.json # 🔒 Versions exactes des dépendances
└── package.json      # 📦 Configuration du projet et dépendances
```
