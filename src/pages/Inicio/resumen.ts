// Cálculos del inicio del estudiante a partir de sus solicitudes (GET /api/v1/pedidos).
import type { EstadoPedido, PedidoDetalle } from "@/models/pedido.model"
import { diasEntre, diaISO, hoyISO } from "@/utilities/date"

export type Tono = "accent" | "warning" | "primary" | "success" | "neutral"

export interface Etapa {
  tag: string // estado corto ("Por pagar")
  paso: string // qué está pasando ("Sube tu comprobante")
  avance: number // fases completadas de PASOS_TOTALES
  tono: Tono
  accion: { label: string; to: string }
  // Requiere que el estudiante haga algo (aceptar la cotización o subir el comprobante)
  pendienteDelEstudiante: boolean
}

// Solicitado → Cotizado → Confirmado → Pagado → Entregado
export const PASOS_TOTALES = 5

export const etapa = (p: PedidoDetalle): Etapa => {
  const seguimiento = { label: "Ver seguimiento", to: "/seguimiento-pedidos" }
  const solicitudes = { label: "Ver solicitud", to: "/mis-solicitudes" }
  switch (p.estado) {
    case "SOLICITADO":
      return { tag: "Cotizando", paso: "Preparamos tu cotización", avance: 1, tono: "warning", accion: solicitudes, pendienteDelEstudiante: false }
    case "COTIZADO":
      return {
        tag: "Cotización lista",
        paso: "Revisa y acepta el precio",
        avance: 2,
        tono: "accent",
        accion: { label: "Revisar cotización", to: "/mis-solicitudes" },
        pendienteDelEstudiante: true,
      }
    case "CONFIRMADO":
      return p.comprobante
        ? { tag: "En revisión", paso: "Validamos tu pago", avance: 3, tono: "primary", accion: seguimiento, pendienteDelEstudiante: false }
        : {
            tag: "Por pagar",
            paso: "Sube tu comprobante",
            avance: 3,
            tono: "accent",
            accion: { label: "Subir comprobante", to: "/mis-solicitudes" },
            pendienteDelEstudiante: true,
          }
    case "PAGADO":
    case "EN_COMPRA":
      return { tag: "En preparación", paso: "Compramos tus materiales", avance: 4, tono: "primary", accion: seguimiento, pendienteDelEstudiante: false }
    case "LISTO":
      return { tag: "Listo", paso: "Listo para entregarse", avance: 4, tono: "success", accion: seguimiento, pendienteDelEstudiante: false }
    case "ENTREGADO":
      return { tag: "Entregado", paso: "Entregado", avance: 5, tono: "success", accion: seguimiento, pendienteDelEstudiante: false }
    case "CANCELADO":
      return { tag: "Cancelado", paso: "Solicitud cancelada", avance: 0, tono: "neutral", accion: solicitudes, pendienteDelEstudiante: false }
  }
}

const EN_COTIZACION: EstadoPedido[] = ["SOLICITADO", "COTIZADO"]
const EN_PREPARACION: EstadoPedido[] = ["CONFIRMADO", "PAGADO", "EN_COMPRA", "LISTO"]

// Primer día del semestre UVG en curso: enero–junio y julio–diciembre
const inicioSemestre = (hoy = new Date()) => new Date(hoy.getFullYear(), hoy.getMonth() < 6 ? 0 : 6, 1)

export const diasParaLimite = (p: PedidoDetalle) => diasEntre(hoyISO(), p.fechaLimite)

export const cuentaRegresiva = (dias: number) =>
  dias > 1 ? `Faltan ${dias} días` : dias === 1 ? "Mañana" : dias === 0 ? "Hoy" : `Venció hace ${-dias} ${dias === -1 ? "día" : "días"}`

export const formatQ = (valor: number) => `Q ${valor.toLocaleString("es-GT", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`

// "hace 5 min", "hace 3 h", "hace 2 d"
export const hace = (iso: string, ahora = new Date()) => {
  const minutos = Math.max(0, Math.floor((ahora.getTime() - new Date(iso).getTime()) / 60_000))
  if (minutos < 1) return "justo ahora"
  if (minutos < 60) return `hace ${minutos} min`
  if (minutos < 1440) return `hace ${Math.floor(minutos / 60)} h`
  return `hace ${Math.floor(minutos / 1440)} d`
}

// Último cambio que el estudiante puede ver en una solicitud
export const ultimaActividad = (p: PedidoDetalle) =>
  [p.fechaSolicitud, p.fechaCotizacion, p.fechaConfirmacion, p.comprobante?.fecha ?? null, p.fechaPago]
    .filter((f): f is string => f !== null)
    .sort()
    .at(-1) ?? p.fechaSolicitud

export const resumir = (pedidos: PedidoDetalle[]) => {
  const vigentes = pedidos.filter((p) => p.estado !== "CANCELADO")
  const desde = inicioSemestre()
  const delSemestre = vigentes.filter((p) => new Date(p.fechaSolicitud) >= desde)
  const pagadosSemestre = delSemestre.filter((p) => p.fechaPago !== null)
  const gastado = pagadosSemestre.reduce((suma, p) => suma + (p.total ?? 0), 0)
  const servicio = pagadosSemestre.reduce((suma, p) => suma + (p.cargoServicio ?? 0), 0)

  // Activos: lo que aún no se entrega, el más urgente (fecha límite más cercana) primero
  const activos = vigentes
    .filter((p) => p.estado !== "ENTREGADO")
    .sort((a, b) => a.fechaLimite.localeCompare(b.fechaLimite))

  return {
    activos,
    recientes: [...vigentes].sort((a, b) => ultimaActividad(b).localeCompare(ultimaActividad(a))),
    enCotizacion: vigentes.filter((p) => EN_COTIZACION.includes(p.estado)),
    enPreparacion: vigentes.filter((p) => EN_PREPARACION.includes(p.estado)),
    entregados: vigentes.filter((p) => p.estado === "ENTREGADO"),
    pendientesDelEstudiante: activos.filter((p) => etapa(p).pendienteDelEstudiante),
    semestre: {
      gastado,
      servicio,
      pedidosPagados: pagadosSemestre.length,
      unidades: pagadosSemestre.reduce((suma, p) => suma + p.productos.reduce((s, item) => s + item.cantidad, 0), 0),
    },
  }
}

export type Resumen = ReturnType<typeof resumir>

const MESES = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"]

// Solicitudes por mes del año en curso
export const porMes = (pedidos: PedidoDetalle[], hoy = new Date()) =>
  MESES.map((label, mes) => ({
    label,
    total: pedidos.filter((p) => {
      const fecha = new Date(p.fechaSolicitud)
      return fecha.getFullYear() === hoy.getFullYear() && fecha.getMonth() === mes
    }).length,
  }))

// Solicitudes por semana en las últimas 6 semanas (la última es la actual)
export const porSemana = (pedidos: PedidoDetalle[], hoy = new Date()) =>
  Array.from({ length: 6 }, (_, i) => {
    const fin = new Date(hoy)
    fin.setDate(hoy.getDate() - (5 - i) * 7)
    const inicio = new Date(fin)
    inicio.setDate(fin.getDate() - 6)
    const [desde, hasta] = [diaISO(inicio), diaISO(fin)]
    return {
      label: i === 5 ? "Esta" : `S-${5 - i}`,
      total: pedidos.filter((p) => {
        const dia = diaISO(new Date(p.fechaSolicitud))
        return dia >= desde && dia <= hasta
      }).length,
    }
  })
