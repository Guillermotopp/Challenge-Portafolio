var palabras = ["obturador","lente","fotograma","exposición","apertura","diafragma","balance","zoom","instantánea","retrato","paisaje","enfoque","resolución","contraste","disparador","volumen","micrófono","ecualizador","grabación","amplificador","auriculares","mezclador","altavoz","estéreo","megáfono","difusor","silenciador","sintonizador","grabadora","filtro","sensor","reproducción","estabilizador","blanco","negro","píxel","pixeles","ráfaga","fotógrafo","cámara","flash","iluminación","reflector","fotografía","instantáneo","reflex","trípode","visor","visor",
    "objetivo",
    "diapositiva",
    "retrato",
    "pantalla",
    "zoom",
    "parlante",
    "grabación",
    "micrófono",
    "vibración",
    "ruido",
    "resonancia",
    "estéreo",
    "altavoz",
    "subwoofer",
    "ecualizador",
    "grabador",
    "amplificador",
    "mezcladora",
    "auriculares",
    "transductor",
    "conector",
    "decibel",
    "frecuencia",
    "megáfono",
    "difusor",
    "silenciador",
    "sintonizador",
    "grabadora",
    "filtro",
    "sensor",
    "reproducción",
    "estabilizador",
    "blanco",
    "negro",
    "píxel",
    "pantalla",
    "bitmap",
    "ráfaga",
    "fotógrafo",
    "cámara",
    "flash",
    "iluminación",
    "reflector",
    "fotografía",
    "instantáneo",
    "reflex",
    "trípode"
  ];
  
  function elegirPalabraAlAzar() {
    // Obtener un índice aleatorio dentro del rango de longitud del vector
    var indiceAleatorio = Math.floor(Math.random() * palabras.length);
    
    // Obtener la palabra en el índice aleatorio
    var palabraElegida = palabras[indiceAleatorio];
    
    // Devolver la palabra elegida
    return palabraElegida;
}
function separarPalabraEnTextarea(palabra) {
    // Obtener la longitud de la palabra
    var longitud = palabra.length;
    
    // Iterar sobre cada letra de la palabra
    for (var i = 0; i < longitud; i++) {
        // Obtener el id del textarea correspondiente
        var textareaId = "dibujo" + (i + 1);
        
        // Obtener el elemento textarea
        var textarea = document.getElementById(textareaId);
        
        // Asignar la letra correspondiente al textarea
        textarea.value = palabra[i];
    }
}

// Ejemplo de uso:
var contadorIntentos = 0; // Variable para contar los intentos
var palabraSeleccionada = elegirPalabraAlAzar();
var palabraNormalizada = normalizarTexto(palabraSeleccionada);
separarPalabraEnTextarea(palabraNormalizada);

function probarSuerte() {
    // Obtener el texto ingresado por el usuario y normalizarlo
    var textoIngresado = normalizarTexto(prompt("Ingresa tu intento:"));
    
    // Normalizar también la palabra seleccionada
    var palabraNormalizada = normalizarTexto(palabraSeleccionada);
    
    // Verificar si el texto ingresado coincide con la palabra seleccionada
    if (textoIngresado === palabraNormalizada) {
        alert("¡Ganaste!");
    } else {
        alert("¡Inténtalo de nuevo!");
    }
}
function normalizarTexto(texto) {
    return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}
function verificarAciertos(ahorcadoId) {
    var ahorcadoTextarea = document.getElementById(ahorcadoId);
    var ahorcadoChar = ahorcadoTextarea.value.trim();

    // Iterar sobre todos los textareas de dibujo
    var dibujoTextareas = document.querySelectorAll('[id^="dibujo"]');
    dibujoTextareas.forEach(function(textarea) {
        // Verificar si el valor del ahorcado es igual al valor del dibujo
        if (ahorcadoChar === textarea.value.trim()) {
            // Si hay coincidencia, cambiar el color de fondo del textarea de dibujo a verde
            textarea.style.backgroundColor = "lightgreen";
        } 
    });
}

function cambiarImagenes() {
      // Incrementar el contador de intentos
      contadorIntentos++;

      // Obtener la imagen del ahorcado
      const imagenAhorcado = document.querySelector('.imagenAhorcado');
  
      // Obtener el nombre de la siguiente imagen en función del contador de intentos
      let nombreImagen;
      switch (contadorIntentos) {
          case 1:
              nombreImagen = '05-Ahorcado-Alura.png';
              break;
          case 2:
              nombreImagen = '06-Ahorcado-Alura.png';
              break;
          case 3:
              nombreImagen = '07-Ahorcado-Alura.png';
              break;
          case 4:
              nombreImagen = '08-Ahorcado-Alura.png';
              break;
          case 5:
              nombreImagen = '09-Ahorcado-Alura.png';
              break;
          case 6:
              nombreImagen = '10-Ahorcado-Alura.png';
              mostrarMensajePerdiste(); // Mostrar el mensaje de "Perdiste"
              break;
          default:
              // Si el contador supera 6, se mantiene en la última imagen
              nombreImagen = '10-Ahorcado-Alura.png';

              break;
      }

        // Construir la ruta completa de la imagen
    const rutaImagen = `./img/${nombreImagen}`;

    // Actualizar la fuente de la imagen del ahorcado   
    imagenAhorcado.src = rutaImagen;

    // Verificar si se alcanzó el máximo de intentos
    if (contadorIntentos >= 6) {
        // Mostrar el mensaje "Ahorcado"
        mostrarMensajePerdiste();
    }

}

// Asignar el evento input a todos los textareas de ahorcado
var ahorcadoTextareas = document.querySelectorAll('[id^="ahorcado"]');
ahorcadoTextareas.forEach(function(textarea) {
    textarea.addEventListener("input", function() {
        verificarAciertos(textarea.id);
        cambiarImagenes();

    });
});
function mostrarMensajePerdiste() {
    // Mostrar el mensaje de "Perdiste"
    const mensajePerdiste = document.getElementById('mensajePerdiste');
    mensajePerdiste.style.display = 'block';
}
// Función para reiniciar
function reiniciar() {
    // Ocultar el mensaje de pérdida si está visible
    var mensajePerdiste = document.getElementById('mensajePerdiste');
        mensajePerdiste.style.display = 'none';

    // Limpiar los textareas de los ahorcados
    var textAreas = document.querySelectorAll('.ahorcado textarea');
    textAreas.forEach(function(textarea) {
        textarea.value = ' ';
    });

    // Restaurar la imagen original
    var imagen2 = document.querySelector('.imagenAhorcado');
    imagen2.src = './img/04-Ahorcado-Alura.png';
    console.log(imagen2);

    // Volver a escoger la palabra aleatoria y cargar las casillas de texto de la imagen
    contadorIntentos = 0; // Reiniciar el contador de intentos
    palabraSeleccionada = elegirPalabraAlAzar(); // Escoger una nueva palabra aleatoria
    palabraNormalizada = normalizarTexto(palabraSeleccionada); // Normalizar la palabra
    separarPalabraEnTextarea(palabraNormalizada); // Separar la palabra en los textareas de ahorcado
}



/*alert("Hola Mundo");
const campo_texto = document.querySelector("#texto-encriptado");
const campo_mensaje = document.querySelector("#campo-mensaje");
console.log(campo_mensaje,campo_texto)
const matriz_code = [
    ["e","enter"], // indice 0
    ["i", "imes"], // indice 1
    ["a", "ai"],   // indice 2
    ["o", "ober"], // indice 3
    ["u", "ufat"], // indice 4
];

function btnEncriptar(){
    const texto = encriptar(campo_texto.value);
    console.log(texto);
}
function encriptar(fraseEncriptada){
    for(let i=0; i<matriz_code.length; i++){
        if (fraseEncriptada.includes(matriz_code[i][0])){
            fraseEncriptada=fraseEncriptada.replaceAll(
                matriz_code[i][0],
                matriz_code[i][1]
            );
        }
        console.log(matriz_code[i][0]);

    }
    return fraseEncriptada;
}

console.log([1,2,3].length);*/

/*La letra "e" es convertida para "enter"
La letra "i" es convertida para "imes"
La letra "a" es convertida para "ai"
La letra "o" es convertida para "ober"
La letra "u" es convertida para "ufat"*/

const textArea=document.querySelector("#encriptador"); /*almaceno lo que el usuairo ingresa en la clase HTML*/
const mensaje=document.querySelector("#comentario"); /*almaeceno el vakor en la caja de texto encriptado*/

function btnEncriptar(){
    const textoEncriptado = encriptar(textArea.value);
    mensaje.value = textoEncriptado;
    textArea.value="";
    mensaje.style.backgroundImage = "none";
}
function btnDesencriptar(){
    const textoEncriptado = desencriptar(textArea.value);
    mensaje.value = textoEncriptado;
    textArea.value="";
    mensaje.style.backgroundImage = "none";
}

function encriptar(cadenaEncriptada){
    let matrizCodigo=[["e","enter"],["i","imes"],["a","ai"],["o","ober"],["u","ufat"]];
    cadenaEncriptada = cadenaEncriptada.toLowerCase()

    for(let i = 0; i < matrizCodigo.length; i++){
        if(cadenaEncriptada.includes(matrizCodigo[i][0])){
            cadenaEncriptada=cadenaEncriptada.replaceAll(matrizCodigo[i][0], matrizCodigo[i][1]);
        } 
    }
    return cadenaEncriptada;
}
function desencriptar(cadenaDesencriptada){
    let matrizCodigo=[["e","enter"],["i","imes"],["a","ai"],["o","ober"],["u","ufat"]];
    cadenaDesencriptada = cadenaDesencriptada.toLowerCase()

    for(let i = 0; i < matrizCodigo.length; i++){
        if(cadenaDesencriptada.includes(matrizCodigo[i][1])){
            cadenaDesencriptada=cadenaDesencriptada.replaceAll(matrizCodigo[i][1], matrizCodigo[i][0]);
        } 
    }
    return cadenaDesencriptada;
}

function copiarTexto() {
    // Selecciona el textarea
    var comentario = document.getElementById("comentario");
    
    // Selecciona el texto dentro del textarea
    comentario.select();
    
    // Copia el texto seleccionado
    document.execCommand("copy");
    
    // Deselecciona el texto después de copiarlo
    comentario.setSelectionRange(0, 0);
    
    // Muestra una alerta o realiza alguna otra acción para notificar al usuario
    alert("Texto copiado!");
  }


