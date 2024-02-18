import * as THREE from 'three';
import WebGL from 'three/addons/capabilities/WebGL.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';




const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.25, 20 );

// Establecer el color de fondo de la escena (por ejemplo, blanco)
scene.background = new THREE.Color(0xffffff); // Color blanco

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const ambientlight = new THREE.AmbientLight( 0x404040 ); // soft white light
scene.add( ambientlight );

// Crear una luz puntual
const light = new THREE.PointLight(0xffffff,1,100); // Color blanco
light.position.set(0, 0, 5); // Posición de la luz

// Agregar la luz a la escena
scene.add(light);

// Cargar una textura
/*const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load('static/texturas_prueba/concrete044B.png');
const geometry = new THREE.SphereGeometry( 1, 32, 16 ); 
const material = new THREE.MeshBasicMaterial( { color: 0x1a8cff,wireframe: true} { map:texture }); 
const sphere = new THREE.Mesh( geometry, material ); 
scene.add( sphere );*/

camera.position.z = 5;


// Instantiate a loader
const loader = new GLTFLoader();

// Load a glTF resource
loader.load(
	// resource URL
	'static/GLTF/prueba.gltf',
	// called when the resource is loaded
	function ( gltf ) {

		scene.add( gltf.scene );

		gltf.animations; // Array<THREE.AnimationClip>
		gltf.scene; // THREE.Group
		gltf.scenes; // Array<THREE.Group>
		gltf.cameras; // Array<THREE.Camera>
		gltf.asset; // Object

	},
	// called while loading is progressing
	function ( xhr ) {

		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

	},
	// called when loading has errors
	function ( error ) {
		console.log( 'An error happened' );

	}
);

function animate() {
	requestAnimationFrame( animate );

	//sphere.rotation.x += 0.01;
	//loader.rotation.y += 0.01;

	renderer.render( scene, camera );
}

if ( WebGL.isWebGLAvailable() ) {

	// Initiate function or other initializations here
	animate();

} else {

	const warning = WebGL.getWebGLErrorMessage();
	document.getElementById( 'container' ).appendChild( warning );

}