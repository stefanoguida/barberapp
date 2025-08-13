# Usa un'immagine base Node ufficiale
FROM node:20

# Installa dipendenze di sistema necessarie per Expo
RUN apt-get update && apt-get install -y \
    git \
    curl \
    watchman \
    python3 \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Imposta la working directory
WORKDIR /app

# Copia solo i file necessari per installare le dipendenze
COPY package*.json ./

# Installa Expo CLI globalmente
RUN npm install -g expo-cli

# Installa le dipendenze del progetto
RUN npm install

# Copia il resto dell'app
COPY . .

# Espone le porte usate da Expo
EXPOSE 8081 19000 19001 19002

# Comando di avvio
CMD ["npx", "expo", "start", "--tunnel"]
