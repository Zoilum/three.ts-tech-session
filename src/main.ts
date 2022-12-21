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

const geometry = new THREE.BufferGeometry()
const count = 50
// const geometry = new THREE.BoxGeometry( 1, 1, 1, 4, 4, 4 );
const positionsArray = new Float32Array(count * 3 * 3).map(_ => (Math.random() - .5) * 4)
const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3)
geometry.setAttribute('position', positionsAttribute)

const material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true })

const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

const controls = new OrbitControls(camera, canvas!)
controls.enableDamping = true;

renderer.setSize(sizes.width, sizes.height)
renderer.render( scene, camera );

const animate = () => {
  requestAnimationFrame( animate );

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