# Plataforma Interactiva de Viajes

![Node.js](https://img.shields.io/badge/Node.js-18.x-green)
![Express](https://img.shields.io/badge/Express-4.x-blue)
![Mongoose](https://img.shields.io/badge/Mongoose-8.x-orange)
![MongoDB](https://img.shields.io/badge/MongoDB-6.x-blue)
![React](https://img.shields.io/badge/React-18.x-violet)
![React DOM](https://img.shields.io/badge/ReactDOM-18.x-orange)
![React DOM](https://img.shields.io/badge/ReactRouterDOM-18.x-green)
![Axios](https://img.shields.io/badge/Axios-1.x-blue)

## Descripción del Proyecto

Es una aplicación web dedicada a proporcionar a los apasionados de los viajes un espacio en línea donde pueden compartir y descubrir experiencias únicas de viaje. La plataforma permite a los usuarios registrarse, iniciar sesión, crear publicaciones sobre viajes y participar activamente al agregar comentarios a las publicaciones de otros viajeros.

## Tecnologías Utilizadas (MERN Stack)

### Backend:

- **MongoDB:** Base de datos NoSQL para almacenar datos.
- **Express:** Framework web para Node.js.
- **Node.js:** Entorno de ejecución para JavaScript del lado del servidor.
- **Cors:** Middleware para permitir solicitudes de recursos desde un dominio diferente al dominio del servidor.
- **Dotenv:** Herramienta para cargar variables de entorno desde un archivo `.env`.
- **Helmet:** Middleware para configurar diversos encabezados HTTP para mejorar la seguridad.
- **Morgan:** Middleware para registrar solicitudes HTTP.
- **Express Validator:** Middleware para validación de datos en Express.
- **JSON Web Token (JWT):** Para autenticación y autorización.

### Frontend:

- **React:** Biblioteca de JavaScript para construir interfaces de usuario.
- **Vite:** Bundler rápido para proyectos React.
- **React-DOM:** Para la manipulación del DOM en aplicaciones React.
- **React-Router-DOM:** Para la navegación en la aplicación.
- **Bootstrap:** Framework de diseño para estilos y componentes.

## Características Principales

- **Registro y Login:**

  - Los usuarios pueden registrarse e iniciar sesión de manera efectiva.

- **Creación de Posteos y Comentarios:**

  - Los usuarios pueden crear publicaciones sobre sus experiencias de viaje.
  - Pueden agregar comentarios a las publicaciones de otros usuarios.

- **Restricciones de Acceso:**
  - Las restricciones de acceso se aplican según las especificaciones (crear, editar, eliminar solo para usuarios autorizados).

## Modelo de Datos

### User:

- `username`
- `password`
- `email`
- `avatarURL` (URL de la imagen para visualizar el avatar).

### Post:

- `title`
- `description`
- `author` (referencia a User).
- `comments` (referencia a Comment).
- `imageURL` (URL de la imagen para visualizar una imagen del posteo).
- `createdAt` (Fecha de la creación).

### Comment:

- `author` (referencia a User).
- `post` (referencia a Post).
- `description`.

## Configuración del Proyecto

1. **Backend:**

   - Configura las variables de entorno en un archivo `.env`.
   - Ejecuta el servidor con `npm start`.

2. **Frontend:**
   - Instala las dependencias con `npm install`.
   - Configura en `src/api/constante.js` el endpoint del backend
   - Inicia la aplicación con `npm run dev`.

## Uso

- Accede a la aplicación a través de la ruta pública de posteos para ver las experiencias de viaje.
- Regístrate e inicia sesión para interactuar, crear posteos y agregar comentarios.

## Contribución

Si deseas contribuir al proyecto, sigue estos pasos:

1. Haz un fork del repositorio.
2. Crea una rama para tu función (`git checkout -b feature/NuevaCaracteristica`).
3. Realiza tus cambios y haz commit (`git commit -m 'Agrega NuevaCaracteristica'`).
4. Hacer push a la rama (`git push origin feature/NuevaCaracteristica`).
5. Abre un Pull Request.

## Contacto

- Creado por: Lucas Acosta
- Sitio Web: https://alucase.github.io/
- Email: alucase@gmail.com

---
