<h1 class="nombre-pagina">Servicios</h1>
<p class="descripcion-pagina">Administrador de servicios</p>

<?php 
    include_once __DIR__ . '/../templates/barra.php';
    
?>
<ul class="servicios">
    <?php 
        foreach($servicios as $servicio) { 
        $precioFormateado = number_format($servicio->precio, 0, ',', '.'); 
    ?>
        <li>
            <p>Nombre: <span><?php echo $servicio->nombre; ?></span></p>
            <p>Precio: <span>$<?php echo $precioFormateado; ?></span></p>
        </li>

        <div class="acciones">
            <a href="/servicios/actualizar?id=<?php echo $servicio->id; ?>" class="boton">Actualizar</a>
            
            <form action="/servicios/eliminar" method="POST">
                <input type="hidden" name="id" value="<?php echo $servicio->id; ?>">

                <input type="submit" value="Eliminar" class="boton-eliminar">
            </form>
        </div>
    <?php } ?>
</ul>