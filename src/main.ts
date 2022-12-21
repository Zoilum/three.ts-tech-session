import './style.css'
import * as THREE from "three"
const canvas = document.querySelector('canvas')
const scene = new THREE.Scene();
import * as lil from "lil-gui"
import gsap from "gsap"


import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}



const gui = new lil.GUI()

const aspectRatio = sizes.width / sizes.height
const camera = new THREE.PerspectiveCamera( 75, aspectRatio, 0.1, 1000 );
// const camera = new THREE.OrthographicCamera(- 1 * aspectRatio, 1 * aspectRatio, 1, - 1, 0.1, 100)
camera.position.z = 3;

const renderer = new THREE.WebGLRenderer({canvas: canvas!});

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );

scene.add( cube );

const controls = new OrbitControls(camera, canvas!)
controls.enableDamping = true;

renderer.setSize(sizes.width, sizes.height)
renderer.render( scene, camera );

// Debug

const parameters = {
  spin: () =>
  {
      gsap.to(cube.rotation, {duration: 5, y: cube.rotation.y + Math.PI * 10 })
  }
}
gui.add(cube.position, 'x').min(-3).max(3).step(0.01)
gui.add(cube.position, 'y').min(-3).max(3).step(0.01).name("pippocazzo")
gui.add(cube.position, 'z').min(-3).max(3).step(0.01)
// gui.add(cube.position, 'y', - 3, 3, 0.01)
// gui.add(cube.position, 'z', - 3, 3, 0.01)

gui.add(cube, "visible")

gui.add(material, "wireframe")

gui.addColor(material, "color")

gui.add(parameters, "spin")


const animate = () => {
  requestAnimationFrame( animate );

  camera.lookAt(cube.position)
  controls.update()
  renderer.render( scene, camera );
};


window.addEventListener('resize', () => {
  // Update size
 sizes.width = window.innerWidth
 sizes.height = window.innerHeight

 // Update camera
 camera.aspect = sizes.width / sizes.height
 camera.updateProjectionMatrix()

 // Update renderer
 renderer.setSize(sizes.width, sizes.height)
})

animate();

export {}