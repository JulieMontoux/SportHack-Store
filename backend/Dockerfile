FROM node:20

# Création du dossier de travail
WORKDIR /app

# Copie uniquement package.json pour installer plus vite
COPY package*.json ./

# Installation des dépendances DANS Docker
RUN npm install

# Copie du reste de ton code
COPY . .

# Exposition du port backend (si utilisé)
EXPOSE 5001

# Lancement de l'app
CMD ["npm", "start"]
