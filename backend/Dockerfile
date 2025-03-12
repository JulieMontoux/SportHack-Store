FROM node:18
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# 🔥 Important : copie le fichier .env dans l'image Docker
COPY .env .env

CMD ["node", "server.js"]
