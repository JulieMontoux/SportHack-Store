# 3️⃣ Sensitive Data Exposure (OWASP A03)

## 📌 Description
Les données sensibles (mot de passe, données client) sont exposées en clair dans la base ou le navigateur.

## 🔥 Exemples :
- Mots de passe non hashés
- Données visibles dans le localStorage

## 🛠 Correction
- Hashage des mots de passe (bcrypt)
- Chiffrement des données
- Nettoyage des données stockées côté client
