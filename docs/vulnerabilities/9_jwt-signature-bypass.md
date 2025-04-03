# 9️⃣ JWT Signature non validée

## Description

Si le backend accepte des tokens non signés (`alg=none`).

## Exercice

- Créer un token JWT via jwt.io avec `alg=none` sans signature.
- Accéder à des routes protégées.

## Correction

Forcer `HS256` et vérifier chaque token avec `jwt.verify(token, secret)`.
