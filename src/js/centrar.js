document.addEventListener('DOMContentLoaded', function() {
    iniciarApp();
})

function iniciarApp() {
    agregarClase();
}

function agregarClase() {
    const claseCentrar = document.querySelector('.app');
    const paginasCentradas = ['/', '/olvide', '/crear-cuenta', '/mensaje', '/confirmar-cuenta', '/recuperar']; 
    if(paginasCentradas.includes(location.pathname)){
        claseCentrar.classList.add('centrar');
    } else {
        claseCentrar.classList.remove('centrar');
    }
}