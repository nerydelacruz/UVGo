import { ESTADOS, type EstadoPedido } from '@/models/pedido.model'
import type { Reporte } from '@/models/reporte.model'

type Celda = string | number | null | undefined

// Comillas solo cuando hacen falta; una comilla dentro del texto se duplica (RFC 4180)
const celda = (valor: Celda) => {
  if (valor === null || valor === undefined) return ''
  const texto = String(valor)
  return /[",\n]/.test(texto) ? `"${texto.replace(/"/g, '""')}"` : texto
}

const fila = (valores: Celda[]) => valores.map(celda).join(',')

// Todo el reporte en un solo CSV, una sección por tabla separada por una línea en blanco.
// Los montos van sin símbolo de moneda para que la hoja de cálculo los lea como números.
export const reporteACsv = (r: Reporte) => {
  const { resumen: s, usuarios: u } = r
  const secciones: Celda[][][] = [
    [
      ['Reporte UVGo', `${r.desde} a ${r.hasta}`],
      ['Indicador', 'Valor'],
      ['Solicitudes', s.solicitudes],
      ['Pedidos (cotización aceptada)', s.pedidos],
      ['Cancelados', s.cancelados],
      ['Monto de productos (Q)', s.montoProductos],
      ['Cargos de envío (Q)', s.cargosEnvio],
      ['Total vendido (Q)', s.totalVendido],
      ['Total cobrado (Q)', s.totalCobrado],
      ['Por cobrar (Q)', s.porCobrar],
      ['Ticket promedio (Q)', s.ticketPromedio],
      ['Kilómetros recorridos', s.kilometros],
      ['Velocidad promedio (km/h)', s.velocidadPromedio],
      ['Cargo de envío por km (Q)', s.costoEnvioPorKm],
      ['Horas promedio hasta cotizar', s.horasCotizacion],
      ['Horas promedio de confirmación a pago', s.horasPago],
    ],
    [['Estado', 'Solicitudes'], ...(Object.entries(r.porEstado) as [EstadoPedido, number][]).map(([e, n]) => [ESTADOS[e], n])],
    [['Fecha', 'Solicitudes', 'Pedidos', 'Vendido (Q)', 'Kilómetros'], ...r.porDia.map((d) => [d.fecha, d.solicitudes, d.pedidos, d.vendido, d.kilometros])],
    [
      ['Usuarios', 'Cantidad'],
      ['Estudiantes registrados', u.estudiantes],
      ['Estudiantes nuevos en el periodo', u.estudiantesNuevos],
      ['Estudiantes con solicitud en el periodo', u.estudiantesConSolicitud],
      ['Pilotos', u.pilotos],
      ['Pilotos activos', u.pilotosActivos],
      ['Administradores', u.administradores],
    ],
    [['Estudiante', 'Carné', 'Pedidos', 'Total (Q)'], ...u.topEstudiantes.map((c) => [c.nombre, c.carne, c.pedidos, c.total])],
    [
      ['Piloto', 'Activo', 'Pedidos', 'En curso', 'Kilómetros', 'Km por pedido', 'Velocidad promedio (km/h)', 'Velocidad máxima (km/h)', 'Cargos de envío (Q)'],
      ...r.pilotos.map((p) => [p.nombre, p.activo ? 'Sí' : 'No', p.pedidos, p.enCurso, p.kilometros, p.kmPorPedido, p.velocidadPromedio, p.velocidadMaxima, p.cargosEnvio]),
    ],
    [['Proveedor', 'Productos', 'Unidades', 'Pedidos', 'Monto (Q)'], ...r.proveedores.map((p) => [p.tienda, p.productos, p.unidades, p.pedidos, p.monto])],
    [['Producto', 'Tienda', 'Unidades', 'Pedidos', 'Monto (Q)'], ...r.productos.map((p) => [p.descripcion, p.tienda, p.unidades, p.pedidos, p.monto])],
  ]
  return secciones.map((filas) => filas.map(fila).join('\n')).join('\n\n')
}

// El BOM hace que Excel abra el archivo en UTF-8 (tildes y ñ correctas)
export const descargarReporteCsv = (r: Reporte) => {
  const blob = new Blob(['﻿', reporteACsv(r)], { type: 'text/csv;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const enlace = document.createElement('a')
  enlace.href = url
  enlace.download = `reporte-uvgo-${r.desde}-a-${r.hasta}.csv`
  enlace.click()
  URL.revokeObjectURL(url)
}
