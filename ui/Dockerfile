FROM node:20-bullseye

WORKDIR /app

# Copy package.json / package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy rest of the files
COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev"]
