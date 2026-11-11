import * as THREE from "three"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js"
import motoUrl from "@/assets/moto.glb?url"
import { create, createEnvironment } from "./uvgoMoto"

export interface MotoMarker3d {
  /** Rumbo del repartidor en grados de brújula (0 = norte, 90 = este) */
  setHeading: (bearing: number) => void
  /** Orientación de la cámara del mapa, en grados */
  setView: (mapBearing: number, mapPitch: number) => void
  /** Lado del marcador en píxeles (crece al acercar el mapa) */
  setSize: (px: number) => void
  dispose: () => void
}

export const SIZE_PX = 56
const FOV = 30
// Desde arriba la moto no se reconoce: la cámara siempre conserva algo de inclinación
const MIN_TILT = 38
const MAX_TILT = 68
const rad = THREE.MathUtils.degToRad

// El modelo (src/assets/moto.glb) se descarga una sola vez y cada marcador usa una copia.
// Las copias comparten geometrías y materiales, así que no se liberan al quitar un marcador.
let modelo: Promise<THREE.Group> | null = null
const cargarModelo = () => {
  modelo ??= new GLTFLoader()
    .loadAsync(motoUrl)
    .then((gltf) => gltf.scene)
    .catch((error: unknown) => {
      modelo = null // el siguiente marcador lo vuelve a intentar
      throw error
    })
  return modelo
}

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
  // Se dibuja al doble de la resolución de la pantalla y el navegador lo reduce: bordes más limpios al acercar
  renderer.setPixelRatio(Math.min(window.devicePixelRatio * 2, 4))
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
  sun.shadow.mapSize.set(1024, 1024)
  Object.assign(sun.shadow.camera, { left: -2, right: 2, top: 2, bottom: -2 })
  scene.add(sun)
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(6, 6), new THREE.ShadowMaterial({ opacity: 0.22 }))
  floor.rotation.x = -Math.PI / 2
  floor.receiveShadow = true
  scene.add(floor)

  // El rumbo gira este grupo; el modelo va dentro, centrado sobre el origen
  const pivot = new THREE.Group()
  scene.add(pivot)
  const camera = new THREE.PerspectiveCamera(FOV, 1, 0.1, 50)
  const target = new THREE.Vector3(0, 0.6, 0)
  let distance = 4

  let disposed = false
  let respaldo: ReturnType<typeof create> | null = null
  // Encaja la cámara al tamaño del objeto, sea el modelo GLB o la moto dibujada por código.
  // Se mide antes de meterlo en el grupo, para que el rumbo actual no deforme la caja.
  const encuadrar = (objeto: THREE.Object3D) => {
    const caja = new THREE.Box3().setFromObject(objeto)
    const centro = caja.getCenter(new THREE.Vector3())
    objeto.position.x -= centro.x
    objeto.position.z -= centro.z
    target.set(0, centro.y, 0)
    const radio = caja.getSize(new THREE.Vector3()).length() / 2
    distance = (radio / Math.sin(rad(FOV / 2))) * 1.02
    render()
  }

  cargarModelo()
    .then((base) => {
      if (disposed) return
      const copia = base.clone(true)
      copia.traverse((o) => {
        if ((o as THREE.Mesh).isMesh) o.castShadow = true
      })
      encuadrar(copia)
      pivot.add(copia)
    })
    .catch(() => {
      // Si el GLB no carga, se usa la moto dibujada por código
      if (disposed) return
      respaldo = create(THREE)
      encuadrar(respaldo.object)
      pivot.add(respaldo.object)
    })

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
      const ground = distance * Math.sin(tilt)
      camera.position.set(target.x - Math.sin(b) * ground, target.y + distance * Math.cos(tilt), target.z + Math.cos(b) * ground)
      camera.lookAt(target)
      renderer.render(scene, camera)
    })
  }

  // El rótulo "UVGo" de la caja se repinta cuando carga la fuente
  document.fonts?.ready.then(render).catch(() => {})
  render()

  return {
    setHeading: (bearing) => {
      // Brújula → rumbo de la moto (0 = +X, contra reloj sobre Y)
      pivot.rotation.y = Math.PI / 2 - rad(bearing)
      render()
    },
    setView: (bearing, pitch) => {
      mapBearing = bearing
      mapPitch = pitch
      render()
    },
    setSize: (px) => {
      // setSize también ajusta el tamaño CSS del canvas; el contenedor lo acompaña para el halo
      renderer.setSize(px, px)
      container.style.width = `${px}px`
      container.style.height = `${px}px`
      render()
    },
    dispose: () => {
      disposed = true
      cancelAnimationFrame(frame)
      respaldo?.dispose()
      floor.geometry.dispose()
      floor.material.dispose()
      environment.dispose()
      renderer.dispose()
      renderer.forceContextLoss()
      renderer.domElement.remove()
    },
  }
}
