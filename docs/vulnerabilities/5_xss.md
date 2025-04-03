# 5️⃣ Cross-Site Scripting (OWASP A07 - XSS)

## Description

Scripts injectables via commentaires ou recherche.

## Exercice

- Laisser un commentaire produit : `<script>alert('XSS')</script>`
- Recharger la page produit.

## Résultat

Pop-up affiché.

## Correction

Sanitize HTML côté backend ou frontend (`DOMPurify`, `escape-html`).
