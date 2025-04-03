FROM node:20
WORKDIR /app

# Copie les fichiers de dépendances
COPY package*.json ./
RUN npm install

# Copie le reste du code
COPY . .

# Lance l'app
CMD ["node", "server.js"]
