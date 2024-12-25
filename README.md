# Prueba tecnica

## primeros pasos en local
1. instalar dependencias del front y del back
   * **cd backend && npm i** 
   * **cd ...**
   * **cd frontend && npm i**
   * **cd ...**
2. subir la base de datos:
   * **cd backend && docker-compose -f postgresql-docker.yml up -d**
3. copiar .env.example y y nombrarlo .env
   * **cd backend && cp .env.example .env** 
   * **cd ...**
   * **cd frontend && cp .env.example .env** 
   * **cd ...**
4. correr el frontend y el backend
   * **cd backend && npm run start:dev** 
   * **cd ...**
   * **cd frontend && npm run dev**
   * **cd ...**
5. ingresar a: **localhost:5173**


## correr con docker
1. ejecutar el comando: **docker compose up -d**
1. ingresa a **localhost:8081**

### para mas informacion, ingresar al readme de frontend y backend