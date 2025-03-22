# 1️⃣ SQL Injection (OWASP A01 - Injection)

## Description

Permet à un utilisateur malveillant d’injecter du SQL dans un champ de saisie (login, recherche).

## Exercice

- Se rendre sur la page de connexion.
- Saisir comme email : `admin@sporthack.local' OR 1=1 --`
- Mot de passe : peu importe.
- Résultat attendu : accès non autorisé malgré un mot de passe erroné.

## Correction

Requête préparée (`?` dans SQL + array params).
