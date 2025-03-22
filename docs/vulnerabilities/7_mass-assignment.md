# 7️⃣ Mass Assignment

## Description

Un champ non prévu (`isAdmin=true`) est accepté.

## Exercice

- Créer un utilisateur via requête POST avec `{ email, password, isAdmin: true }`
- Vérifier dans la DB : utilisateur admin malgré aucune validation côté backend.

## Correction

Whitelisting des champs dans les `INSERT` et `UPDATE`.
