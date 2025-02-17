<?php

namespace Controllers;

class CitaController {
    public static function index(Router $router) {
        $router->render('cita/index', [
            
        ]);
    }
}