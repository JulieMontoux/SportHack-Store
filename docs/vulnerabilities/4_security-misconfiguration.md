# 4️⃣ Mauvaise configuration de sécurité (OWASP A05 - Security Misconfiguration)

## Description

Accès aux routes `/admin`, `/orders` sans rôle.

## Exercice

- Tenter de naviguer à la page Admin sans être connecté ou avec un simple compte user.
- Accès non restreint visible.

## Correction

Middleware `checkRole('admin')` sur chaque route sensible.
