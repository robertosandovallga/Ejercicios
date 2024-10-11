'use strict'

//1.-window.addEventListener - Escucha cuando ha terminado de cargar todos los recursos de la pagina

//2.-document.querySelector('.pantalla'); Carga el primer elemento dentro de la clase ".pantalla"

//3.-const keypadbuttons = document.getElementsByClassName('btn-button'); Seleccionara todos los elementos del documento que tiene la clase btn-button

//4.-const keypadbuttonsarray = Array.from(keypadbuttons); Dado que getElementsByClassName devuelve un HTMLCollection, que no tiene métodos como .forEach(),aquí usas Array.from() para convertir esa colección en un array nativo de JavaScript.
//Propósito: Convertir la colección en un array para poder iterar sobre los botones y usar métodos como .forEach().

//5.-keypadbuttonsarray.forEach(button => {...}) Aquí usas el método forEach() del array para recorrer cada botón. Dentro del ciclo, button es una referencia a cada botón en la lista.
//Propósito: Iterar sobre cada botón del array y agregar un evento de clic a cada uno.

//6.-button.addEventListener('click', () => {...}) Por cada botón, agregas un event listener que escucha el evento click. Cuando el usuario hace clic en ese botón, la función dentro de este listener se ejecutará.
//Propósito: Ejecutar algún código cada vez que el usuario haga clic en uno de los botones.

//7.-console.log(button.innerHTML) Dentro de la función del evento de clic, usas console.log() para imprimir en la consola el contenido HTML del botón en el que el usuario hizo clic.
//Propósito: Mostrar en la consola el texto o contenido HTML del botón cuando se hace clic en él.

window.addEventListener('load', () => {
    // El código dentro de aquí se ejecuta cuando la página ha terminado de cargar
    const display = document.querySelector('.pantalla-display');
    const keypadbuttons = document.getElementsByClassName('btn-button');

    const keypadbuttonsarray = Array.from(keypadbuttons);

    keypadbuttonsarray.forEach(button => {
        button.addEventListener('click', () => {
            calculadora(button, display)
        })
    });
});

function calculadora(button, display) {
    switch (button.innerHTML) {
        case 'C':
            borrar(display);
            break;

        case '=':
            calcular(display);
            break;

        default:
            actualizar(display, button);
            break;
    }
}

function calcular(display) {

    display.innerHTML = eval(display.innerHTML) //Toma el string y lo va a resolverlo y guardarlo en el innerHTML de la pantalla
}


function actualizar(display, button) {

    const operadores = ['+', '-', '*', '/']; //  operadores

     
    // Si el botón es un punto
    if (button.innerHTML === '.') {
        // Verifica si ya hay un punto en el contenido del display
        if (display.innerHTML.includes('.')) {
            return; // Si ya hay un punto, no hace nada
        }
    }

     // Limitar la longitud del display a, por ejemplo, 10 caracteres
     if (display.innerHTML.length >= 22) {
        return; // No permite más caracteres
    }

    // Si el botón es un operador
    if (operadores.includes(button.innerHTML)) {
        // Verifica si el último carácter en el display es un operador
        const lastChar = display.innerHTML[display.innerHTML.length - 1];
        if (operadores.includes(lastChar)) {
            // Si el último carácter es un operador, reemplaza con el nuevo operador
            display.innerHTML = display.innerHTML.slice(0, -1) + button.innerHTML;
            return; // Sale de la función
        }
    }

    if (display.innerHTML == 0) {
        display.innerHTML = '';
    }
    display.innerHTML += button.innerHTML;
}

function borrar(display) {
    display.innerHTML = 0
}