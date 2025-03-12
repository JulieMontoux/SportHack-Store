# SportHa@ck Store

Bienvenue sur le projet **SportH@ck Store**, une boutique en ligne d’articles de sport conçue dans l’esprit pédagogique de l’application OWASP Juice Shop. Ce projet propose deux modes : **vulnérable** et **sécurisé**, permettant de découvrir et corriger des failles de sécurité applicatives courantes tout en manipulant une application fonctionnelle.

---

## 📦 Objectif du projet

L'objectif principal de ce projet est de sensibiliser les développeurs et étudiants à la cybersécurité applicative à travers un cas concret. L’utilisateur peut interagir avec l’application en mode "vulnérable" pour observer les impacts des failles, puis basculer en mode "sécurisé" pour étudier leur correction.

Ce projet est également un excellent support pédagogique pour les démonstrations en formation, les travaux pratiques ou les présentations techniques.

---

## 💻 Technologies utilisées

- **Frontend** : React.js (gestion des vues, appels API, composants dynamiques)
- **Backend** : Node.js avec Express (API REST, logique métier, sécurisation des routes)
- **Base de données** : MySQL (stockage des utilisateurs, commandes, produits)
- **Déploiement** : Docker & Docker Compose (environnement reproductible, simple à installer)
- **Authentification** : JWT (JSON Web Token)

---

## 🔁 Modes d'exécution

L’application propose deux modes de fonctionnement :

| Mode           | Description                                                                          |
| -------------- | ------------------------------------------------------------------------------------ |
| **Vulnérable** | Les failles OWASP sont activées, permettant de simuler une application non sécurisée |
| **Sécurisé**   | Les failles sont corrigées, l'application respecte les bonnes pratiques de sécurité  |

Le mode s’active via une variable d’environnement `VULNERABLE=true` ou `VULNERABLE=false` dans le fichier `.env` du backend.

---

## 🔐 Vulnérabilités OWASP intégrées

Le projet implémente 5 vulnérabilités majeures identifiées dans le Top 10 OWASP 2021 :

### 1️⃣ SQL Injection (OWASP A01 - Injection)

- **Description** : L'utilisateur peut injecter du SQL dans les champs de recherche ou de connexion.
- **Correction** : Utilisation de requêtes préparées (paramétrées) et d'un ORM dans le mode sécurisé.

### 2️⃣ Authentification cassée (OWASP A02 - Broken Authentication)

- **Description** : Le système d’authentification n’expire jamais, les tokens sont réutilisables à volonté, et aucune protection contre le bruteforce n’est en place.
- **Correction** : JWT avec expiration, protection contre le bruteforce, et limitation de tentatives (throttling).

### 3️⃣ Exposition de données sensibles (OWASP A03 - Sensitive Data Exposure)

- **Description** : Les mots de passe sont stockés en clair, les données de carte bancaire sont accessibles en clair dans le localStorage du navigateur.
- **Correction** : Hashage des mots de passe avec bcrypt, suppression des données sensibles côté client, chiffrement des communications.

### 4️⃣ Mauvaise configuration de sécurité (OWASP A05 - Security Misconfiguration)

- **Description** : Les routes administratives sont accessibles sans authentification ni vérification de rôle.
- **Correction** : Mise en place d’un middleware de vérification de rôle, restriction d’accès aux routes sensibles.

### 5️⃣ Cross-Site Scripting (OWASP A07 - Cross-Site Scripting - XSS)

- **Description** : Un utilisateur peut insérer du script dans les commentaires produits.
- **Correction** : Échappement des entrées utilisateur et sanitation HTML.

---

## 📂 Structure du projet

```txt
/SportHack-Store
├── backend/
│   ├── controllers/       → Logique métier (produits, auth, utilisateurs)
│   ├── routes/            → Définition des endpoints API
│   ├── models/            → Schémas de base de données (ORM ou requêtes)
│   ├── middleware/        → Authentification, gestion des rôles, sécurité
│   └── .env               → Fichier de configuration du mode (vulnérable/sécurisé)
├── frontend/
│   ├── src/
│   │   ├── components/    → Composants React réutilisables (cartes produits, formulaires, etc.)
│   │   ├── pages/         → Pages principales (Accueil, Panier, Admin, etc.)
│   │   └── services/      → API Service (axios/fetch)
├── database/
│   └── dump.sql           → Script SQL pour peupler la base avec des données d'exemple
├── docker-compose.yml     → Configuration multi-container (frontend, backend, db)
├── README.md
└── install-demo-video.mp4 → Vidéo de démonstration et présentation des failles
```

---

## 🚀 Lancement du projet avec Docker

### Pré-requis : Docker & Docker Compose installés

### Étapes

```bash
git clone https://github.com/<votre-pseudo>/sporthack-store.git
cd sporthack-store
cp backend/.env.example backend/.env
```

⚙️ Modifiez le fichier `.env` pour choisir le mode :

```txt
DB_HOST=db
DB_USER=root
DB_PASSWORD=admin
DB_NAME=sportstore
VULNERABLE=true   # ou false
```

### Lancez le projet

```bash
docker-compose up --build
```

ou

```bash
docker-compose down -v && docker-compose build --no-cache && docker-compose up
```


Accès à l’application : [http://localhost:3000](http://localhost:3000)

---

## 🧪 Démonstration des vulnérabilités

Une vidéo incluse (`install-demo-video.mp4`) présente :

- L’installation pas à pas du projet
- L’exploitation des 5 failles (SQLi, XSS, Auth, etc.)
- Le comportement en mode sécurisé (comparaison)
- Les explications pédagogiques pour chaque correctif apporté

Vous pouvez également vous référer aux walkthroughs :

- <https://github.com/juice-shop/juice-shop/blob/master/SOLUTIONS.md>
- <https://github.com/bsqrl/juice-shop-walkthrough>

---

## 📄 Dump SQL

Le fichier `dump.sql` contient :

- Création des tables `users`, `products`, `orders`, `comments`
- Données de démonstration
- Différenciation des données si nécessaire entre mode vulnérable/sécurisé

---

## 📘 Bonnes pratiques de développement sécurisé

- Toujours utiliser des ORM ou des requêtes préparées
- Ne jamais stocker des mots de passe en clair
- Limiter les erreurs retournées aux utilisateurs
- Restreindre les routes sensibles par des rôles et permissions
- Valider et filtrer toutes les entrées utilisateur
