<h1 class="nombre-pagina">Inicio de sesión</h1>
<p class="descripcion-pagina">Inicia sesión con tus datos</p>

<?php 
    include_once __DIR__ . "/../templates/alertas.php";
?>

<form class="formulario" method="POST" action="/">
    <div class="campo">
        <label for="email">Correo</label>
        <input id="email" type="email" placeholder="Ingresa tu correo" name="email">
    </div>
    <div class="campo">
        <label for="email">Contraseña</label>
        <input id="password" type="password" placeholder="Ingresa tu contraseña" name="password">
    </div>
    <div class="boton-centrado">
        <input type="submit" class="boton" value="Iniciar sesión">
    </div>
    
</form>

<div class="acciones-formulario">
    <a href="/crear-cuenta">¿Aún no tienes una cuenta? <span>Crea una</span></a>
    <a href="/olvide">¿Olvidaste tu contraseña?</a>
</div>

<?php $script = "<script src='build/js/centrar.js'></script>" ?>