# 1️⃣ SQL Injection (OWASP A01)

## 📌 Description
Cette faille permet à un utilisateur malveillant d’injecter des instructions SQL dans un champ de saisie (ex: login, recherche produit).  
Cela permet par exemple de contourner l’authentification ou de consulter des données non autorisées.

## 🔥 Exemple d’injection :
```
admin@sporthack.local' OR 1=1 --
```

## 🛠 Correction
- Utilisation de requêtes préparées (paramétrées)
- Éviter la concaténation de requêtes avec les inputs utilisateur
