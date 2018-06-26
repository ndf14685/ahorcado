let partidasJugadas, palabrasAdivinadas, palabraSeleccionada, turnosRestantes, letrasIngresadas = []

function inicializar(){
    partidasJugadas = 0;
    palabrasAdivinadas = 0;
}


function seleccionarPalabra(palabras){
    return palabras[Math.floor(Math.random() * palabras.length)];
}

function caracterValido(caracter){
  tecla = (document.all) ? caracter.keyCode : caracter.which; // 2
  if (tecla==8) return true; // 3
  patron =/[A-Za-z\s]/; // 4
  te = String.fromCharCode(tecla); // 5
  return patron.test(te); // 6
}

function caracterEnPalabra(caracter){
    return true;
}

function caracterEnCuadro(caracter){
    return true;
}

function mostrarCaracterEnPalabra(caracter){

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

function ingresoCaracter(){
    const caracter = '';

    if (!caracterValido(caracter)) {
        return ;
    }

    if (caracterEnCuadro(caracter)){
        return;
    }

    if (caracterEnPalabra(caracter)){
        mostrarCaracterEnPalabra(caracter);
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

function jugar(){
    partidasJugadas++

    palabraSeleccionada = seleccionarPalabra(listado);

    turnosRestantes = palabraSeleccionada.length + 1;
    letrasIngresadas = []
}

window.onload = function() {
    inicializar();
  };
