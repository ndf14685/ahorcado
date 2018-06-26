let partidasJugadas, palabrasAdivinadas, palabraSeleccionada, turnosRestantes, letrasIngresadas, palabraAdivinada;
const grillaLetras = document.getElementById("letrasIngresadas");
const grillaPalabra = document.getElementById("espacioDeLetras");

function inicializar(){
    // Incializar variables Globales

    partidasJugadas = 0;
    palabrasAdivinadas = 0;
}

function seleccionarPalabra(palabras){
    // Seleccionar Palabra aleatoria de un array

    return palabras[Math.floor(Math.random() * palabras.length)];
}

function caracterValido(caracter){
    // Validar que el caracter introducido sea solo letra

    if( caracter == null || caracter.length == 0 || /^\s+$/.test(caracter) ) {
        return false;
    }
}

function caracterEnPalabra(caracter, palabra, adivinada){
    // Verificar que la letra seleccionada este en la palabra a adivinar

    let estaEnPalabra = false;

    for (let i=0; i < palabra.length; i++){
        if (caracter.toUpperCase() === palabra[i].toUpperCase()){
            adivinada[i] = palabra[i].toUpperCase();
            estaEnPalabra = true;
        }
    }

    return estaEnPalabra;
}

function caracterEnCuadro(caracter){
    // Verificar que la letra seleccionada este en las letras que ya se usaron y no forman parte de la palabra a adivinar

    return true;
}

function mostrarCaracterEnPalabra(grilla, palabra){
    // Muestra el estado de la palabra a adivinar en la pantalla

    const letrasEnPantalla = document.getElementsByClassName("guiones");

    for (let i = 0; i < palabra.length; i++){
        letrasEnPantalla[i].textContent = palabra[i];
    }
}

function mostrarCaracterEnCuadro(caracter){
    // Muestra la letra seleccionada y que no forma parte de la palabra a adivinar en la pantalla

}

function mostrarCartel(ganador){
    // Muestra lso carteles de final de juego, tanto para Ganador como para Perdedorpantalla
    if (ganador){

    } else {

    }

}

function esGanador(){
    // Verifica si acerto la palabra

}

function sacarAcentos(palabra){
    // Reemplaza las vocales acentuadas por vocales sin acento para las comparaciones

    let nuevaPalabra = '';
    
    for (let i=0; i < palabra.length; i++){
        let letra = palabra[i].toUpperCase();

        switch ( letra ) {
            case "Á": 
                letra = "A";
                break;
    
            case "É":
                letra = "E";                        
                break;

            case "Í": 
                letra = "I";
                break;
    
            case "Ó":
                letra = "O";                        
                break;

            case "Ú":
                letra = "U";                        
                break;

            default:
        }        

        nuevaPalabra += letra;
    }

    return nuevaPalabra;
}

function procesarCaracterIngresado(){
    // Procesa el caracter ingresado por el usuario
    
    const caracter = '';

    if (!caracterValido(caracter)) {
        return ;
    }

    if (caracterEnCuadro(caracter)){
        return;
    }

    if (caracterEnPalabra(caracter, palabraSeleccionada, palabraAdivinada)){
        mostrarCaracterEnPalabra(grillaPalabra, palabraAdivinada);
    } else {
        letrasIngresadas.push(caracter);

        mostrarCaracterEnCuadro(caracter);
    }

    turnosRestantes--;

    if (esGanador()) {
        mostrarCartel(true);
    } else {
        if (turnosRestantes === 0){
            mostrarCartel(false);
        }
    }
}

function blanquearGrilla(grilla){
    // Elimina los elementos que pudiera tener una grilla de la partida anterio, si huboestado de la palabra a adivinar

    while (grilla.firstChild) {
        grilla.removeChild(grilla.firstChild);
    }
}

function inicializarGrillaPalabra(objetoGrilla, cantidadLetras){
    // Configura la grilla donde se mostrara el estado de la palabra a adivinar

    blanquearGrilla(objetoGrilla);

    for (let i = 0; i < cantidadLetras; i++){
        const letra = document.createElement("div");
        letra.className = "guiones";
        letra.textContent = "_";
        objetoGrilla.appendChild(letra);
    }
}

function inicializarGrillaLetras(objetoGrilla){
    // Configura la grilla donde se mostrara las letras ingresadas y que no forman parte de la letra a adivinar

    blanquearGrilla(objetoGrilla);    
}

function jugar(){
    // Lanza el juego e inicializar lo necesario para la nueva partida

    partidasJugadas++

    palabraSeleccionada = sacarAcentos(seleccionarPalabra(listado));

    for (let i=0; i < palabraSeleccionada.length; i++){
        palabraAdivinada.push('_');
    }

    inicializarGrillaPalabra(grillaPalabra, palabraSeleccionada.length);

    inicializarGrillaLetras(grillaLetras);

    turnosRestantes = palabraSeleccionada.length + 1;
    letrasIngresadas = []
}

window.onload = function() {
    inicializar();
  };
