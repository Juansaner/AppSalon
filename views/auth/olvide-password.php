<h1 class="nombre-pagina">Olvidé password</h1>
<p class="descripcion-pagina">Reestablece tu contraseña escribiendo su correo a continuación</p>

<form class="formulario" action="/olvide-password" method="POST">

    <div class="campo">
        <label for="email">Correo</label>
        <input type="email" id="email" name="email" placeholder="Ingresa tu contraseña">
    </div>

    <input type="submit" value="Enviar instrucciones" class="boton">
</form>

<div class="acciones">
    <a href="/">¿Ya tienes una cuenta? Inicia sesión</a>
    <a href="/crear-cuenta">¿Aún no tienes cuenta? Crear una</a>
</div>