let partidasJugadas, palabrasAdivinadas, palabraSeleccionada, turnosRestantes, letrasIngresadas, palabraAdivinada;
const grillaLetras = document.getElementById("letrasIngresadas");
const grillaPalabra = document.getElementById("espacioDeLetras");
const botonJugar = document.getElementById("boton");
const botonLetra = document.getElementById("enter");
const letraIngresada = document.getElementById("recuadroLetra");
const turnos = document.getElementById("selectorDeTurno");

function inicializar(){
    // Incializar variables Globales

    partidasJugadas = 0;
    palabrasAdivinadas = 0;

    botonJugar.addEventListener('click', jugar);
    botonLetra.addEventListener('click', procesarCaracterIngresado);

    botonJugar.hidden = true;
    botonLetra.hidden = false;
    letraIngresada.hidden = false;
    turnos.hidden = false;
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
    // Verificar que la letra seleccionada este en una determinada palabra, de ser necesario la muestra como adivinada
    let estaEnPalabra = false;

    for (let i=0; i < palabra.length; i++){
        if (caracter.toUpperCase() === palabra[i].toUpperCase()){
            if (adivinada){
                adivinada[i] = palabra[i].toUpperCase();
            }

            estaEnPalabra = true;
        }
    }

    return estaEnPalabra;
}

function mostrarCaracterEnPalabra(grilla, palabra){
    // Muestra el estado de la palabra a adivinar en la pantalla

    const letrasEnPantalla = document.getElementsByClassName("guiones");

    for (let i = 0; i < palabra.length; i++){
        letrasEnPantalla[i].textContent = palabra[i];
    }
}

function mostrarCaracterEnLetrasIngresadas(grilla, caracter){
    // Muestra la letra seleccionada y que no forma parte de la palabra a adivinar en la pantalla
    const letra = document.createElement("div");
    letra.className = "textoDeLetras";
    letra.textContent = caracter;
    grilla.appendChild(letra);
}

function mostrarTurnos(turnosEnPantalla, cantidadTurnos){
    // Muestra la cantidad de Turnos restantes

    turnosEnPantalla.textContent = cantidadTurnos;
}


function mostrarCartel(ganador){
    // Muestra los carteles de final de juego, tanto para Ganador como para Perdedor
    if (ganador){

    } else {

    }
}

function esGanador(palabra){
    // Verifica si acerto la palabra

    for (let i=0; i < palabra.length; i++){
        if (palabra[i] === "_"){
            return false;
        }
    }

    return true;
}

function mostrarEstadistica(){
    // Muestra la estadisticas de las partidas jugadas

    alert( "Jugaste " + partidasJugadas + " partidas\n" + "Acertastes " + palabrasAdivinadas + " palabras\n" + "No pudiste adivinar " + (partidasJugadas - palabrasAdivinadas) + " veces" );
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
    
    const caracter = letraIngresada.textContent;

    if (!caracterValido(caracter)) {
        alert( "Solo son validas las letras de la A-Z o a-z" );

        return ;
    }

    if (caracterEnPalabra(caracter, letrasIngresadas)){
        return;
    }

    if (caracterEnPalabra(caracter, palabraSeleccionada, palabraAdivinada)){
        mostrarCaracterEnPalabra(grillaPalabra, palabraAdivinada);
    } else {
        letrasIngresadas.push(caracter);

        mostrarCaracterEnLetrasIngresadas(grillaLetras, caracter);
    }

    turnosRestantes--;

    mostrarTurnos(turnos, turnosRestantes);    

    if (esGanador(palabraAdivinada)) {
        palabrasAdivinadas++;
        
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

function inicializarGrillaPalabra(grilla, cantidadLetras){
    // Configura la grilla donde se mostrara el estado de la palabra a adivinar

    blanquearGrilla(grilla);

    for (let i = 0; i < cantidadLetras; i++){
        const letra = document.createElement("div");
        letra.className = "guiones";
        letra.textContent = "_";
        grilla.appendChild(letra);
    }
}

function inicializarGrillaLetras(grilla){
    // Configura la grilla donde se mostrara las letras ingresadas y que no forman parte de la letra a adivinar

    blanquearGrilla(grilla);    
}

function jugar(){
    // Lanza el juego e inicializar lo necesario para la nueva partida

    botonJugar.hidden = false;
    botonLetra.hidden = true;
    letraIngresada.hidden = true;
    turnos.hidden = true;

    partidasJugadas++

    palabraSeleccionada = sacarAcentos(seleccionarPalabra(listado));

    for (let i=0; i < palabraSeleccionada.length; i++){
        palabraAdivinada.push('_');
    }

    inicializarGrillaPalabra(grillaPalabra, palabraSeleccionada.length);

    inicializarGrillaLetras(grillaLetras);

    turnosRestantes = palabraSeleccionada.length + 1;

    mostrarTurnos(turnos, turnosRestantes);

    letrasIngresadas = []
}

window.onload = function() {
    inicializar();
  };
