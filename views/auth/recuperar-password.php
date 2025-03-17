<h1 class="nombre-pagina">Recuperar contraseña</h1>
<p class="descripcion-pagina">Coloca tu nueva contraseña a continuación</p>

<?php 
    include_once __DIR__ . "/../templates/alertas.php";
?>

<?php if($error) return; ?>
<form class="formulario" method="POST">
<div class="campo">
    <label for="password">Contraseña</label>
    <input type="password" id="password" name="password" placeholder="Tu nueva contraseña" />
</div>
<div class="boton-centrado">
    <input type="submit" class="boton" value="Guardar nueva contraseña">
</div>
</form>

<div class="acciones-formulario">
    <a href="/">¿Ya tienes cuenta? <span>Iniciar sesión</span></a>
    <a href="/crear-cuenta">¿Aún no tienes cuenta? <span>Obtener una</span></a>
</div>

<?php $script = "<script src='build/js/centrar.js'></script>" ?>