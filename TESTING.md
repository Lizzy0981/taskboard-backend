# 🧪 Documentación de Pruebas del TaskBoard API

Este documento detalla los pasos para verificar el correcto funcionamiento del backend de TaskBoard API. Estas pruebas cubren todas las funcionalidades principales de la API: autenticación, gestión de tableros, listas y tareas.

## 📋 Índice de Pruebas
- [🧪 Documentación de Pruebas del TaskBoard API](#-documentación-de-pruebas-del-taskboard-api)
  - [📋 Índice de Pruebas](#-índice-de-pruebas)
  - [Paso 1: Crear una nueva colección en Postman](#paso-1-crear-una-nueva-colección-en-postman)
    - [Instrucciones:](#instrucciones)
    - [Captura de pantalla:](#captura-de-pantalla)
  - [Paso 2: Registrar un usuario](#paso-2-registrar-un-usuario)
    - [Instrucciones:](#instrucciones-1)
    - [Captura de pantalla:](#captura-de-pantalla-1)
  - [Paso 3: Iniciar sesión](#paso-3-iniciar-sesión)
    - [Instrucciones:](#instrucciones-2)
    - [Captura de pantalla:](#captura-de-pantalla-2)
  - [Paso 4: Configurar una variable para el token](#paso-4-configurar-una-variable-para-el-token)
    - [Instrucciones:](#instrucciones-3)
    - [Captura de pantalla:](#captura-de-pantalla-3)
  - [Paso 5: Obtener información del usuario](#paso-5-obtener-información-del-usuario)
    - [Instrucciones:](#instrucciones-4)
    - [Captura de pantalla:](#captura-de-pantalla-4)
  - [Paso 6: Crear un tablero](#paso-6-crear-un-tablero)
    - [Instrucciones:](#instrucciones-5)
    - [Captura de pantalla:](#captura-de-pantalla-5)
  - [Paso 7: Obtener todos los tableros](#paso-7-obtener-todos-los-tableros)
    - [Instrucciones:](#instrucciones-6)
    - [Captura de pantalla:](#captura-de-pantalla-6)
  - [Paso 8: Crear una lista en un tablero](#paso-8-crear-una-lista-en-un-tablero)
    - [Instrucciones:](#instrucciones-7)
    - [Captura de pantalla:](#captura-de-pantalla-7)
  - [Paso 9: Obtener todas las listas de un tablero](#paso-9-obtener-todas-las-listas-de-un-tablero)
    - [Instrucciones:](#instrucciones-8)
    - [Captura de pantalla:](#captura-de-pantalla-8)
  - [Paso 10: Crear una tarea en una lista](#paso-10-crear-una-tarea-en-una-lista)
    - [Instrucciones:](#instrucciones-9)
    - [Captura de pantalla:](#captura-de-pantalla-9)
  - [Paso 11: Obtener todas las tareas de una lista](#paso-11-obtener-todas-las-tareas-de-una-lista)
    - [Instrucciones:](#instrucciones-10)
    - [Captura de pantalla:](#captura-de-pantalla-10)
  - [Paso 12: Actualizar una tarea](#paso-12-actualizar-una-tarea)
    - [Instrucciones:](#instrucciones-11)
    - [Captura de pantalla:](#captura-de-pantalla-11)
  - [🎯 Resultado final](#-resultado-final)

---

## Paso 1: Crear una nueva colección en Postman

### Instrucciones:
1. Hacer clic en "New" o "+" para crear una nueva colección
2. Nombrar la colección "TaskBoard API"
3. Guardr la colección

### Captura de pantalla:
<!-- Inserta aquí la imagen del Paso 1 -->
![paso 1](https://github.com/user-attachments/assets/91630aa9-854e-402e-8dd9-19f96f2910f6)

---

## Paso 2: Registrar un usuario

### Instrucciones:
1. Hacer clic derecho en la colección y seleccionar "Add Request"
2. Nombrar la solicitud "Register User"
3. Configurar:
   - Método: POST
   - URL: http://localhost:5000/api/auth/register
   - En la pestaña "Body", seleccionar "raw" y "JSON"
   - Ingresar:
     ```json
     {
       "username": "usuario_prueba",
       "email": "prueba@ejemplo.com",
       "password": "contraseña123"
     }
     ```
4. Guardar la solicitud y hacer clic en "Send"

### Captura de pantalla:
<!-- Inserta aquí la imagen del Paso 2 -->
![paso 2](https://github.com/user-attachments/assets/1a29aa2f-c461-45ec-87aa-1324239235b1)

---

## Paso 3: Iniciar sesión

### Instrucciones:
1. Crear una nueva solicitud llamada "Login"
2. Configurar:
   - Método: POST
   - URL: http://localhost:5000/api/auth/login
   - En "Body", seleccionar "raw" y "JSON"
   - Ingresar:
     ```json
     {
       "email": "prueba@ejemplo.com",
       "password": "contraseña123"
     }
     ```
3. Envíar la solicitud y guardar el token que se reciba en respuesta

### Captura de pantalla:
<!-- Inserta aquí la imagen del Paso 3 -->
![paso 3](https://github.com/user-attachments/assets/4ce64ac2-438d-4354-8a65-8f131f704195)

---

## Paso 4: Configurar una variable para el token

### Instrucciones:
1. Hacer clic derecho en la colección y seleccionar "Edit"
2. Ir a la pestaña "Variables"
3. Crear una variable:
   - Nombre: token
   - Valor inicial y actual: [pegar aquí el token que se recibio]
4. Guardar los cambios

### Captura de pantalla:
<!-- Inserta aquí la imagen del Paso 4 -->
![paso 4](https://github.com/user-attachments/assets/44497f76-20e7-437d-b261-339a82841194)

---

## Paso 5: Obtener información del usuario

### Instrucciones:
1. Crear una nueva solicitud llamada "Get Current User"
2. Configurar:
   - Método: GET
   - URL: http://localhost:5000/api/auth/me
   - En la pestaña "Authorization", seleccionar tipo "Bearer Token"
   - En el campo "Token", escribir {{token}}
3. Envíar la solicitud

### Captura de pantalla:
<!-- Inserta aquí la imagen del Paso 5 -->
![paso 5](https://github.com/user-attachments/assets/8b0ae4b2-184c-4653-b144-d5507b71ebff)

---

## Paso 6: Crear un tablero

### Instrucciones:
1. Crear una nueva solicitud llamada "Create Board"
2. Configurar:
   - Método: POST
   - URL: http://localhost:5000/api/boards
   - En "Authorization", usar Bearer Token con {{token}}
   - En "Body", seleccionar "raw" y "JSON", e ingresar:
     ```json
     {
       "name": "Mi Primer Tablero",
       "description": "Tablero para organizar mis tareas"
     }
     ```
3. Envíar la solicitud y guardar el ID del tablero

### Captura de pantalla:
<!-- Inserta aquí la imagen del Paso 6 -->
![paso 6](https://github.com/user-attachments/assets/3ade222f-6188-4819-a666-76bd2c643714)

---

## Paso 7: Obtener todos los tableros

### Instrucciones:
1. Crear una nueva solicitud llamada "Get All Boards"
2. Configurar:
   - Método: GET
   - URL: http://localhost:5000/api/boards
   - En "Authorization", usar Bearer Token con {{token}}
3. Envíar la solicitud

### Captura de pantalla:
<!-- Inserta aquí la imagen del Paso 7 -->
![paso 7](https://github.com/user-attachments/assets/efc45cb6-a456-4e31-a467-05216c5dd016)

---

## Paso 8: Crear una lista en un tablero

### Instrucciones:
1. Crear una nueva solicitud llamada "Create List"
2. Configurar:
   - Método: POST
   - URL: http://localhost:5000/api/lists/board/{{boardId}}
   - Nota: Reemplazar {{boardId}} con el ID real del tablero creado, o crear una variable de colección para el ID del tablero
   - En "Authorization", usar Bearer Token con {{token}}
   - En "Body", seleccionar "raw" y "JSON", e ingresar:
     ```json
     {
       "name": "Tareas Pendientes"
     }
     ```
3. Envíar la solicitud y guarda el ID de la lista

### Captura de pantalla:
<!-- Inserta aquí la imagen del Paso 8 -->
![paso 8](https://github.com/user-attachments/assets/34583d6e-fd12-4fef-b246-afd80dd57834)

---

## Paso 9: Obtener todas las listas de un tablero

### Instrucciones:
1. Crear una nueva solicitud llamada "Get Board Lists"
2. Configurar:
   - Método: GET
   - URL: http://localhost:5000/api/lists/board/{{boardId}}
   - En "Authorization", usar Bearer Token con {{token}}
3. Envíar la solicitud

### Captura de pantalla:
<!-- Inserta aquí la imagen del Paso 9 -->
![paso 9](https://github.com/user-attachments/assets/e6722e89-0d75-46ea-819f-ef549094fac4)

---

## Paso 10: Crear una tarea en una lista

### Instrucciones:
1. Crear una nueva solicitud llamada "Create Task"
2. Configurar:
   - Método: POST
   - URL: http://localhost:5000/api/tasks/list/{{listId}}
   - Nota: Reemplazar {{listId}} con el ID real de la lista creada
   - En "Authorization", usar Bearer Token con {{token}}
   - En "Body", seleccionar "raw" y "JSON", e ingresar:
     ```json
     {
       "title": "Completar el backend",
       "description": "Terminar la implementación del backend de TaskBoard",
       "priority": "Alta",
       "dueDate": "2025-03-25T00:00:00.000Z"
     }
     ```
3. Envíar la solicitud y guardar el ID de la tarea

### Captura de pantalla:
<!-- Inserta aquí la imagen del Paso 10 -->
![paso 10](https://github.com/user-attachments/assets/78fb3364-4577-4bf2-af89-e22ef5ab7af1)

---

## Paso 11: Obtener todas las tareas de una lista

### Instrucciones:
1. Crear una nueva solicitud llamada "Get List Tasks"
2. Configurar:
   - Método: GET
   - URL: http://localhost:5000/api/tasks/list/{{listId}}
   - En "Authorization", usar Bearer Token con {{token}}
3. Envíar la solicitud

### Captura de pantalla:
<!-- Inserta aquí la imagen del Paso 11 -->
![paso 11](https://github.com/user-attachments/assets/fcda2c59-5998-4239-945f-aa3466263855)

---

## Paso 12: Actualizar una tarea

### Instrucciones:
1. Crear una nueva solicitud llamada "Update Task"
2. Configurar:
   - Método: PUT
   - URL: http://localhost:5000/api/tasks/{{taskId}}
   - Nota: Reemplazar {{taskId}} con el ID real de la tarea creada
   - En "Authorization", usar Bearer Token con {{token}}
   - En "Body", seleccionar "raw" y "JSON", e ingresar:
     ```json
     {
       "title": "Completar el backend",
       "description": "¡Tarea completada con éxito!",
       "status": "Completada",
       "priority": "Alta"
     }
     ```
3. Envíar la solicitud

### Captura de pantalla:
<!-- Inserta aquí la imagen del Paso 12 -->
![paso 12](https://github.com/user-attachments/assets/539fa8c0-4f11-4350-a777-fa8e1f7a95ff)

---

## 🎯 Resultado final

Después de completar todos estos pasos, se verificó que la API TaskBoard funciona correctamente en todos sus endpoints principales. La API permite:

- Autenticación de usuarios (registro, inicio de sesión)
- Gestión de tableros (crear, listar, obtener, actualizar)
- Gestión de listas dentro de tableros (crear, listar)
- Gestión de tareas dentro de listas (crear, listar, actualizar)

Todas estas operaciones están protegidas mediante autenticación JWT, garantizando que solo los usuarios autorizados puedan acceder a los recursos.
