import { Suspense, useMemo } from "react"
import { Canvas } from "@react-three/fiber"
import { Bounds, Center, OrbitControls, useGLTF } from "@react-three/drei"
import { folder, Leva, useControls } from "leva"
import modelUrl from "@/assets/caja-uvgo.glb?url"
import { Viewport } from "./KitModelViewer.styles"

const KitModel = ({ margin, position }: { margin: number; position: [number, number, number] }) => {
  const { scene } = useGLTF(modelUrl)
  // useGLTF cachea la escena entre visitas: se montan clones para no reutilizar el objeto original
  const referenceModel = useMemo(() => scene.clone(true), [scene])
  const visibleModel = useMemo(() => scene.clone(true), [scene])

  return (
    <>
      {/* referencia oculta y siempre en el origen: Bounds mide esta para fijar la cámara una sola vez, */}
      {/* así el encuadre nunca depende de la posición elegida (por defecto o en vivo) */}
      <Bounds fit clip margin={margin}>
        <Center>
          <primitive object={referenceModel} visible={false} />
        </Center>
      </Bounds>

      {/* copia visible: la que realmente se mueve con los controles de posición */}
      <Center position={position}>
        <primitive object={visibleModel} />
      </Center>
    </>
  )
}

useGLTF.preload(modelUrl)

const KitModelViewer = () => {
  const { ambientIntensity, keyIntensity, fillIntensity, margin, autoRotate, autoRotateSpeed, posX, posY, posZ } = useControls(
    "Modelo 3D",
    {
      ambientIntensity: { value: 0.7, min: 0, max: 2, step: 0.1, label: "Luz ambiental" },
      keyIntensity: { value: 1.4, min: 0, max: 4, step: 0.1, label: "Luz principal" },
      fillIntensity: { value: 0.4, min: 0, max: 2, step: 0.1, label: "Luz relleno" },
      margin: { value: 1.2, min: 0.5, max: 3, step: 0.1, label: "Margen encuadre" },
      autoRotate: { value: false, label: "Auto-rotar" },
      autoRotateSpeed: { value: 1.5, min: 0.5, max: 6, step: 0.5, label: "Vel. rotación" },
      Posición: folder({
        posX: { value: -0.1, min: -3, max: 3, step: 0.1, label: "Eje X" },
        posY: { value: 0.0, min: -3, max: 3, step: 0.1, label: "Eje Y" },
        posZ: { value: -0.1, min: -3, max: 3, step: 0.1, label: "Eje Z" },
      }),
    },
  )

  return (
    <Viewport>
      <Leva collapsed titleBar={{ title: "Vista 3D" }} />
      <Canvas camera={{ position: [3, 2, 4], fov: 40 }} dpr={[1, 2]} style={{ width: "100%", height: "100%" }}>
        <ambientLight intensity={ambientIntensity} />
        <directionalLight position={[4, 6, 3]} intensity={keyIntensity} />
        <directionalLight position={[-4, -2, -3]} intensity={fillIntensity} />
        <Suspense fallback={null}>
          <KitModel margin={margin} position={[posX, posY, posZ]} />
        </Suspense>
        <OrbitControls enablePan={false} autoRotate={autoRotate} autoRotateSpeed={autoRotateSpeed} makeDefault />
      </Canvas>
    </Viewport>
  )
}

export default KitModelViewer
