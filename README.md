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

### 2️⃣ Authentification cassée (OWASP A02 - Broken Authentication)

### 3️⃣ Exposition de données sensibles (OWASP A03 - Sensitive Data Exposure)

### 4️⃣ Mauvaise configuration de sécurité (OWASP A05 - Security Misconfiguration)

### 5️⃣ Cross-Site Scripting (OWASP A07 - XSS)

---

## 📂 Structure du projet

```txt
/SportHack-Store
├── backend/
│   ├── controllers/         → Logique métier (produits, auth, utilisateurs)
│   ├── routes/              → Définition des endpoints API
│   ├── models/              → Connexion BDD (db.js) et futurs modèles ORM
│   ├── middleware/          → Authentification, gestion des rôles, sécurité, détection du mode actif
│   ├── .env.example         → Variables d’environnement modèle
│   ├── Dockerfile           → Conteneurisation backend
│   └── server.js            → Point d’entrée API
│   └── package.json         → Dépendances backend
├── frontend/
│   ├── public/              → Fichiers statiques
│   ├── src/
│   │   ├── components/      → Composants réutilisables React (LoginForm, Navbar, etc.)
│   │   ├── pages/           → Pages principales (Accueil, Admin, Panier, etc.)
│   │   └── services/        → Appels API (axios)
│   ├── Dockerfile           → Conteneurisation frontend
│   └── package.json         → Dépendances frontend
├── database/
│   └── dump.sql             → Script SQL de création et insertion de données
├── docker-compose.yml       → Orchestration des services (backend, frontend, mysql)
├── README.md
└── install-demo-video.mp4   → Vidéo pédagogique du projet
```

---

## 🚀 Initialisation du projet avec Docker

### 📋 Pré-requis

- Docker installé : <https://www.docker.com/>
- Docker Compose installé

### ⚙️ Étapes d’installation

```bash
git clone https://github.com/<votre-pseudo>/sporthack-store.git
cd sporthack-store
cp backend/.env.example backend/.env
```

Modifiez le fichier `.env` si besoin :

```env
DB_HOST=db
DB_USER=root
DB_PASSWORD=admin
DB_NAME=sportstore
JWT_SECRET=secretkey
VULNERABLE=true   # ou false
```

### ▶️ Lancement du projet

```bash
docker-compose up --build
```

✅ Ou pour tout reconstruire sans cache :

```bash
docker-compose down -v && docker-compose build --no-cache && docker-compose up
```

Accès à l’application : [http://localhost:3000](http://localhost:3000)

---

## ✅ Tâches restantes (TODO)

### 🔧 Fonctions techniques à ajouter

- [ ] Création de la page d'administration avec listing des produits/utilisateurs
- [ ] Ajout de rôles utilisateurs (admin, user) et restriction des routes côté backend
- [ ] Affichage dynamique des requêtes SQL dans le frontend (debug pédagogique)
- [ ] Page de journalisation des connexions utilisateurs (logins, IP, rôle)

### 🔒 Sécurité & OWASP

- [ ] Intégration d’une 6e faille OWASP : IDOR (accès à une commande d’un autre user)
- [ ] Option d’ajout d’une fausse faille CSRF sur une suppression produit en POST

### 📐 UI/UX

- [ ] Ajout d’un badge dynamique “Mode: Sécurisé / Vulnérable” dans la navbar
- [ ] Interface plus visuelle des commentaires (pour démonstration XSS)

### 🧪 Tests & Documentation

- [ ] Création de tests unitaires backend (ex: loginController)
- [ ] Ajout d’un fichier Postman ou Swagger pour tester l’API REST
- [ ] Intégration continue simple (CI) via GitHub Actions

### 🌍 Accessibilité & Optimisation

- [ ] Traduction anglaise du frontend (i18n)
- [ ] Amélioration du responsive/mobile design
- [ ] Nettoyage du code et séparation stricte logique/présentation

---

## 📘 Bonnes pratiques de développement sécurisé

- Toujours utiliser des ORM ou des requêtes préparées
- Ne jamais stocker des mots de passe en clair
- Limiter les erreurs retournées aux utilisateurs
- Restreindre les routes sensibles par des rôles et permissions
- Valider et filtrer toutes les entrées utilisateur
