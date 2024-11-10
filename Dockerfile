# Etapa 1: Construcción
FROM node:20.12.0 AS build

# Establecer el directorio de trabajo en el contenedor
WORKDIR /app

# Copiar los archivos de configuración
COPY package.json package-lock.json 

# Instalar las dependencias
RUN npm install

# Copiar el resto del código fuente
COPY . .

# Compilar el proyecto Angular
RUN npm run build --prod

# Etapa 2: Servir la aplicación con Nginx
FROM nginx:1.25-alpine

# Copiar los archivos estáticos desde la etapa de construcción
COPY --from=build /app/dist /usr/share/nginx/html

# Exponer el puerto 80 para acceder a la aplicación
EXPOSE 80

# Iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]
