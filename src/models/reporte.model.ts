import type { EstadoPedido } from './pedido.model'

// Mismo contrato que ReporteDtos del backend. Montos en quetzales; fechas "yyyy-mm-dd".
// Todo se filtra por fecha de solicitud. "Pedido" = solicitud con la cotización aceptada y sin cancelar.

export interface ResumenReporte {
  solicitudes: number
  pedidos: number
  cancelados: number
  montoProductos: number
  // Suma del cargo de servicio, que es lo que se cobra por el envío
  cargosEnvio: number
  totalVendido: number
  totalCobrado: number
  porCobrar: number
  ticketPromedio: number
  kilometros: number
  // null mientras ningún pedido vendido tenga recorrido registrado
  costoEnvioPorKm: number | null
  horasCotizacion: number | null
  horasPago: number | null
  // km/h de los recorridos (kilómetros ÷ tiempo en movimiento); null sin recorridos medidos
  velocidadPromedio: number | null
}

export interface DiaReporte {
  fecha: string
  solicitudes: number
  pedidos: number
  vendido: number
  kilometros: number
}

export interface ClienteReporte {
  id: string
  nombre: string
  carne: string | null
  pedidos: number
  total: number
}

export interface UsuariosReporte {
  estudiantes: number
  estudiantesNuevos: number
  estudiantesConSolicitud: number
  pilotos: number
  pilotosActivos: number
  administradores: number
  topEstudiantes: ClienteReporte[]
}

export interface PilotoReporte {
  id: string
  nombre: string
  activo: boolean
  pedidos: number
  enCurso: number
  kilometros: number
  kmPorPedido: number | null
  cargosEnvio: number
  // km/h; null mientras no tenga recorridos medidos
  velocidadPromedio: number | null
  velocidadMaxima: number | null
}

export interface ProveedorReporte {
  tienda: string
  productos: number
  unidades: number
  pedidos: number
  monto: number
}

export interface ProductoReporte {
  descripcion: string
  tienda: string
  unidades: number
  monto: number
  pedidos: number
}

export interface Reporte {
  desde: string
  hasta: string
  resumen: ResumenReporte
  porEstado: Record<EstadoPedido, number>
  porDia: DiaReporte[]
  usuarios: UsuariosReporte
  pilotos: PilotoReporte[]
  proveedores: ProveedorReporte[]
  productos: ProductoReporte[]
}

export interface PeriodoReporte {
  desde: string
  hasta: string
}
