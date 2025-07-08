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

2️⃣. Backend
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

3️⃣. Frontend
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

El proyecto usa CORS habilitado para facilitar el acceso desde el frontend.

📦 API Endpoints y Configuración
Este proyecto contiene un frontend en React con Vite y un backend en Node.js + Express que gestiona autenticación y productos.

🔐 Endpoints de Autenticación (auth.js)
Archivo: src/api/auth.js

js
Copiar
Editar
// BASE_API configurado desde variables de entorno
const BASE_API = import.meta.env.VITE_API_URL;

const register

const login

📦 Endpoints de Productos (product.js)
Archivo: src/api/product.js

js
Copiar
Editar
// BASE_API configurado desde variables de entorno
const BASE_API = import.meta.env.VITE_API_URL;

const getProducts
const createProduct
const deleteProduct
const updateProduct

⚙️ Variables de entorno en Vite/React
Crea un archivo .env en la raíz del proyecto React con Vite:
bash
Copiar
Editar
VITE_API_URL=
Reinicia el servidor de desarrollo (npm run dev) para que tome los cambios.

Accede a la variable desde cualquier archivo .js o .ts con:
js
Copiar
Editar
const BASE_API

📡 Endpoints Backend: ProductController
Archivo: backend/controllers/productController.ts

Método	Ruta	Descripción
GET	/api/products	Obtener todos los productos
GET	/api/products/:name	Obtener producto por nombre
POST	/api/products	Crear un nuevo producto
PATCH	/api/products/:id	Actualizar producto por ID
DELETE	/api/products/:id	Eliminar producto por ID

```

