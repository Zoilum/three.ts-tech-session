import './style.css'
import * as THREE from "three"
const canvas = document.querySelector('canvas')
const scene = new THREE.Scene();

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

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

const animate = () => {
  requestAnimationFrame( animate );

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

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

window.addEventListener('dblclick', () => {
  const fullscreenElement = document.fullscreenElement
  if (canvas) {
    if (!fullscreenElement) {
        if (canvas.requestFullscreen) {
            canvas.requestFullscreen()
        }
    } else if (document.exitFullscreen) {
      document.exitFullscreen()
    }
  }
})

animate();

export {}