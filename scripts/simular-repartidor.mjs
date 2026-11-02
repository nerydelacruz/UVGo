// Simula a un repartidor: inicia sesión como administrador y publica su posición por WebSocket
// (STOMP, /app/pedidos/{id}/ubicacion) recorriendo la ruta bodega → destino del pedido.
//
//   CORREO=admin.demo@uvg.edu.gt CONTRASENA=... node scripts/simular-repartidor.mjs <pedidoId>
//
// Variables opcionales:
//   API_URL      base de la API              (http://localhost:8070/uvgo/api)
//   DESTINO      "lng,lat" del destino       (centro del campus)
//   VELOCIDAD    km/h                        (25)
//   INTERVALO_MS entre posiciones            (1000)
//   REPETIR=1    vuelve a salir al llegar
//   MAPBOX_TOKEN para seguir las calles; si falta se toma VITE_MAPBOX_TOKEN de .env.local, y sin token va en línea recta
import { readFileSync } from "node:fs"
import { Client } from "@stomp/stompjs"

const BODEGA = [-90.488, 14.6075]
const CENTRO_CAMPUS = [-90.4893, 14.604]

const pedidoId = process.argv[2]
const { CORREO, CONTRASENA } = process.env
if (!pedidoId || !CORREO || !CONTRASENA) {
  console.error("Uso: CORREO=... CONTRASENA=... node scripts/simular-repartidor.mjs <pedidoId>")
  process.exit(1)
}
const apiUrl = (process.env.API_URL ?? "http://localhost:8070/uvgo/api").replace(/\/$/, "")
const destino = process.env.DESTINO ? process.env.DESTINO.split(",").map(Number) : CENTRO_CAMPUS
const velocidadMs = (Number(process.env.VELOCIDAD ?? 25) * 1000) / 3600
const intervaloMs = Number(process.env.INTERVALO_MS ?? 1000)

const tokenMapbox = () => {
  if (process.env.MAPBOX_TOKEN) return process.env.MAPBOX_TOKEN
  try {
    return readFileSync(new URL("../.env.local", import.meta.url), "utf8").match(/^VITE_MAPBOX_TOKEN=(.+)$/m)?.[1].trim()
  } catch {
    return undefined
  }
}

const rad = (g) => (g * Math.PI) / 180
const metros = ([lng1, lat1], [lng2, lat2]) => {
  const a = Math.sin(rad(lat2 - lat1) / 2) ** 2 + Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(rad(lng2 - lng1) / 2) ** 2
  return 6371000 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}
const rumbo = ([lng1, lat1], [lng2, lat2]) =>
  (((Math.atan2(Math.sin(rad(lng2 - lng1)) * Math.cos(rad(lat2)), Math.cos(rad(lat1)) * Math.sin(rad(lat2)) - Math.sin(rad(lat1)) * Math.cos(rad(lat2)) * Math.cos(rad(lng2 - lng1))) * 180) / Math.PI) + 360) % 360

const obtenerRuta = async () => {
  const token = tokenMapbox()
  if (token) {
    try {
      const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${BODEGA.join(",")};${destino.join(",")}?geometries=geojson&overview=full&access_token=${token}`
      const coordenadas = (await (await fetch(url)).json()).routes?.[0]?.geometry?.coordinates
      if (coordenadas?.length > 1) return coordenadas
    } catch {
      // sin conexión: línea recta
    }
  }
  console.warn("Sin ruta de Mapbox: el repartidor va en línea recta.")
  return [BODEGA, destino]
}

// Punto y rumbo a `distancia` metros del inicio de la ruta
const enRuta = (ruta, tramos, distancia) => {
  let restante = distancia
  for (let i = 0; i < tramos.length; i++) {
    if (restante <= tramos[i] || i === tramos.length - 1) {
      const t = tramos[i] ? Math.min(restante / tramos[i], 1) : 0
      const [a, b] = [ruta[i], ruta[i + 1]]
      return { punto: [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t], rumbo: rumbo(a, b) }
    }
    restante -= tramos[i]
  }
}

const login = async () => {
  const respuesta = await fetch(`${apiUrl}/api/v1/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ correo: CORREO, contrasena: CONTRASENA }),
  })
  if (!respuesta.ok) throw new Error(`Login rechazado (${respuesta.status})`)
  return (await respuesta.json()).accessToken
}

const token = await login()
const ruta = await obtenerRuta()
const tramos = ruta.slice(1).map((punto, i) => metros(ruta[i], punto))
const total = tramos.reduce((a, b) => a + b, 0)
console.log(`Ruta de ${(total / 1000).toFixed(2)} km a ${process.env.VELOCIDAD ?? 25} km/h`)

const url = new URL(`${apiUrl}/ws`)
url.protocol = url.protocol === "https:" ? "wss:" : "ws:"

const client = new Client({
  brokerURL: url.toString(),
  connectHeaders: { Authorization: `Bearer ${token}` },
  reconnectDelay: 3000,
  onStompError: (frame) => {
    console.error(`El servidor rechazó la conexión: ${frame.headers.message}`)
    process.exit(1)
  },
})

let temporizador
client.onConnect = () => {
  console.log(`Conectado. Publicando en /app/pedidos/${pedidoId}/ubicacion (Ctrl+C para parar)`)
  let recorrido = 0
  clearInterval(temporizador)
  temporizador = setInterval(() => {
    const { punto, rumbo: grados } = enRuta(ruta, tramos, Math.min(recorrido, total))
    client.publish({
      destination: `/app/pedidos/${pedidoId}/ubicacion`,
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ latitud: punto[1], longitud: punto[0], rumbo: Math.round(grados * 10) / 10 }),
    })
    console.log(`${(Math.min(recorrido / total, 1) * 100).toFixed(0)}%  ${punto[1].toFixed(5)}, ${punto[0].toFixed(5)}  rumbo ${grados.toFixed(0)}°`)
    if (recorrido >= total) {
      if (process.env.REPETIR === "1") {
        recorrido = 0
        return
      }
      console.log("Llegó al destino.")
      clearInterval(temporizador)
      void client.deactivate().then(() => process.exit(0))
    }
    recorrido += velocidadMs * (intervaloMs / 1000)
  }, intervaloMs)
}
client.onWebSocketClose = () => clearInterval(temporizador)

client.activate()
