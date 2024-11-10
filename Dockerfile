# Etapa de compilación
FROM node:20-alpine AS build

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar los archivos de configuración primero
COPY package.json package-lock.json ./

# Instalar las dependencias
RUN npm install

# Copiar el resto del código fuente
COPY . .

# Compilar la aplicación Angular
RUN npm run build

# Etapa de producción
FROM nginx:1.25-alpine

# Copiar los archivos compilados al directorio de Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Exponer el puerto 80
EXPOSE 80

# Iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]
