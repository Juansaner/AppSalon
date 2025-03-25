# 💈App Web para agendamiento de citas en barbería
Esta aplicación permite a los clientes reservar citas en una barbería seleccionando los servicios deseados. Los administradores pueden gestionar servicios y citas desde el panel de administración.
# 🚀 Características
📅 Agendamiento de citas con selección de fecha y hora.

💇 Selección de servicios con precios visibles.

📂 Resumen de cita con detalles del cliente, fecha, hora y servicios.

👤 Panel de administración para gestionar servicios y reservas.

🔄 Interfaz dinámica con JavaScript para una mejor experiencia de usuario.

# 🛠️ Tecnologías utilizadas
- HTML5 y CSS3 (Sass).

- JavaScript para interactividad.

- PHP para la lógica del servidor.

- MySQL para almacenamiento de datos.

- SweetAlert para alertas elegantes.

- PHPMailer para establecer una conexión SMTP con un servidor de correo y asi mismo enviar los correos.

- Mailtrap para pruebas de correo en entorno de desarrollo.

- Dotenv para gestionar variables de entorno.

# 📥 Instalación y configuración
1. Clona el repositorio:
	`git clone https://github.com/tuusuario/app-barberia.git`
2. Cambia al directorio:
	`cd app-barberia`
3. Crear una base de datos con el nombre **appsalon**.
4. Configura la conexión a la base de datos en config/database.php.
5. Crea un archivo `.env ` en la raíz del proyecto y configura las credenciales:
`DB_HOST=localhost`
`DB_USER=tu_usuario`
`DB_PASS=tu_contraseña`
`DB_NAME=nombre_base_de_datos`
`MAIL_HOST=smtp.mailtrap.io`
`MAIL_USER=tu_usuario_mailtrap`
`MAIL_PASS=tu_contraseña_mailtrap`
`MAIL_PORT=2525`
6. Instala las dependencias de Composer: `composer install`.
7. Instala las dependencias: `npm install`.
8. Ejecuta Gulp para compilar el código: `npm run gulp`.
9. Dirígete a la carpeta public: ` cd public` .
10. Ejecuta el servidor local con PHP: `php -S localhost:3000`.
11. Accede a http://localhost:3000 en tu navegador.

# 📌 Uso del proyecto
- Clientes pueden seleccionar servicios y agendar citas.

- Administradores pueden agregar, editar y eliminar servicios.

- Resumen de cita muestra todos los detalles antes de confirmar.

- PHPMailer y Mailtrap manejan el envío de correos para notificaciones importantes.

# 📝 Contribuciones
Si deseas contribuir, abre un Issue o envía un Pull Request.
