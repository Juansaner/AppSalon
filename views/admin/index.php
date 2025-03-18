<h1 class="nombre-pagina">Panel de administración</h1>

<?php include_once __DIR__ . '/../templates/barra.php'; ?>

<h2>Buscar citas</h2>
<div class="busqueda">
    <form class="formulario">
        <div class="campo">
            <label for="fecha">Fecha</label>
            <input type="date" id="fecha" name="fecha" value="<?php echo $fecha; ?>">
        </div>
    </form>
</div>


<div id="citas-admin" class="citas-admin">
    <?php if (!empty($citas)) : ?>
        <?php 
            $idCita = 0;
            foreach ($citas as $key => $cita) :
                if ($idCita !== $cita->id) :
                    $total = 0;
            ?>
                <ul class="citas">
                    <li class="cita-info">
                        <div class="informacion">
                            <p><i class="bi bi-stopwatch"></i><span><?php echo date("H:i", strtotime($cita->hora)); ?></span></p>
                            <p><i class="bi bi-person"></i><span><?php echo $cita->cliente; ?></span></p>
                            <p><i class="bi bi-envelope"></i><span><?php echo $cita->email; ?></span></p>
                            <p><i class="bi bi-telephone"></i><span><?php echo $cita->telefono; ?></span></p>
                        </div>
                        <div class="identificador">
                            <p>N.º <span><?php echo $cita->id; ?></span></p>
                        </div>
                    </li>
                    <h3>Servicios</h3>
                <?php 
                    $idCita = $cita->id;
                    endif; // Fin del if para nueva cita
                    $total += $cita->precio;
                ?>
                    <li class="cita-servicio">
                        <p><?php echo $cita->servicio; ?></p>
                        <p>$<?php echo number_format($cita->precio, 0, ',', '.'); ?></p>
                    </li>
                <?php
                    $actual = $cita->id;
                    $proximo = $citas[$key + 1]->id ?? 0;

                    if (esUltimo($actual, $proximo)) :
                ?>
                    <div class="precio-total">
                        <p>Total</p>
                        <p>$<?php echo number_format($total, 0, ',', '.'); ?></p>
                    </div>
                    <form action="/api/eliminar" method="POST">
                        <input type="hidden" name="id" value="<?php echo $cita->id; ?>">
                        <input type="submit" class="boton boton-eliminar" value="Eliminar">
                    </form>
                </ul>
                <?php endif; ?>
            <?php endforeach; // Fin del foreach ?>
    <?php else : ?>
        <h2>No hay citas para esta fecha</h2>
    <?php endif; ?>
</div>


<?php $script = "<script src='build/js/buscador.js'></script>" ?>