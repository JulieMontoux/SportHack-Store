# 🔒 IDOR – Insecure Direct Object Reference

## Exercice

Accéder à `/order/1` même si ce n’est pas son ID utilisateur.

## Correction

Comparer `userId === req.user.id` côté backend.
