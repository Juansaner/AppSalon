let paso = 1;
const pasoInicial = 1;
const pasoFinal = 3;

const cita = {
    id: '',
    nombre: '',
    fecha: '',
    hora: '',
    servicios: []
}

document.addEventListener('DOMContentLoaded', function() {
    iniciarApp();
});

function iniciarApp() {
    mostrarSeccion(); //Muestra y oculta las secciones
    tabs(); //Cambia la selección cuando se presiona un tab
    botonesPaginador(); // Agrega o quita los botones del paginador
    paginaSiguiente();
    paginaAnterior();

    consultarAPI(); //Consulta la API en el backend de PHP

    idCliente();
    nombreCliente();//Añade el nombre del cliente al objeto de cita
    seleccionarFecha();//Añade la fecha de la cita en el objeto
    seleccionarHora();//Añade la hora de la cita en el objeto

    mostrarResumen();//Muestra el resumen de la cita
}

function mostrarSeccion() {
    //Ocultar la sección que tenga la clase de mostrar
    const seccionAnterior = document.querySelector('.mostrar');
    if(seccionAnterior) {
        seccionAnterior.classList.remove('mostrar');
    }

    // Seleccionar la sección con el paso
    const pasoSelector = `#paso-${paso}`;
    const seccion = document.querySelector(pasoSelector);
    seccion.classList.add('mostrar');

    //Quita la clase actual al tab anterior
    const tabAnterior = document.querySelector('.actual');
    if(tabAnterior) {
        tabAnterior.classList.remove('actual');
    }

    //Resalta el tab actual
    const tab = document.querySelector(`[data-paso="${paso}"]`);
    tab.classList.add('actual');
}

function tabs() {
    const botones = document.querySelectorAll('.tabs button');
    botones.forEach( boton => {
        boton.addEventListener('click', function(e) {
            paso = parseInt(e.target.dataset.paso);
            mostrarSeccion();
            botonesPaginador();
        });
    })
}

function botonesPaginador() {
    const paginaSiguiente = document.querySelector('#siguiente');
    const paginaAnterior = document.querySelector('#anterior');

    if(paso === 1) {
        paginaSiguiente.classList.remove('ocultar');
        paginaAnterior.classList.add('ocultar');
    } else if(paso === 3) {
        paginaAnterior.classList.remove('ocultar');
        paginaSiguiente.classList.add('ocultar');
        mostrarResumen();
    } else {
        paginaAnterior.classList.remove('ocultar');
        paginaSiguiente.classList.remove('ocultar');
    }
    mostrarSeccion();
}

function paginaSiguiente() {
    const paginaSiguiente = document.querySelector('#siguiente');
    paginaSiguiente.addEventListener('click', function() {

        if(paso >= pasoFinal) return;
        paso++;
        botonesPaginador();
    })
}

function paginaAnterior() {
    const paginaAnterior = document.querySelector('#anterior');
    paginaAnterior.addEventListener('click', function() {

        if(paso <= pasoInicial) return;
        paso--;
        botonesPaginador();
    })
}

async function consultarAPI() {
    try {
        const url = 'http://localhost:3000/api/servicios'; //Consulta API
        const resultado = await fetch(url); //Espera que se cargue todo  y obtiene resultados
        const servicios = await resultado.json(); //Resultados en JSON
        mostrarServicios(servicios);
    } catch (error) {
        console.log(error);
    }
}

function mostrarServicios(servicios) {
    servicios.forEach( servicio => {
        const { id, nombre, precio } = servicio;

        const nombreServicio = document.createElement('P');
        nombreServicio.classList.add('nombre-servicio');
        nombreServicio.textContent = nombre;

        const precioServicio = document.createElement('P');
        precioServicio.classList.add('precio-servicio');
        precioServicio.textContent = `$${parseFloat(precio).toLocaleString('es-CO')}`;

        const servicioDiv = document.createElement('DIV');
        servicioDiv.classList.add('servicio');
        servicioDiv.dataset.idServicio = id;
        servicioDiv.onclick = function() {
            seleccionarServicio(servicio);
        }
        
        const infoServicioDiv = document.createElement('DIV');
        infoServicioDiv.classList.add('servicio-info');

        const iconoDiv = document.createElement('DIV');
        iconoDiv.classList.add('servicio-icono');
        iconoDiv.innerHTML = '<i class="bi bi-plus"></i>';

        infoServicioDiv.appendChild(nombreServicio);
        infoServicioDiv.appendChild(precioServicio);
        servicioDiv.appendChild(infoServicioDiv);
        servicioDiv.appendChild(iconoDiv);

        document.querySelector('#servicios').appendChild(servicioDiv); //Lo añade a la vista
    });
}

function seleccionarServicio(servicio) {
    const { id } = servicio;
    const { servicios } = cita; //Extrae arreglo de servicios

    //identificar el elemento al que se la da click
    const divServicio = document.querySelector(`[data-id-servicio="${id}"]`);
    const iconoDiv = divServicio.querySelector('.servicio-icono');
    //Comprobar si un servicio ya fue agregado
    if(servicios.some( agregado => agregado.id === id)) {
        //Eliminarlo
        cita.servicios = servicios.filter( agregado => agregado.id !== id);
        divServicio.classList.remove('seleccionado');
        iconoDiv.classList.remove('oculto');
    } else {
        //Agregarlo
        cita.servicios = [...servicios, servicio]; //Copia de arreglo de servicios y agrega el servicio
        divServicio.classList.add('seleccionado');
        iconoDiv.classList.add('oculto');
    }
}

function idCliente() {
    const id = document.querySelector('#id').value;
    cita.id = id;
}

function nombreCliente() {
    const nombre = document.querySelector('#nombre').value;
    cita.nombre = nombre;
}

function seleccionarFecha() {
    const inputFecha = document.querySelector('#fecha');
    inputFecha.addEventListener('input', function(e) {

        const dia = new Date(e.target.value).getUTCDay(); //Instancia de la fecha 

        //Comprobar si la fecha es sábado o domingo
        if([6, 0].includes(dia)) {
            e.target.value = '';
            mostrarAlerta('error', 'Fines de semana no permitidos', '.formulario');
        } else {
            const fecha = e.target.value;
            cita.fecha = fecha;
        }
    });
}

function seleccionarHora() {
    const inputHora = document.querySelector('#hora');
    inputHora.addEventListener('input', function(e) {

        const horaCita = e.target.value;
        const hora = horaCita.split(":")[0];
        if(hora < 10 || hora > 18) {
            e.target.value = '';
            mostrarAlerta('error', 'Hora no permitida', '.formulario');
        } else {
            cita.hora = e.target.value;
        }
    })
}

function mostrarAlerta(tipo, mensaje, elemento, desaparece = true) {
    //Comprueba si ya existe una alerta
    const alertaPrevia = document.querySelector('.alerta');
    if(alertaPrevia) {
        alertaPrevia.remove();
    }
    //Scripting para eliminar la alerta
    const alerta = document.createElement('DIV');
    alerta.textContent = mensaje;
    alerta.classList.add('alerta');
    alerta.classList.add(tipo);

    const referencia = document.querySelector(elemento);
    referencia.appendChild(alerta);

    if(desaparece) {
        //Elimina alerta después de 3s
        setTimeout(() => {
            alerta.remove();
        }, 3000);
    }
    
}

function mostrarResumen() {
    const resumen = document.querySelector('.contenido-resumen');

    //Limpiar el contenido de resumen
    while(resumen.firstChild){
        resumen.removeChild(resumen.firstChild);
    }

    if(Object.values(cita).includes('') || cita.servicios.length === 0) {
        mostrarAlerta('error', 'Faltan datos de servicios, fecha u hora', '.contenido-resumen', false);
        return;
    } 

    //Formatear el div de resumen
    const { nombre, fecha, hora, servicios } = cita;

    //heading para cita en Resumen
    const headingCita = document.createElement('H2');
    headingCita.textContent = 'Resumen de cita';
    resumen.appendChild(headingCita);

    const contenedorResumenCita = document.createElement('DIV');
    contenedorResumenCita.classList.add('contenedor-resumen-cita');
    resumen.appendChild(contenedorResumenCita);

    const contenedorCita = document.createElement('DIV');
    contenedorCita.classList.add('contenedor-cita');
    contenedorResumenCita.appendChild(contenedorCita);

    const nombreCliente = document.createElement('P');
    nombreCliente.innerHTML = `<i class="bi bi-person"></i> <span>${nombre}</span>`;

    //Formatear la fecha en español
    const fechaObj = new Date(fecha);
    const month = fechaObj.getMonth();
    const day = fechaObj.getDate() + 2;
    const year = fechaObj.getFullYear();

    //Instancia de fecha
    const fechaUTC = new Date( Date.UTC(year, month, day));

    const opciones = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
    const fechaFormateada = fechaUTC.toLocaleDateString('es-CO', opciones);

    const fechaCita = document.createElement('P');
    fechaCita.innerHTML = `<i class="bi bi-calendar-event"></i> <span>${fechaFormateada}</span>`;

    const horaCita = document.createElement('P');
    horaCita.innerHTML = `<i class="bi bi-stopwatch"></i> <span>${hora}</span>`;

    contenedorCita.appendChild(nombreCliente);
    contenedorCita.appendChild(fechaCita);
    contenedorCita.appendChild(horaCita);

    //heading para Servicios en Resumen
    const headingServicios = document.createElement('H3');
    headingServicios.textContent = 'Resumen de servicios';
    contenedorResumenCita.appendChild(headingServicios);

    //Iterando y mostrando los servicios
    servicios.forEach(servicio => {
        const { id, precio, nombre } = servicio;
        const contenedorServicio = document.createElement('DIV');
        contenedorServicio.classList.add('contenedor-servicio');

        const textoServicio = document.createElement('P');
        textoServicio.textContent = nombre;

        const precioServicio = document.createElement('P');
        precioServicio.textContent = `$${parseFloat(precio).toLocaleString('es-CO')}`;

        contenedorServicio.appendChild(textoServicio);
        contenedorServicio.appendChild(precioServicio);

        contenedorResumenCita.appendChild(contenedorServicio);
    });

    precioTotalServicio();

    //Boton para crear una cita
    const botonReservar = document.createElement('BUTTON');
    botonReservar.classList.add('boton');
    botonReservar.textContent = 'Reservar cita';
    botonReservar.onclick = reservarCita;
    contenedorResumenCita.appendChild(botonReservar);
}

function precioTotalServicio() {
    const contenedorCita = document.querySelector('.contenedor-resumen-cita');
    let total = 0;
    const { servicios } = cita;

    servicios.forEach( servicio => {
        const { precio } = servicio;
        total += parseFloat(precio);
    })

    const contenedorPrecioTotal = document.createElement('DIV');
    contenedorPrecioTotal.classList.add('contenedor-precio-total');

    const textoTotal = document.createElement('P');
    textoTotal.textContent = 'Total';

    const precioTotal = document.createElement('P');
    precioTotal.textContent = `COP $${total.toLocaleString('es-CO')}`;

    const totalPrevio = document.querySelector('.contenedor-precio-total');
    if(totalPrevio) {
        totalPrevio.remove();
    }

    contenedorPrecioTotal.appendChild(textoTotal);
    contenedorPrecioTotal.appendChild(precioTotal);
    contenedorCita.appendChild(contenedorPrecioTotal);
}

//Evía datos a la API
async function reservarCita() {
    const { id, nombre, fecha, hora, servicios } = cita;

    const idServicios = servicios.map( servicio => servicio.id);

     const datos = new FormData();
     datos.append('fecha', fecha);
     datos.append('hora', hora);
     datos.append('usuarioId', id);
     datos.append('servicios', idServicios);
     

    try {
            //Petición hacia la api
        const url = 'http://localhost:3000/api/citas';

        const respuesta = await fetch(url, {
            method: 'POST',
            body: datos
        });
        
        const resultado = await respuesta.json();
        console.log(resultado);

        if(resultado.resultado) {
            Swal.fire({
                icon: "success",
                title: "Cita creada",
                text: "La cita fue creada correctamente",
                button: "OK"
            }).then(() => {
                window.location.reload();
            }, 3000);
        }

    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "Hubo un error al guardar la cita",
            button: "OK"
        })
    }

    

     //console.log([...datos]);
}