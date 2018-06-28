// @ts-nocheck
let partidasJugadas, palabrasAdivinadas, palabraSeleccionada, turnosRestantes, letrasIngresadas, palabraAdivinada, grillaLetras, grillaPalabra, botonJugar, botonLetra, botonArriesgar, letraIngresada, turnos;

function inicializar(){
    // Incializar variables Globales

    grillaLetras = document.getElementById("letrasIngresadas");
    grillaPalabra = document.getElementById("espacioDeLetras");
    botonJugar = document.getElementById("boton");
    botonLetra = document.getElementById("enter");
    botonArriesgar = document.getElementById("arriesgar");
    turnos = document.getElementById("selectorDeTurno");

    partidasJugadas = 0;
    palabrasAdivinadas = 0;

    botonJugar.addEventListener("click", jugar);
    botonLetra.addEventListener("click", procesarCaracterIngresado);
    botonArriesgar.addEventListener("click", arriesgarPalabra);

    document.getElementById("juego").style.display = "none";
}

function seleccionarPalabra(palabras){
    // Seleccionar Palabra aleatoria de un array

    return palabras[Math.floor(Math.random() * palabras.length)].toUpperCase();
}

function caracterValido(caracter){
    // Validar que el caracter introducido sea solo letra

    if( caracter === null || caracter.length === 0 || caracter.charCodeAt() < 65 || (caracter.charCodeAt() > 90 && caracter.charCodeAt() !== 209)) {
        return false;
    }

    return true;
}

function caracterEnPalabra(caracter, palabra, adivinada){
    // Verificar que la letra seleccionada este en una determinada palabra, de ser necesario la muestra como adivinada
    let estaEnPalabra = false;
    let espacios = 0;

    for (let i=0; i < palabra.length; i++){
        if (adivinada && palabra[i] === " "){
            espacios++;
        }
        if (caracter === palabra[i]){
            if (adivinada){
                adivinada[i - espacios] = palabra[i];
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
    let titulo, mensaje, icono;

    if (ganador){
        titulo = "Ganaste!";
        mensaje = "Adivinaste la palabra '" + palabraSeleccionada + "'";
        icono = "success";
    } else {
        titulo = "Perdiste!";
        mensaje = "La palabra era '" + palabraSeleccionada + "'";
        icono = "error";
    }

    swal(titulo, mensaje, icono, {
        buttons: {
            seguir: {
                text: "Seguir Jugando!",
                value: "seguir"
            },           
            estadistica: {
                text: "Estadisticas",
                value: "estadistica"
            },
            salir: {
                text: "Salir",
                value: "exit"
            },          
        },
    })
    .then((value) => {
        switch (value) {
            case "seguir":
                jugar();
                break;

            case "estadistica":
                swal("Estadisticas","Jugaste " + partidasJugadas + " partidas\n" + "Acertastes " + palabrasAdivinadas + " palabras\n" + "No pudiste adivinar " + (partidasJugadas - palabrasAdivinadas) + " veces","info", {
                    buttons: {
                        seguir: {
                            text: "Seguir Jugando!",
                            value: "seguir"
                        },           
                        salir: {
                            text: "Salir",
                            value: "exit"
                        },          
                    },     
                })
                .then((value) => {
                    switch (value) {
                        case "seguir":
                            jugar();
                            break;

                        default:
                            inicializar()
                    }
                });

                break;

            default:
                inicializar();
        }
    });
}

function arriesgarPalabra(){
    swal("Escribe la palabra completa:", {
        content: "input",
    })
    .then((value) => {
        if(value.toUpperCase() === palabraSeleccionada){
            mostrarCartel(true);
        } else {            
            mostrarCartel(false);
        }        
    });
}

function esGanador(palabraOriginal, palabraCompletada){
    // Verifica si acerto la palabra

    let espacios = 0;
    for (let i=0; i < palabraOriginal.length; i++){
        if (palabraOriginal[i] === " "){
            espacios++;
        }

        if (palabraOriginal[i + espacios] !== palabraCompletada[i]){
            return false;
        }
    }

    return true;
}

function sacarAcentos(palabra){
    // Reemplaza las vocales acentuadas por vocales sin acento para las comparaciones
    
    let nuevaPalabra = "";
    
    for (let i=0; i < palabra.length; i++){
        let letra = palabra[i];

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
    
    // @ts-ignore
    const caracter = document.getElementById("recuadroLetra").value.toUpperCase() ;    

    document.getElementById("recuadroLetra").value = "";

    document.getElementById("recuadroLetra").focus();
    
    if (!caracterValido(caracter)) {
        swal("","Solo son validos los caracteres de la A-Z!","error");

        return ;
    }

    if (caracterEnPalabra(caracter, letrasIngresadas)){
        swal("","La letra '" + caracter + "' ya la habias seleccionado y no estaba en la palabra a adivinar","info" );

        return;
    }

    if (caracterEnPalabra(caracter, palabraAdivinada)){
        swal("","La letra '" + caracter + "' ya la habias seleccionado y ya esta en la palabra a adivinar","info" );        

        return;
    }

    if (caracterEnPalabra(caracter, palabraSeleccionada, palabraAdivinada)){
        mostrarCaracterEnPalabra(grillaPalabra, palabraAdivinada);

        if (esGanador(palabraSeleccionada, palabraAdivinada)) {
            palabrasAdivinadas++;
            
            mostrarCartel(true);
        } 
    } else {
        letrasIngresadas.push(caracter);

        mostrarCaracterEnLetrasIngresadas(grillaLetras, caracter);

        turnosRestantes--;

        mostrarTurnos(turnos, turnosRestantes);        

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

function inicializarGrillaPalabra(grilla, palabra){
    // Configura la grilla donde se mostrara el estado de la palabra a adivinar

    blanquearGrilla(grilla);

    for (let i = 0; i < palabra.length; i++){
        const letra = document.createElement("div");

        if (palabra[i] !== " ") {
            letra.className = "guiones";
        } else {
            letra.className = "espacios";
        }
        
        letra.textContent = "";
        grilla.appendChild(letra);
    }
}

function inicializarGrillaLetras(grilla){
    // Configura la grilla donde se mostrara las letras ingresadas y que no forman parte de la letra a adivinar

    blanquearGrilla(grilla);    
}

function jugar(){
    // Lanza el juego e inicializar lo necesario para la nueva partida

    document.getElementById("juego").style.display = "block";

    partidasJugadas++
    
    palabraSeleccionada = sacarAcentos(seleccionarPalabra(listado));
    palabraAdivinada = [];

    for (let i=0; i < palabraSeleccionada.length; i++){
        if (palabraSeleccionada[i] !== " "){
            palabraAdivinada.push("");
        }
    }

    inicializarGrillaPalabra(grillaPalabra, palabraSeleccionada);

    inicializarGrillaLetras(grillaLetras);

    turnosRestantes = palabraSeleccionada.length + 1;

    mostrarTurnos(turnos, turnosRestantes);

    letrasIngresadas = []
}

window.onload = function() {
    inicializar();
};
