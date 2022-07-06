//Importing all the nexxessary libraries
import './style.css'

import * as THREE from 'three';

import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'


import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { GLBufferAttribute } from 'three';


const loader = new GLTFLoader();
var reactor;

loader.load( 'arc_reactor_fifth_try.gltf', function ( gltf, materials ) {
  //var reactor;


  gltf.scene.rotation.z = 30;
  gltf.scene.rotation.y = 35;
  gltf.scene.position.z = 0;
  gltf.scene.position.x =15;
  gltf.scene.position.y= 0;
  gltf.scene.scale.set(10,10,10);
  reactor = gltf.scene;
  scene.add(reactor)
  animateReactor(reactor);




}, undefined, function ( error ) {

	console.error( error );

} );












//Creating the scene, camera and renderer variables
const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(75, window.innerWidth/ window.innerHeight, .1, 1000) ;

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#background"),
});


renderer.setPixelRatio(window.devicePixelRatio) ;
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);


renderer.render(scene, camera);





//Establishing pointlight within the torus
const pointLight = new THREE.PointLight(0x87ceeb, 1.8);
//pointLight.position.set(5,5,5);


//Establishing point light within the arc reactor
scene.add(pointLight);



const gridHelper = new THREE.GridHelper(200,50);
//scene.add(gridHelper)



//Established orbit controls
const controls = new OrbitControls(camera, renderer.domElement);



//Creates each star and assigns them to a random place along the x,y,z axises
function createStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial( {color:0xffffff } );
  const star = new THREE.Mesh ( geometry, material);

  const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
  star.position.set(x,y,z);
  scene.add(star)
}


Array(225).fill().forEach(createStar)



//Sets the background image
const spaceImage = new THREE.TextureLoader().load('background.jpg');
scene.background = spaceImage;



//Creating Mars
const marsTexture = new THREE.TextureLoader().load('mars.jpg');

const mars = new THREE.Mesh(
  new THREE.SphereGeometry(3,32,32),
  new THREE.MeshStandardMaterial( {
    map: marsTexture
  } )
)

scene.add(mars)


mars.position.z = 15;
mars.position.x = -18;


function moveCamera () {
  const top = document.body.getBoundingClientRect().top;
  mars.rotation.x += 0.05;
  mars.rotation.y += 0.075;
  mars.rotation.z += 0.05;



  camera.position.z = top * -0.01;
  camera.position.x = top * -0.0002;
  camera.position.y = top * -0.0002;
}

document.body.onscroll = moveCamera



//Animates the torus so that it rotates
function animate () {
  requestAnimationFrame( animate );
  reactor.rotation.x += 0.005;


  controls.update();
  renderer.render(scene, camera);
}

animate();




renderer.render(scene,camera);
