# 8️⃣ Open Redirect

## Description

Redirection vers une URL externe non contrôlée via `/redirect?to=https://evil.com`

## Exercice

- Naviguer sur `/redirect?to=https://evil.com`
- Résultat : redirection externe possible.

## Correction

Autoriser uniquement des domaines internes (regex).
