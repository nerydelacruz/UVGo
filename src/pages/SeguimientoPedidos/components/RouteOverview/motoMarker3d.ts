import * as THREE from "three"
import { create, createEnvironment } from "./uvgoMoto"

export interface MotoMarker3d {
  /** Rumbo del repartidor en grados de brújula (0 = norte, 90 = este) */
  setHeading: (bearing: number) => void
  /** Orientación de la cámara del mapa, en grados */
  setView: (mapBearing: number, mapPitch: number) => void
  dispose: () => void
}

const SIZE_PX = 42
const TARGET = new THREE.Vector3(-0.15, 0.95, 0) // centro aproximado de moto + caja
const DISTANCE = 5.4
// Desde arriba la moto no se reconoce: la cámara siempre conserva algo de inclinación
const MIN_TILT = 38
const MAX_TILT = 68
const rad = THREE.MathUtils.degToRad

/**
 * Dibuja la moto 3D de UVGo dentro de `container` (el elemento del marcador de Mapbox).
 * Plano del suelo: +X = este, -Z = norte. Solo vuelve a renderizar cuando cambia algo.
 * Devuelve null si el navegador no tiene WebGL, para usar el ícono plano.
 */
export const createMotoMarker3d = (container: HTMLElement): MotoMarker3d | null => {
  let renderer: THREE.WebGLRenderer
  try {
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  } catch {
    return null
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setSize(SIZE_PX, SIZE_PX)
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.shadowMap.enabled = true
  container.appendChild(renderer.domElement)

  const scene = new THREE.Scene()
  const environment = createEnvironment(THREE, renderer)
  scene.environment = environment
  scene.add(new THREE.HemisphereLight(0xffffff, 0xaebdb3, 0.4))
  const sun = new THREE.DirectionalLight(0xffffff, 1.7)
  sun.position.set(4, 9, 5)
  sun.castShadow = true
  sun.shadow.mapSize.set(512, 512)
  Object.assign(sun.shadow.camera, { left: -2, right: 2, top: 2, bottom: -2 })
  scene.add(sun)
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(6, 6), new THREE.ShadowMaterial({ opacity: 0.22 }))
  floor.rotation.x = -Math.PI / 2
  floor.receiveShadow = true
  scene.add(floor)

  const moto = create(THREE)
  scene.add(moto.object)
  const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 50)

  let mapBearing = 0
  let mapPitch = 0
  let frame = 0
  const render = () => {
    if (frame) return
    frame = requestAnimationFrame(() => {
      frame = 0
      // La cámara mira hacia "arriba de la pantalla", igual que el mapa
      const tilt = rad(THREE.MathUtils.clamp(MIN_TILT + mapPitch * 0.5, MIN_TILT, MAX_TILT))
      const b = rad(mapBearing)
      const ground = DISTANCE * Math.sin(tilt)
      camera.position.set(TARGET.x - Math.sin(b) * ground, TARGET.y + DISTANCE * Math.cos(tilt), TARGET.z + Math.cos(b) * ground)
      camera.lookAt(TARGET)
      renderer.render(scene, camera)
    })
  }

  // El rótulo "UVGo" de la caja se repinta cuando carga la fuente
  document.fonts?.ready.then(render).catch(() => {})
  render()

  return {
    setHeading: (bearing) => {
      // Brújula → rumbo de la moto (0 = +X, contra reloj sobre Y)
      moto.setHeading(Math.PI / 2 - rad(bearing))
      render()
    },
    setView: (bearing, pitch) => {
      mapBearing = bearing
      mapPitch = pitch
      render()
    },
    dispose: () => {
      cancelAnimationFrame(frame)
      moto.dispose()
      floor.geometry.dispose()
      floor.material.dispose()
      environment.dispose()
      renderer.dispose()
      renderer.forceContextLoss()
      renderer.domElement.remove()
    },
  }
}
