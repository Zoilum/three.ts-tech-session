import './style.css'
import * as THREE from "three"
const canvas = document.querySelector('canvas')
const scene = new THREE.Scene();

const sizes = {
  width: 700,
  height: 500
}

const camera = new THREE.PerspectiveCamera( 75, sizes.width / sizes.height, 0.1, 1000 );
camera.position.z = 3;

const renderer = new THREE.WebGLRenderer({canvas: canvas!});

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
cube.position.x = 1.5
cube.position.y = -1.5
cube.position.z = -1

// QUIZ
// cube.rotateX(180)
// cube.rotateY(180)
// ===
// cube.rotateY(180)
// cube.rotateX(180)
// ?

scene.add( cube );

renderer.setSize(sizes.width, sizes.height)
renderer.render( scene, camera );

export {}