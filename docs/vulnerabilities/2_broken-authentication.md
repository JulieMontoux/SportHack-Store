# 2️⃣ Authentification cassée (OWASP A02 - Broken Authentication)

## Description

JWT non expiré, aucune protection contre bruteforce.

## Exercice

- Récupérer un token JWT après login.
- Le coller dans un autre navigateur : l’accès reste possible.
- Essayer plusieurs tentatives avec mot de passe aléatoire.

## Correction

JWT avec expiration + throttling backend (limiter 5 tentatives/min).
