# 🛒 TP3-Final: Tienda de Productos Artesanales

Este proyecto es una aplicación fullstack que permite la gestión de productos artesanales. Incluye un sistema de autenticación de usuarios y una interfaz para crear, editar, buscar y eliminar productos.

## 🆕 Nueva funcionalidad

Se incorporó **autenticación con JWT** en el backend y una **interfaz de administración (dashboard)** en el frontend, accesible solo por usuarios autenticados. Desde el dashboard se puede:

- Crear nuevos productos
- Editar productos existentes
- Eliminar productos
- Visualizar alertas de éxito o error

También se agregó una **búsqueda de productos por nombre**, la cual filtra resultados dinámicamente.

---

## 🛠️ Tecnologías utilizadas

### Backend

- Node.js
- Express
- TypeScript
- MongoDB + Mongoose
- bcryptjs (hash de contraseñas)
- jsonwebtoken (JWT)

### Frontend

- React
- Vite
- React Router DOM
- Context API para autenticación

---

## ▶️ Instrucciones para ejecutar el proyecto

### 1. Clonar el repositorio

```bash
git clone https://github.com/Pablo-Caparelli/TP3-Final-Backend.git

2. Backend
a. Entrar al directorio del backend:
bash
Copiar
Editar
cd TP3-Final-Backend
b. Instalar dependencias:
bash
Copiar
Editar
npm install
c. Crear archivo .env en la raíz del backend:
env
Copiar
Editar
PORT=
URI_DB=
JWT_SECRET=
d. Ejecutar el servidor:
bash
Copiar
Editar
npm run dev

3. Frontend
a. Entrar al directorio del frontend (ajustar nombre si es diferente):
bash
Copiar
Editar
cd ../nombre-del-frontend
b. Crear archivo .env:
env
Copiar
Editar
VITE_API_URL=
c. Instalar dependencias:
bash
Copiar
Editar
npm install
d. Ejecutar el servidor:
bash
Copiar
Editar
npm run dev

```
