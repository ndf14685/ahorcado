# Proyecto Ahorcado
La idea es armar un proyecto siguiendo el proceso de trabajo de una empresa, desde la presentación de las especificaciones del cliente hasta presentar el proyecto final.

## Detalles solicitados

### Juego.
AL iniciar el juego (por medio de un botón) se debe seleccionar del listado una palabra de forma aleatoria y mostrar la cantidad de caracteres que corresponden en pantalla.

El jugador tendrá tantos turnos como cantidad de caracteres tenga la palabra seleccionada + 1, esta información se debe mostrar en pantalla.

Los caracteres se ingresarán mediante un área de texto, si el caracter corresponde a uno de la palabra (se considerara acertar si corresponde a una letra la palabra, ya sea con acento o mayúscula a = á = A M = m) se tendrá que mostrar en pantalla la ubicación del mismo, si no corresponde se mostrará en otra zona de la pantalla (letras ingresadas)

El juego finaliza de 2 formas, Ganando el juego (ver Ganador) o perdiendo el juego, el juego se pierde cuando el jugador no acertó la palabra en la cantidad de turnos indicado en pantalla.

### Ganador.

Cuando la palabra es adivinada antes del límite de turnos se dictamina al jugador como ganador y se finalizará la partida

### Fin del juego.

Cuando el jugador termina la partida se le mostrará un aviso en pantalla, indicando si ganó o perdió. Dicho cartel debe tener 3 botones en la parte inferior, en el siguiente orden: un botón para seguir jugando, con el texto SEGUIR JUGANDO, otro para mostrar las estadísticas de partidas jugadas (palabras adivinadas) de cantidad de veces jugadas, aciertos y derrotas desde que inició la sesión con el texto ESTADISTICAS y un boton para cerrarlo el aviso, con el texto SALIR.

### Agregado por el Cliente el 27/06/2018
Para el #TeamAhorcado @Oliver Korn @Dani @Sergio Bianchi @Jorge Schenone @Nestor Fleitas, les dejo acá los cambios que analizamos hoy que estaria bueno que implementen:

- Cambiar _turnos_ por _jugadas restantes_
- Si el jugador acierta una letra, no se descuentan jugadas
- Si hay una palabra con espacios, los espacios se completan automaticamente y solo se ponen guiones para las letras
- Si el jugador cree que conoce la palabra y le quedan juagas restantes, puede arriesgar y escribir la palabra completa, apretando el boton ARRIESGAR. Si no acierta la palabra, pierde

### Tecnologías

* HTML
* CSS
* JS

### Extras.

Dentro del área de texto solo se debe permitir el ingreso de Letras, no se permiten números, signos de puntuación o espacios en blanco.

## Recursos

Se entrega la siguiente estructura:
+ readme.md
+ index.html
+ js
   + listaPalabras.js
+ css
   + style.css
