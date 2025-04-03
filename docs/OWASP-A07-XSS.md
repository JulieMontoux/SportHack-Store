# 5️⃣ Cross Site Scripting (OWASP A07 - XSS)

## 📌 Description
L’utilisateur peut injecter du code HTML/JS dans des champs de formulaire (ex : commentaire).

## 🔥 Exemple :
```
<script>alert('XSS')</script>
```

## 🛠 Correction
- Sanitation/échappement des inputs
- Utilisation de bibliothèques de nettoyage HTML
