import './style.css'
import * as THREE from "three"
const canvas = document.querySelector('canvas')
const scene = new THREE.Scene();
// import gsap from 'gsap'

const sizes = {
  width: 700,
  height: 500
}

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.z = 3;

const renderer = new THREE.WebGLRenderer({canvas: canvas!});

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );

scene.add( cube );

renderer.setSize(sizes.width, sizes.height)
renderer.render( scene, camera );


// gsap.to(cube.position, { duration: 1, delay: 1, x: 2 })

const animate = () => {
  requestAnimationFrame( animate );

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  camera.lookAt(cube.position)

  renderer.render( scene, camera );
};

animate();

export {}