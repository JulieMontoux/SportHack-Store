# 4️⃣ Security Misconfiguration (OWASP A05)

## 📌 Description
Certaines routes ne sont pas protégées, les rôles ne sont pas contrôlés côté backend.

## 🔥 Exemple :
- L’API /admin est accessible sans vérification du rôle

## 🛠 Correction
- Middleware de vérification des rôles utilisateur
- Sécurisation des routes sensibles
