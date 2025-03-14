<h1 class="nombre-pagina">Nuevo servicio</h1>
<p class="descripcion-pagina">Añade un nuevo servicio</p>

<?php 
    include_once __DIR__ . '/../templates/barra.php';
    include_once __DIR__ . '/../templates/alertas.php';
?>

<form action="/servicios/crear" method="POST" class="formulario">
    <?php include_once __DIR__ . '/formulario.php'; ?>
    <div class="boton-centrado">
        <input type="submit" class="boton" value="Agregar">
    </div>
</form>