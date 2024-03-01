import * as THREE from 'three';
import WebGL from 'three/addons/capabilities/WebGL.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

// Establecer el color de fondo de la escena (por ejemplo, blanco)
scene.background = new THREE.Color(0xffffff); // Color blanco

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.SphereGeometry( 1, 32, 16 ); 
const material = new THREE.MeshBasicMaterial( { color: 0x1a8cff,wireframe: true}); 
const sphere = new THREE.Mesh( geometry, material ); 
//scene.add( sphere );

camera.position.z = 5;

/*// Crea un objeto loader de texturas
var textureLoader = new THREE.TextureLoader();

// Carga la textura desde un archivo de imagen
textureLoader.load(
    // URL de la imagen de la textura
    'static/texturas_prueba/vaca2.jpg',
    // Función de callback para cuando se carga la textura
    function ( texture ) {
        // Crea un material usando la textura cargada
        var material = new THREE.MeshBasicMaterial( { map: texture } );

        // Crea un objeto loader
        var loader = new OBJLoader();

        // Carga el archivo .obj
        loader.load(
            // URL del archivo .obj
            'static/obj/cabeza_v.obj',
            // Función de callback para cuando se carga el archivo
            function ( object ) {
                // Asigna el material al objeto
                object.traverse( function ( child ) {
                    if ( child instanceof THREE.Mesh ) {
                        child.material = material;
                    }
                } );
				objetoCargado = object;
                // Agrega el objeto a la escena
                scene.add(objetoCargado);
				animate();
            },
            // Función de progreso (opcional)
            function ( xhr ) {
                console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
            },
            // Función de manejo de errores (opcional)
            function ( error ) {
                console.log( 'An error happened' );
            }
        );
    },
    // Función de progreso (opcional)
    function ( xhr ) {
        console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
    },
    // Función de manejo de errores (opcional)
    function ( error ) {
        console.log( 'An error happened' );
    }
); */

function cargarObjTextura(URL_Textura,URL_Object,posicion,rotacion,escala){
	// Crea un objeto loader de texturas
	var textureLoader = new THREE.TextureLoader();

	// Carga la textura desde un archivo de imagen
	textureLoader.load(
		// URL de la imagen de la textura
		URL_Textura,
		// Función de callback para cuando se carga la textura
		function ( texture ) {
			// Crea un material usando la textura cargada
			var material = new THREE.MeshBasicMaterial( { map: texture } );

			// Crea un objeto loader
			var loader = new OBJLoader();

			// Carga el archivo .obj
			loader.load(
				// URL del archivo .obj
				URL_Object,
				// Función de callback para cuando se carga el archivo
				function ( object ) {
					// Asigna el material al objeto
					object.traverse( function ( child ) {
						if ( child instanceof THREE.Mesh ) {
							child.material = material;
						}
					} );

					// Posicionar el objeto
					object.position.copy(posicion);

					// Aplicar rotación al objeto
					object.rotation.copy(rotacion);

					//Aplica la escala al objeto
					object.scale.copy(escala);

					// Agrega el objeto a la escena
					scene.add(object);
				},
				// Función de progreso (opcional)
				function ( xhr ) {
					console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
				},
				// Función de manejo de errores (opcional)
				function ( error ) {
					console.log( 'An error happened' );
				}
			);
		},
		// Función de progreso (opcional)
		function ( xhr ) {
			console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
		},
		// Función de manejo de errores (opcional)
		function ( error ) {
			console.log( 'An error happened' );
		}
	);
}

cargarObjTextura('static/texturas_prueba/vaca2.jpg','static/obj/cabeza_v.obj',new THREE.Vector3(0, 0, 0),new THREE.Euler(0, 0, 0),new THREE.Vector3(1, 1, 1));
cargarObjTextura('static/texturas_prueba/vaca2.jpg','static/obj/cuerpo_v.obj',new THREE.Vector3(-1, -1, 0),new THREE.Euler(0, Math.PI, 0),new THREE.Vector3(1.2, 1, 1));
cargarObjTextura('static/texturas_prueba/vaca2.jpg','static/obj/pata_v_1.obj',new THREE.Vector3(0, -2, 0),new THREE.Euler(0, 0, 0),new THREE.Vector3(0.5, 0.5, 0.5));


// Definir variables para el movimiento de la cámara
var moveForward = false;
var moveBackward = false;
var moveLeft = false;
var moveRight = false;

// Evento de teclado para detectar cuando se presiona una tecla
document.addEventListener('keydown', function(event) {
    // Detectar qué tecla se presionó y establecer las variables de movimiento correspondientes
    switch(event.keyCode) {
        case 87: // W
            moveForward = true;
            break;
        case 65: // A
            moveLeft = true;
            break;
        case 83: // S
            moveBackward = true;
            break;
        case 68: // D
            moveRight = true;
            break;
    }
});

// Evento de teclado para detectar cuando se suelta una tecla
document.addEventListener('keyup', function(event) {
    // Detectar qué tecla se soltó y restablecer las variables de movimiento correspondientes
    switch(event.keyCode) {
        case 87: // W
            moveForward = false;
            break;
        case 65: // A
            moveLeft = false;
            break;
        case 83: // S
            moveBackward = false;
            break;
        case 68: // D
            moveRight = false;
            break;
    }
});

// Función para actualizar la posición de la cámara en cada fotograma
function updateCameraPosition() {
    // Comprobar las variables de movimiento y ajustar la posición de la cámara en consecuencia
    if (moveForward) camera.position.z -= 0.1;
    if (moveBackward) camera.position.z += 0.1;
    if (moveLeft) camera.position.x -= 0.1;
    if (moveRight) camera.position.x += 0.1;
}

// Definir variables para el control de rotación de la cámara con el mouse
var isDragging = false;
var previousMousePosition = {
    x: 0,
    y: 0
};

/*// Evento de mouse para detectar cuando se presiona el botón del mouse
document.addEventListener('mousedown', function(event) {
    isDragging = true;
    previousMousePosition = {
        x: event.clientX,
        y: event.clientY
    };
});

// Evento de mouse para detectar cuando se mueve el mouse
document.addEventListener('mousemove', function(event) {
    if (isDragging) {
        var deltaMove = {
            x: event.clientX - previousMousePosition.x,
            y: event.clientY - previousMousePosition.y
        };

        // Rotar la cámara en función del movimiento del mouse
        camera.rotation.y += deltaMove.x * 0.01;
        camera.rotation.x += deltaMove.y * 0.01;

        previousMousePosition = {
            x: event.clientX,
            y: event.clientY
        };
    }
});

// Evento de mouse para detectar cuando se suelta el botón del mouse
document.addEventListener('mouseup', function() {
    isDragging = false;
}); 
*/

function animate() {
	requestAnimationFrame( animate );
	//sphere.rotation.y += 0.01;
	updateCameraPosition();
	renderer.render( scene, camera );
}

if ( WebGL.isWebGLAvailable() ) {

	// Initiate function or other initializations here
	animate();

} else {

	const warning = WebGL.getWebGLErrorMessage();
	document.getElementById( 'container' ).appendChild( warning );

}