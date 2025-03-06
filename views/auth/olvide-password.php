<h1 class="nombre-pagina">Olvidé la contraseña</h1>
<p class="descripcion-pagina">Reestablece la contraseña con tu correo electrónico</p>

<?php 
    include_once __DIR__ . "/../templates/alertas.php";
?>

<form class="formulario" action="/olvide" method="POST">

    <div class="campo">
        <label for="email">Correo</label>
        <input type="email" id="email" name="email" placeholder="Ingresa tu correo">
    </div>
    <div class="boton-centrado">
        <input type="submit" value="Enviar instrucciones" class="boton">
    </div>
</form>

<div class="acciones-formulario">
    <a href="/">¿Ya tienes una cuenta? <span>Inicia sesión</span></a>
    <a href="/crear-cuenta">¿Aún no tienes cuenta? <span>Crea una</span></a>
</div>

<?php $script = "<script src='build/js/centrar.js'></script>" ?>