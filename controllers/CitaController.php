<?php

namespace Controllers;
use MVC\Router;

class CitaController {
    public static function index(Router $router) {
        //Verifica si no ha iniciado sesión
        if (!isset($_SESSION['nombre'])){
            header('Location: /');
        } 

        $router->render('cita/index', [
            'nombre' => $_SESSION['nombre']
        ]);
    }
}