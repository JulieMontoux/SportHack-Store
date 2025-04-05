# 3️⃣ Exposition de données sensibles (OWASP A03 - Sensitive Data Exposure)

## Description

Mots de passe stockés en clair + infos visibles dans localStorage.

## Exercice

- Se connecter en mode vulnérable.
- Ouvrir DevTools → onglet Application → LocalStorage → `token`, `user` visibles.
- Vérifier la base (dump.sql) → passwords en clair.

## Correction

`bcrypt` pour hasher, éviter localStorage sensible.
