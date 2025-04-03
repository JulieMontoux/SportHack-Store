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

Le projet implémente 10 vulnérabilités majeures identifiées dans le Top 10 OWASP 2021 :

### 1️⃣ [SQL Injection (OWASP A01 - Injection)](docs/vulnerabilities/sql-injection.md)

### 2️⃣ [Authentification cassée (OWASP A02 - Broken Authentication)](docs/vulnerabilities/broken-authentication.md)

### 3️⃣ [Exposition de données sensibles (OWASP A03 - Sensitive Data Exposure)](docs/vulnerabilities/sensitive-data-exposure.md)

### 4️⃣ [Mauvaise configuration de sécurité (OWASP A05 - Security Misconfiguration)](docs/vulnerabilities/security-misconfiguration.md)

### 5️⃣ [Cross-Site Scripting (OWASP A07 - XSS)](docs/vulnerabilities/xss.md)

### 6️⃣ [Business Logic Bypass](docs/vulnerabilities/business-logic-bypass.md)

### 7️⃣ [Mass Assignment](docs/vulnerabilities/mass-assignment.md)

### 8️⃣ [Open Redirect](docs/vulnerabilities/open-redirect.md)

### 9️⃣ [JWT Signature non validée](docs/vulnerabilities/jwt-signature-bypass.md)

### 🔟 [Absence de Rate Limiting](docs/vulnerabilities/rate-limiting.md)

Des vulnérabilités supplémentaires sont prévues en bonus :

- [IDOR (accès à des données d'un autre utilisateur)](docs/vulnerabilities/idor.md)
- [CSRF (sur suppression produit par POST)](docs/vulnerabilities/csrf.md)
- [Session Fixation](docs/vulnerabilities/session-fixation.md)
- [Clickjacking](docs/vulnerabilities/clickjacking.md)
- [Insecure Deserialization](docs/vulnerabilities/insecure-deserialization.md)

---

## 📂 Structure du projet

```txt
/SportHack-Store
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   ├── .env.example
│   ├── Dockerfile
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── services/
│   ├── Dockerfile
│   └── package.json
├── database/
│   └── dump.sql
├── docker-compose.yml
├── docs/
│   └── vulnerabilities/
│       └── (fiches Markdown de chaque faille OWASP)
└── README.md
```

---

## 🚀 Initialisation du projet

### 📋 Prérequis

- Avoir installé [Docker](https://www.docker.com/)
- Avoir installé Docker Compose

### ⚙️ Étapes d’installation

```bash
git clone https://github.com/JulieMontoux/SportHack-Store.git
cd sporthack-store
cp backend/.env.example backend/.env
```

Modifiez si besoin le fichier `.env` :

```env
DB_HOST=db
DB_USER=root
DB_PASSWORD=admin
DB_NAME=sportstore
JWT_SECRET=secretkey
VULNERABLE=true # ou false
```

### ▶️ Lancement du projet

```bash
docker-compose up --build
```

✅ Ou pour tout reconstruire sans cache :

```bash
docker-compose down -v && docker-compose build --no-cache && docker-compose up
```

Accès frontend : [http://localhost:3000](http://localhost:3000)

---

## ✅ TODO (Checklist du projet)

### 🔧 Fonctionnalités techniques

- [x] Page d’accueil dynamique
- [x] Page admin avec gestion des produits
- [x] Page de connexion sécurisée JWT
- [x] Affichage des requêtes SQL (debug pédagogique)
- [x] Ajout d’un système de scoring des failles résolues
- [x] Mode vulnérable / sécurisé toggle

### 🔒 Sécurité / OWASP

- [x] Intégration des 10 failles principales OWASP 2021
- [x] Bonus : 5 vulnérabilités avancées intégrées (IDOR, CSRF, etc.)

### 💅 UI/UX

- [x] Design Bootstrap soigné
- [x] Badges “mode actif” dans la navbar
- [x] Responsive design

### 🧪 Tests & Documentation

- [ ] Fiches pédagogiques `.md` pour chaque faille (en cours)
- [ ] Intégration de Postman / Swagger (optionnel)

### 🛠 Optimisations futures

- [ ] CI/CD GitHub Actions
- [ ] Tests unitaires backend et frontend
- [ ] Traduction i18n (EN/FR)
- [ ] Journalisation avancée (logs utilisateurs, actions)
