# 🗃️ TaskBoard Backend - Sistema de Gestión de Tableros Estilo Trello

Un potente backend para la gestión de tableros colaborativos tipo Trello, con sistema de autenticación, roles personalizados y una API RESTful completa desarrollada con Node.js, Express y PostgreSQL.

## 📱 Imágenes de la API 📱

### Modo Claro
![TaskBoard API - Modo Claro]![Captura de pantalla_12-3-2025_164015_localhost](https://github.com/user-attachments/assets/e6168cb3-7476-4692-9e1b-938ba0f2f22b)

### Modo Oscuro
![TaskBoard API - Modo Oscuro]![Captura de pantalla_12-3-2025_164034_localhost](https://github.com/user-attachments/assets/abda3524-973d-4d70-9519-ff42d6a286fa)

*Capturas de pantalla de la documentación interactiva de la API de TaskBoard, mostrando la interfaz de endpoints en ambos modos.*

## ✨ Características

- 🔐 Sistema completo de autenticación con JWT
- 👥 Gestión de roles (Creador, Colaborador, Observador)
- 📋 CRUD completo para tableros, listas y tareas
- 🔄 Relaciones avanzadas entre entidades
- 🛡️ Middleware de protección con verificación de roles
- 📊 Base de datos relacional con PostgreSQL
- 📝 Documentación interactiva de la API
- 🔁 Gestión de miembros y colaboradores
- 📱 API RESTful completamente funcional
- 🌐 Soporte para CORS

## 🛠️ Tecnologías utilizadas

- 🟢 Node.js - Entorno de ejecución
- 🚂 Express - Framework para API RESTful
- 🐘 PostgreSQL - Base de datos relacional
- 🧩 Sequelize - ORM para PostgreSQL
- 🔑 JWT - Autenticación basada en tokens
- 🔒 Bcrypt - Cifrado seguro de contraseñas
- ⚙️ Middleware personalizado para protección de rutas
- 📄 Dotenv - Gestión de variables de entorno
- 🌐 CORS - Gestión de solicitudes cross-origin

## 📦 Estructura de la Base de Datos

- 👤 **Users**: Gestión de usuarios y autenticación
- 📊 **Boards**: Tableros para organizar tareas
- 🔄 **BoardMembers**: Relación muchos a muchos entre usuarios y tableros con roles
- 📋 **Lists**: Listas dentro de los tableros
- ✅ **Tasks**: Tareas dentro de las listas con propiedades avanzadas

## 🚀 Instalación

1. Clona el repositorio:
```bash
git clone https://github.com/Lizzy0981/taskboard-backend.git
```

2. Instala las dependencias:
```bash
cd taskboard-backend
npm install
```

3. Configura las variables de entorno:
```bash
cp .env.example .env
```
Edita el archivo `.env` con tus credenciales de base de datos y secreto JWT.

4. Inicia el servidor:
```bash
npm run dev
```

## 🚀 Despliegue

Este proyecto está desplegado en Render y puede accederse en:
[https://taskboard-api-vemy.onrender.com](https://taskboard-api-vemy.onrender.com)

Para probar la API, puedes:
1. Usar la documentación interactiva disponible en la URL del despliegue
2. Seguir los pasos detallados en [TESTING.md](TESTING.md), reemplazando `http://localhost:5000` con la URL del despliegue


## 🧪 Pruebas y verificación

Para verificar el correcto funcionamiento de la API, se ha creado una documentación detallada con los pasos para probar todos los endpoints principales usando Postman.

[Ver documentación de pruebas (TESTING.md)](TESTING.md)

La documentación incluye:
- Instrucciones paso a paso para probar cada endpoint
- Capturas de pantalla de las respuestas
- Ejemplos de JSON para cada solicitud

## 💡 Uso de la API

### Autenticación

```
POST /api/auth/register - Registrar nuevo usuario
POST /api/auth/login - Iniciar sesión
GET /api/auth/me - Obtener datos del usuario actual
```

### Tableros

```
POST /api/boards - Crear nuevo tablero
GET /api/boards - Obtener todos los tableros del usuario
GET /api/boards/:boardId - Obtener un tablero específico
PUT /api/boards/:boardId - Actualizar un tablero
DELETE /api/boards/:boardId - Eliminar un tablero
```

### Miembros de Tablero

```
POST /api/boards/:boardId/members - Añadir miembro al tablero
PUT /api/boards/:boardId/members/:userId - Actualizar rol de miembro
DELETE /api/boards/:boardId/members/:userId - Eliminar miembro del tablero
```

### Listas

```
POST /api/lists/board/:boardId - Crear lista en tablero
GET /api/lists/board/:boardId - Obtener listas de un tablero
PUT /api/lists/:listId - Actualizar una lista
DELETE /api/lists/:listId - Eliminar una lista
```

### Tareas

```
POST /api/tasks/list/:listId - Crear tarea en lista
GET /api/tasks/list/:listId - Obtener tareas de una lista
GET /api/tasks/:taskId - Obtener una tarea específica
PUT /api/tasks/:taskId - Actualizar una tarea
DELETE /api/tasks/:taskId - Eliminar una tarea
```

## 🏗️ Estructura del proyecto

```
taskboard-backend/
│
├── src/                   # Código fuente
│   ├── config/            # Configuración de la aplicación
│   │   └── database.js    # Configuración de la base de datos
│   ├── controllers/       # Controladores de rutas
│   │   ├── authController.js
│   │   ├── boardController.js
│   │   ├── listController.js
│   │   └── taskController.js
│   ├── middleware/        # Middleware personalizado
│   │   └── auth.js        # Middleware de autenticación
│   ├── models/            # Modelos de Sequelize
│   │   ├── User.js
│   │   ├── Board.js
│   │   ├── BoardMember.js
│   │   ├── List.js
│   │   └── Task.js
│   ├── routes/            # Rutas de la API
│   │   ├── authRoutes.js
│   │   ├── boardRoutes.js
│   │   ├── listRoutes.js
│   │   └── taskRoutes.js
│   └── app.js             # Configuración de Express
├── public/                # Archivos estáticos
│   └── index.html         # Documentación de la API
├── server.js              # Punto de entrada de la aplicación
├── .env.example           # Ejemplo de variables de entorno
├── .gitignore             # Archivos a ignorar en Git
├── package.json           # Dependencias y scripts
├── TESTING.md             # Documentación de pruebas
└── README.md              # Documentación
```

## 🧪 Testing

```bash
# Ejecutar tests
npm test

# Ejecutar tests con coverage
npm run test:coverage
```

## 📄 Licencia

Este proyecto está licenciado bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## 👩‍💻 Créditos

Desarrollado con 💜 por Elizabeth Diaz Familia
- 🐱 [GitHub](https://github.com/Lizzy0981)
- 💼 [LinkedIn](https://linkedin.com/in/eli-familia/)
- 🐦 [Twitter](https://twitter.com/Lizzyfamilia)
  
## 🙏 Agradecimientos

- 🎓 Oracle Next Education por el apoyo educativo
- 🚀 Alura Latam por la formación y los desafíos
- 🔍 A la comunidad de desarrollo por sus invaluables recursos
- 🌟 A todos los usuarios que utilizan esta API para sus proyectos
