# 2️⃣ Broken Authentication (OWASP A02)

## 📌 Description
L’authentification est mal sécurisée : les tokens n’expirent pas, aucune limitation de tentatives, les sessions ne sont pas protégées.

## 🔥 Conséquences :
- Bruteforce possible
- Réutilisation de sessions

## 🛠 Correction
- Expiration des JWT
- Throttling / rate limiting sur les endpoints sensibles
- Invalidation des tokens côté client
