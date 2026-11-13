import { useState } from "react"
import { FiDownload } from "react-icons/fi"
import { useReporte } from "@/hooks/useReporte"
import type { PilotoReporte, ProductoReporte, ProveedorReporte } from "@/models/reporte.model"
import { Eyebrow, GhostButton, Header, Page, SegmentButton, Segmented, Title } from "@/styles/shared.styles"
import { formatPrecio } from "@/utilities/currency"
import { hoyISO } from "@/utilities/date"
import { descargarReporteCsv } from "@/utilities/reporteCsv"
import DashboardCard from "../components/DashboardCard/DashboardCard"
import EstadosSolicitudes from "./components/EstadosSolicitudes/EstadosSolicitudes"
import Indicadores from "./components/Indicadores/Indicadores"
import SerieDiaria from "./components/SerieDiaria/SerieDiaria"
import TablaReporte, { type Columna } from "./components/TablaReporte/TablaReporte"
import UsuariosReporte from "./components/UsuariosReporte/UsuariosReporte"
import { formatDiaLargo, formatEntero, formatKm, formatPorcentaje, moverDias } from "./formato"
import { Acciones, Fila, Nota, Secciones } from "./Reportes.styles"

// Periodos rápidos: los últimos N días contando hoy
const PERIODOS = [
  { etiqueta: "7 días", dias: 7 },
  { etiqueta: "30 días", dias: 30 },
  { etiqueta: "90 días", dias: 90 },
  { etiqueta: "12 meses", dias: 365 },
]

const columnasPilotos: Columna<PilotoReporte>[] = [
  { titulo: "Piloto", celda: (p) => (p.activo ? p.nombre : `${p.nombre} (inactivo)`) },
  { titulo: "Pedidos", celda: (p) => formatEntero(p.pedidos), numero: true },
  { titulo: "En curso", celda: (p) => formatEntero(p.enCurso), numero: true },
  { titulo: "Kilómetros", celda: (p) => formatKm(p.kilometros), numero: true },
  { titulo: "Km por pedido", celda: (p) => (p.kmPorPedido === null ? "—" : formatKm(p.kmPorPedido)), numero: true },
  { titulo: "Vel. promedio", celda: (p) => (p.velocidadPromedio === null ? "—" : `${p.velocidadPromedio} km/h`), numero: true },
  { titulo: "Vel. máxima", celda: (p) => (p.velocidadMaxima === null ? "—" : `${p.velocidadMaxima} km/h`), numero: true },
  { titulo: "Cargos de envío", celda: (p) => formatPrecio(p.cargosEnvio), numero: true },
]

const columnasProductos: Columna<ProductoReporte>[] = [
  { titulo: "Producto", celda: (p) => p.descripcion },
  { titulo: "Tienda", celda: (p) => p.tienda },
  { titulo: "Unidades", celda: (p) => formatEntero(p.unidades), numero: true },
  { titulo: "Pedidos", celda: (p) => formatEntero(p.pedidos), numero: true },
  { titulo: "Monto", celda: (p) => formatPrecio(p.monto), numero: true },
]

// La columna "% del gasto" necesita el total de todos los proveedores
const columnasProveedores = (total: number): Columna<ProveedorReporte>[] => [
  { titulo: "Proveedor", celda: (p) => p.tienda },
  { titulo: "Productos", celda: (p) => formatEntero(p.productos), numero: true },
  { titulo: "Unidades", celda: (p) => formatEntero(p.unidades), numero: true },
  { titulo: "Pedidos", celda: (p) => formatEntero(p.pedidos), numero: true },
  { titulo: "Monto", celda: (p) => formatPrecio(p.monto), numero: true },
  { titulo: "% del gasto", celda: (p) => formatPorcentaje(p.monto, total), numero: true },
]

// Reportería del administrador: dinero, envíos y kilometraje, usuarios, pilotos y proveedores de un periodo.
// Todo sale de un solo endpoint; las tarjetas solo presentan lo que el backend ya calculó.
const Reportes = () => {
  const [dias, setDias] = useState(30)
  const hasta = hoyISO()
  const desde = moverDias(hasta, -(dias - 1))
  const { data, isLoading, isError, isFetching, refetch } = useReporte({ desde, hasta })
  const estado = { isLoading, isError, onRetry: () => void refetch() }
  const totalProveedores = data?.proveedores.reduce((s, p) => s + p.monto, 0) ?? 0

  return (
    <Page>
      <Header>
        <div>
          <Eyebrow>Vista admin</Eyebrow>
          <Title>Reportes</Title>
          <Nota>
            Del {formatDiaLargo(desde)} al {formatDiaLargo(hasta)}, por fecha de solicitud. El cargo de servicio cuenta como
            costo de envío.
          </Nota>
        </div>
        <Acciones>
          <Segmented role="tablist" aria-label="Periodo del reporte">
            {PERIODOS.map((p) => (
              <SegmentButton
                key={p.dias}
                type="button"
                role="tab"
                aria-selected={dias === p.dias}
                selected={dias === p.dias}
                onClick={() => setDias(p.dias)}
              >
                {p.etiqueta}
              </SegmentButton>
            ))}
          </Segmented>
          <GhostButton type="button" disabled={!data || isFetching} onClick={() => data && descargarReporteCsv(data)}>
            <FiDownload size={14} aria-hidden />
            Descargar CSV
          </GhostButton>
        </Acciones>
      </Header>

      <Secciones aria-busy={isFetching || undefined}>
        <Indicadores resumen={data?.resumen} cargando={isLoading} />

        <Fila>
          <SerieDiaria
            titulo="Ventas por día"
            dias={data?.porDia}
            valor="vendido"
            formato={(n) => formatPrecio(n)}
            leyendaTotal="vendido en el periodo (pedidos confirmados)"
            estado={estado}
          />
          <EstadosSolicitudes porEstado={data?.porEstado} estado={estado} />
        </Fila>

        <Fila>
          <SerieDiaria
            titulo="Kilómetros por día"
            dias={data?.porDia}
            valor="kilometros"
            formato={formatKm}
            leyendaTotal="recorridos por los pilotos"
            estado={estado}
          />
          <UsuariosReporte usuarios={data?.usuarios} estado={estado} />
        </Fila>

        <DashboardCard
          titulo="Pilotos"
          to={null}
          extra="Pedidos asignados en el periodo"
          estado={estado}
          esqueleto={["16rem"]}
          vacio={data && data.pilotos.length === 0 ? { titulo: "Sin pilotos", texto: "Todavía no hay cuentas de piloto." } : null}
        >
          {data && (
            <TablaReporte
              resumen="Pedidos, kilómetros, velocidades y cargos de envío por piloto"
              columnas={columnasPilotos}
              filas={data.pilotos}
              clave={(p) => p.id}
            />
          )}
        </DashboardCard>

        <Fila>
          <DashboardCard
            titulo="Proveedores"
            to={null}
            extra="Por monto cotizado"
            estado={estado}
            esqueleto={["16rem"]}
            vacio={data && data.proveedores.length === 0 ? { titulo: "Sin compras", texto: "No hay pedidos confirmados en el periodo." } : null}
          >
            {data && (
              <TablaReporte
                resumen="Gasto por tienda proveedora"
                columnas={columnasProveedores(totalProveedores)}
                filas={data.proveedores}
                clave={(p) => p.tienda}
              />
            )}
          </DashboardCard>

          <DashboardCard
            titulo="Productos más pedidos"
            to={null}
            extra="Top 10 por unidades"
            estado={estado}
            esqueleto={["16rem"]}
            vacio={data && data.productos.length === 0 ? { titulo: "Sin productos", texto: "No hay pedidos confirmados en el periodo." } : null}
          >
            {data && (
              <TablaReporte
                resumen="Productos con más unidades pedidas"
                columnas={columnasProductos}
                filas={data.productos}
                clave={(p) => `${p.descripcion}-${p.tienda}`}
              />
            )}
          </DashboardCard>
        </Fila>
      </Secciones>
    </Page>
  )
}

export default Reportes
