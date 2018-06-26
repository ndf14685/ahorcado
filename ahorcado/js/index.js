let partidasJugadas, palabrasAdivinadas, palabraSeleccionada, turnosRestantes, letrasIngresadas, palabraAdivinada;
const grillaLetras = document.getElementById("");
const grillaPalabra = document.getElementById("espacioDeLetras");

function inicializar(){
    partidasJugadas = 0;
    palabrasAdivinadas = 0;
}

function seleccionarPalabra(palabras){
    return palabras[Math.floor(Math.random() * palabras.length)];
}

function caracterValido(caracter){
    if( caracter == null || caracter.length == 0 || /^\s+$/.test(caracter) ) {
        return false;
      }
    }

function caracterEnPalabra(caracter, palabra, adivinada){
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
    return true;
}

function mostrarCaracterEnPalabra(grilla, palabra){
    const letrasEnPantalla = document.getElementsByClassName("guiones");

    for (let i = 0; i < palabra.length; i++){
        letrasEnPantalla[i].textContent = palabra[i];
    }
}

function mostrarCaracterEnCuadro(caracter){

}

function mostrarCartel(ganador){
    if (ganador){

    } else {

    }

}

function gano(){

}

function sacarAcentos(palabra){
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

function ingresoCaracter(){
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

    if (gano()) {
        mostrarCartel(true);
    } else {
        if (turnosRestantes === 0){
            mostrarCartel(false);
        }
    }
}

function crearGrillaPalabra(objetoGrilla, cantidadLetras){
    for (let i = 0; i < cantidadLetras; i++){
        const letra = document.createElement("div");
        letra.className = "guiones";
        letra.textContent = "_";
        objetoGrilla.appendChild(letra);
    }
}

function jugar(){
    partidasJugadas++

    palabraSeleccionada = seleccionarPalabra(listado);
    palabraSeleccionada = sacarAcentos(palabraSeleccionada);

    for (let i=0; i < palabraSeleccionada.length; i++){
        palabraAdivinada.push('_');
    }

    crearGrillaPalabra(grillaPalabra, palabraSeleccionada.length);

    mostrarCaracterEnPalabra(grillaPalabra, palabraAdivinada)
     
    turnosRestantes = palabraSeleccionada.length + 1;
    letrasIngresadas = []
}

window.onload = function() {
    inicializar();
  };
