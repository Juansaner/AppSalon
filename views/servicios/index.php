<h1 class="nombre-pagina">Servicios</h1>
<p class="descripcion-pagina">Administrador de servicios</p>

<?php 
    include_once __DIR__ . '/../templates/barra.php';
    
?>
<ul class="servicios">
    <?php 
        foreach($servicios as $servicio) { 
    ?>
    <div class="contenido-servicio">
        <li class="info-servicio">
            <p><span>Nombre: </span> <?php echo $servicio->nombre; ?></p>
            <p><span>Precio: </span>$<?php echo number_format($servicio->precio, 0, ',', '.'); ?></span></p>
        </li>

        <div class="acciones">
            <form action="/servicios/eliminar" method="POST">
                <input type="hidden" name="id" value="<?php echo $servicio->id; ?>">
                <input type="submit" value='Eliminar' class="boton-eliminar">
            </form>
            <a href="/servicios/actualizar?id=<?php echo $servicio->id; ?>" class="boton"><i class="bi bi-pencil"></i>Actualizar</a>
        </div>
    </div>
    <?php } ?>
</ul>