# TodoMochilasAPI

API para gestionar los datos de la tienda TodoMochilas. Este proyecto sirve como backend para una aplicación de frontend desarrollada en React. La API se comunica con una base de datos MySQL y permite manejar productos, usuarios, y almacenamiento de imágenes.

## Características

- **Gestión de Productos**: Crear, actualizar, eliminar y consultar productos, incluyendo la gestión de stock.
- **Gestión de Usuarios**: Crear cuentas, iniciar sesión, actualizar y eliminar usuarios.
- **Autenticación JWT**: Seguridad mediante tokens para proteger las rutas sensibles.
- **Manejo de Imágenes**: Subida y almacenamiento de imágenes de productos en el servidor.
- **Base de Datos**: Conexión con MySQL para almacenar la información.

## Tecnologías Utilizadas

- **Backend**: Node.js, Express.js
- **Base de Datos**: MySQL
- **Middleware**: Multer para manejar imágenes, JWT para autenticación.
- **Frontend**: React (implementado en un repositorio separado).

## Instalación

1. Clona este repositorio:
   ```bash
   git clone https://github.com/joelBonelli/TodoMochilasAPI.git
   ```
2. Accede al directorio del proyecto:
   ```bash
   cd TodoMochilasAPI
   ```
3. Instala las dependencias:
   ```bash
   npm install
   ```
4. Configura las variables de entorno en un archivo `.env`:
   - `JWT_SECRET_KEY`: Clave secreta para tokens JWT.
   - `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`: Credenciales de la base de datos MySQL.
5. Inicia el servidor:
   ```bash
   node --watch ./app.js
   ```

## Uso

### Rutas de Productos
- `GET /productos`: Obtiene todos los productos.
- `POST /productos/create`: Crea un nuevo producto (requiere autenticación y subida de imagen).
- `PUT /productos/actualizar/:id`: Actualiza un producto existente (requiere autenticación).
- `DELETE /productos/delete/:id`: Elimina un producto (requiere autenticación).
- `PUT /productos/:id/restar-stock`: Resta el stock de un producto.

### Rutas de Usuarios
- `GET /usuarios`: Obtiene todos los usuarios.
- `POST /usuarios/register`: Crea un nuevo usuario.
- `POST /usuarios/login`: Inicia sesión y obtiene un token JWT.

### Subida de Imágenes
Las imágenes se almacenan en el directorio `public/images`.

## Licencia

Este proyecto está licenciado bajo los términos de [MIT License](LICENSE).
