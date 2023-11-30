# Backend de la Plataforma Interactiva de Viajes

![Node.js](https://img.shields.io/badge/Node.js-18.x-green)
![Express](https://img.shields.io/badge/Express-4.x-blue)
![Mongoose](https://img.shields.io/badge/Mongoose-8.x-orange)
![MongoDB](https://img.shields.io/badge/MongoDB-6.x-blue)

## Rutas API

### Autenticación (Auth)

- **Registro de Usuario:**

  - `POST /api/auth/register`
    - Endpoint para registrar nuevos usuarios.
    - Validaciones: avatar, email, password, username.
    - Controlador: `signUp`.

- **Inicio de Sesión:**
  - `POST /api/auth/login`
    - Endpoint para que los usuarios inicien sesión.
    - Controlador: `signIn`.

### Publicaciones (Post)

- **Obtener Todas las Publicaciones:**

  - `GET /api/post`
    - Endpoint para obtener todas las publicaciones.
    - Controlador: `getAllPost`.

- **Obtener Publicaciones por Autor:**

  - `GET /api/post/author`
    - Endpoint para obtener publicaciones de un autor específico.
    - Validaciones: token de acceso.
    - Controlador: `getPostByAuthor`.

- **Obtener Publicación por ID:**

  - `GET /api/post/getPostId/:postId`
    - Endpoint para obtener una publicación por su ID.
    - Validaciones: token de acceso.
    - Controlador: `getPostById`.

- **Crear Nueva Publicación:**

  - `POST /api/post/create`
    - Endpoint para crear una nueva publicación.
    - Validaciones: token de acceso, descripción, imagen, título.
    - Controlador: `createPost`.

- **Actualizar Publicación:**

  - `PUT /api/post/:postId`
    - Endpoint para actualizar una publicación existente.
    - Validaciones: token de acceso, descripción, imagen, título.
    - Controlador: `updatePost`.

- **Eliminar Publicación:**
  - `DELETE /api/post/:postId`
    - Endpoint para eliminar una publicación.
    - Validaciones: token de acceso.
    - Controlador: `deletePost`.

### Comentarios (Comments)

- **Crear Comentario:**

  - `POST /api/comments`
    - Endpoint para crear un nuevo comentario en una publicación.
    - Validaciones: token de acceso, descripción.
    - Controlador: `createComment`.

- **Obtener Comentarios por ID de Publicación:**

  - `GET /api/comments/:postId`
    - Endpoint para obtener comentarios asociados a una publicación.
    - Validaciones: token de acceso.
    - Controlador: `getCommentsByPostId`.

- **Actualizar Comentario:**

  - `PUT /api/comments/:commentId`
    - Endpoint para actualizar un comentario existente.
    - Validaciones: token de acceso, descripción.
    - Controlador: `updateComment`.

- **Eliminar Comentario:**
  - `DELETE /api/comments/:commentId`
    - Endpoint para eliminar un comentario.
    - Validaciones: token de acceso.
    - Controlador: `deleteComment`.

## Configuración del Proyecto

1. Configura las variables de entorno en un archivo `.env`.
2. Ejecuta el servidor con `npm start`.

## Contacto

- Creado por: Lucas Acosta
- Sitio Web: https://alucase.github.io/
- Email: alucase@gmail.com

---
