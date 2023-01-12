var beat = new Audio('Audio/intro.mp3');
beat.play();

let iconos = [] //Variable para guardar los diferentes iconos
let selecciones = [] //variable para guardar los numeros de tarjetas ya seleccionadas 
var color = "rgb(138, 241, 127)" //color para cuando se gano
generarTablero() //funcion para primera vez

function cargarIconos() { //cargar los iconos de las tarjetas
    iconos = [
        '<img src="./img/parejas-001.png" alt="pareja001">',
        '<img src="./img/parejas-001.png" alt="pareja001">',
        '<img src="./img/parejas-002.png" alt="pareja002">',
        '<img src="./img/parejas-002.png" alt="pareja002">',
        '<img src="./img/parejas-003.png" alt="pareja003">',
        '<img src="./img/parejas-003.png" alt="pareja003">',
        '<img src="./img/parejas-004.png" alt="pareja004">',
        '<img src="./img/parejas-004.png" alt="pareja004">',
        '<img src="./img/parejas-005.png" alt="pareja005">',
        '<img src="./img/parejas-005.png" alt="pareja005">',
        '<img src="./img/parejas-006.png" alt="pareja006">',
        '<img src="./img/parejas-006.png" alt="pareja006">',
        '<img src="./img/parejas-007.png" alt="pareja007">',
        '<img src="./img/parejas-007.png" alt="pareja007">',
        '<img src="./img/parejas-008.png" alt="pareja008">',
        '<img src="./img/parejas-008.png" alt="pareja008">',
    ]
    
    shuffle(iconos);
}

function shuffle(iconos) {
    return iconos.sort(() => Math.random() - 0.5);
}

function  generarTablero() {
    cargarIconos() //cargamos los iconos en el arreglo
    selecciones = []
    let row_n
    for(let j = 0; j < 4; j++){
    row_n = document.getElementById(`row_n${j}`) //obtener el ID
    let tarjetas = [] //variable para gurdar las tarjetas
    for (let i = 0; i < 4; i++) {
        tarjetas.push(`
                <div class="area-tarjeta" onclick="seleccionarTarjeta(${(j*4)+i})">
                    <div class="tarjeta" id="tarjeta${(j*4)+i}">
                        <div class="cara trasera" id="trasera${(j*4)+i}">
                            ${iconos[0]}
                        </div>
                        <div class="cara superior">
                            <img src="./img/tarjeta_cubierta.png" alt="cubierta">
                        </div>
                    </div>
                </div>        
                `) 
        iconos.splice(0, 1) //eliminar de el arreglo
    }
    row_n.innerHTML = tarjetas.join(" ") //agregar el codigo. (innerHTML reemplaza en el codigo HTML) (.join convierte el arreglo en una cadena de texto separada con un espacio)
    tarjetas = [];    
}
    
}

function seleccionarTarjeta(i) {
    let tarjeta = document.getElementById("tarjeta" + i) //obtiene el contenido de la etiqueta con el ID
    if (tarjeta.style.transform != "rotateY(180deg)") { //sino esta volteada
        tarjeta.style.transform = "rotateY(180deg)" //la voltea
        selecciones.push(i) //pone el numero de la tarjeta en el arreglo selecciones
    }
    if (selecciones.length == 2) { //cuando esten dos seleccionadas
        deseleccionar(selecciones) //las deseleccionamos
        selecciones = [] //reiniciamos las tarjetas seleccionadas
    }
}

function deseleccionar(selecciones) {
    setTimeout(() => { //setTimeout es para darle tiempo
        let trasera1 = document.getElementById("trasera" + selecciones[0])
        let trasera2 = document.getElementById("trasera" + selecciones[1])
        if (trasera1.innerHTML != trasera2.innerHTML) { //si el html de las 2 tarjetas es diferente no coinciden las tarjetas
            let tarjeta1 = document.getElementById("tarjeta" + selecciones[0])
            let tarjeta2 = document.getElementById("tarjeta" + selecciones[1])
            tarjeta1.style.transform = "rotateY(0deg)" //la volteamos de nuevo
            tarjeta2.style.transform = "rotateY(0deg)" //la volteamos de nuevo
        } else { //si coinciden
            trasera1.style.background = color; //cambiamos el color
            trasera2.style.background = color; //cambiamos el color
        }
    }, 1000); //1000 milisegundos = 1 segundo
}