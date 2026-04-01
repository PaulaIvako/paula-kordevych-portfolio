# Etap budowania
FROM node:20-alpine AS builder

WORKDIR /app

# Kopiowanie plików projektu
COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Etap produkcyjny
FROM nginx:alpine

# Kopiowanie skompilowanej aplikacji
COPY --from=builder /app/dist /usr/share/nginx/html

# Kopiowanie konfiguracji nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
