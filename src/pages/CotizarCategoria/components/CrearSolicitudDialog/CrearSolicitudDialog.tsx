import axios from "axios"
import { useState, type FormEvent } from "react"
import { useNavigate } from "react-router-dom"
import { FiAlertCircle, FiCheck, FiImage, FiMinus, FiPlus, FiX } from "react-icons/fi"
import Dialog from "@/components/Dialog/Dialog"
import { Actions, DialogText, DialogTitle, FormBody, FormField } from "@/components/Dialog/Dialog.styles"
import { useCrearSolicitud } from "@/hooks/usePedidos"
import {
  CANTIDAD_MAX,
  CANTIDAD_MIN,
  OBSERVACIONES_MAX,
  PRODUCTOS_MAX,
  type ProductoSolicitud,
} from "@/models/pedido.model"
import { ErrorText, GhostButton, PrimaryButton } from "@/styles/shared.styles"
import { getErrorMessage } from "@/utilities/apiError"
import { hoyISO } from "@/utilities/date"
import type { ItemSeleccionado } from "../../useSeleccion"
import {
  FieldGrid,
  Item,
  ItemInfo,
  ItemList,
  ItemThumb,
  Optional,
  RemoveButton,
  SectionTitle,
  Stepper,
  Success,
  SuccessIcon,
} from "./CrearSolicitudDialog.styles"

interface CrearSolicitudDialogProps {
  open: boolean
  items: ItemSeleccionado[]
  // Texto inicial de observaciones (p. ej. la lista de materiales importada desde un PDF)
  observacionesIniciales?: string
  onCantidad: (key: string, cantidad: number) => void
  onQuitar: (key: string) => void
  onCreada: () => void
  onClose: () => void
}

const recortar = (texto: string | null, max: number) => (texto ? texto.slice(0, max) : null)

// Google Shopping devuelve enlaces con espacios sin codificar ("q=resistencia 12 ohm") y el backend
// exige una url sin espacios (https?://\S+); se codifican sin tocar el resto del enlace
const urlSinEspacios = (url: string | null) => (url ?? "").trim().replace(/\s/g, "%20")

// Convierte la selección al formato del backend: del catálogo por id, de la web con una copia del producto
const aProductos = (items: ItemSeleccionado[]): ProductoSolicitud[] =>
  items.map((item) =>
    item.origen === "catalogo"
      ? { articuloId: item.producto.id, cantidad: item.cantidad }
      : {
          cantidad: item.cantidad,
          web: {
            titulo: item.producto.titulo.slice(0, 500),
            url: urlSinEspacios(item.producto.url),
            imagen: item.producto.imagen && item.producto.imagen.length <= 2000 ? item.producto.imagen : null,
            tienda: recortar(item.producto.tienda, 150),
            precio: item.producto.precio,
            moneda: recortar(item.producto.moneda, 10),
          },
        },
  )

const mensajeError = (error: unknown) =>
  axios.isAxiosError(error) && error.response?.status === 403
    ? "Solo las cuentas de estudiante pueden solicitar cotizaciones."
    : getErrorMessage(error, "No pudimos enviar tu solicitud. Intenta de nuevo.")

const Formulario = ({
  items,
  observacionesIniciales = "",
  onCantidad,
  onQuitar,
  onCreada,
  onClose,
}: Omit<CrearSolicitudDialogProps, "open">) => {
  const crear = useCrearSolicitud()
  const navigate = useNavigate()
  const [curso, setCurso] = useState("")
  const [catedratico, setCatedratico] = useState("")
  const [fechaLimite, setFechaLimite] = useState("")
  const [puntoEntrega, setPuntoEntrega] = useState("")
  const [observaciones, setObservaciones] = useState(observacionesIniciales)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    crear.mutate(
      {
        curso: curso.trim(),
        nombreCatedratico: catedratico.trim(),
        fechaLimite,
        ...(puntoEntrega.trim() ? { puntoEntregaPreferido: puntoEntrega.trim() } : {}),
        ...(observaciones.trim() ? { observaciones: observaciones.trim() } : {}),
        productos: aProductos(items),
      },
      { onSuccess: onCreada },
    )
  }

  if (crear.isSuccess) {
    return (
      <FormBody as="div">
        <Success>
          <SuccessIcon>
            <FiCheck size={24} aria-hidden />
          </SuccessIcon>
          <DialogTitle id="solicitud-title">¡Solicitud enviada!</DialogTitle>
          <DialogText>
            Te enviamos un correo de confirmación. El equipo de UVGo revisará los productos y te mandará la cotización
            con el total. La podrás revisar y pagar en “Mis solicitudes”.
          </DialogText>
        </Success>
        <Actions>
          <GhostButton type="button" onClick={onClose}>
            Seguir cotizando
          </GhostButton>
          <PrimaryButton type="button" onClick={() => navigate("/mis-solicitudes")} data-autofocus>
            Ver mis solicitudes
          </PrimaryButton>
        </Actions>
      </FormBody>
    )
  }

  const demasiados = items.length > PRODUCTOS_MAX
  // maxLength no recorta un valor inicial largo (la lista del PDF), así que se valida aparte
  const observacionesLargas = observaciones.trim().length > OBSERVACIONES_MAX

  return (
    <FormBody onSubmit={handleSubmit}>
      <div>
        <DialogTitle id="solicitud-title">Solicitar cotización</DialogTitle>
        <DialogText>Revisaremos los productos y te enviaremos la cotización por correo.</DialogText>
      </div>

      <section aria-label="Productos">
        <SectionTitle>
          Productos <span>{items.length}</span>
        </SectionTitle>
        {items.length === 0 ? (
          <DialogText>No hay productos seleccionados. Cierra este diálogo y elige al menos uno.</DialogText>
        ) : (
          <ItemList>
            {items.map((item) => {
              const nombre = item.origen === "catalogo" ? item.producto.nombre : item.producto.titulo
              const origen = item.origen === "catalogo" ? "Stock UVGo" : (item.producto.tienda ?? "Web")
              return (
                <Item key={item.key}>
                  <ItemThumb>
                    {item.producto.imagen ? (
                      <img src={item.producto.imagen} alt="" loading="lazy" />
                    ) : (
                      <FiImage size={16} aria-hidden />
                    )}
                  </ItemThumb>
                  <ItemInfo>
                    <strong title={nombre}>{nombre}</strong>
                    <span>{origen}</span>
                  </ItemInfo>
                  <Stepper>
                    <button
                      type="button"
                      aria-label={`Quitar una unidad de ${nombre}`}
                      disabled={item.cantidad <= CANTIDAD_MIN}
                      onClick={() => onCantidad(item.key, item.cantidad - 1)}
                    >
                      <FiMinus size={14} aria-hidden />
                    </button>
                    <input
                      type="number"
                      inputMode="numeric"
                      min={CANTIDAD_MIN}
                      max={CANTIDAD_MAX}
                      value={item.cantidad}
                      aria-label={`Cantidad de ${nombre}`}
                      onFocus={(e) => e.target.select()}
                      onChange={(e) => onCantidad(item.key, Number(e.target.value) || CANTIDAD_MIN)}
                    />
                    <button
                      type="button"
                      aria-label={`Agregar una unidad de ${nombre}`}
                      disabled={item.cantidad >= CANTIDAD_MAX}
                      onClick={() => onCantidad(item.key, item.cantidad + 1)}
                    >
                      <FiPlus size={14} aria-hidden />
                    </button>
                  </Stepper>
                  <RemoveButton type="button" aria-label={`Quitar ${nombre} de la solicitud`} onClick={() => onQuitar(item.key)}>
                    <FiX size={16} aria-hidden />
                  </RemoveButton>
                </Item>
              )
            })}
          </ItemList>
        )}
        {demasiados && (
          <ErrorText role="alert">
            <FiAlertCircle size={14} aria-hidden />
            Una solicitud admite hasta {PRODUCTOS_MAX} productos.
          </ErrorText>
        )}
      </section>

      <FieldGrid>
        <FormField>
          Curso
          <input value={curso} onChange={(e) => setCurso(e.target.value)} maxLength={150} required data-autofocus />
        </FormField>
        <FormField>
          Catedrático
          <input value={catedratico} onChange={(e) => setCatedratico(e.target.value)} maxLength={150} required />
        </FormField>
        <FormField>
          Fecha límite
          <input
            type="date"
            value={fechaLimite}
            min={hoyISO()}
            onChange={(e) => setFechaLimite(e.target.value)}
            required
          />
        </FormField>
        <FormField>
          <span>
            Punto de entrega <Optional>(opcional)</Optional>
          </span>
          <input
            value={puntoEntrega}
            onChange={(e) => setPuntoEntrega(e.target.value)}
            maxLength={150}
            placeholder="Ej. Edificio CIT, lobby"
          />
        </FormField>
      </FieldGrid>

      <FormField>
        <span>
          Observaciones <Optional>(opcional)</Optional>
        </span>
        <textarea
          value={observaciones}
          onChange={(e) => setObservaciones(e.target.value)}
          maxLength={OBSERVACIONES_MAX}
          placeholder="Marca, modelo o cualquier detalle que nos ayude a conseguirlo"
        />
      </FormField>
      {observacionesLargas && (
        <ErrorText role="alert">
          <FiAlertCircle size={14} aria-hidden />
          Las observaciones admiten hasta {OBSERVACIONES_MAX} caracteres ({observaciones.trim().length} ahora). Resume la
          lista de materiales.
        </ErrorText>
      )}

      {crear.isError && (
        <ErrorText role="alert">
          <FiAlertCircle size={14} aria-hidden />
          {mensajeError(crear.error)}
        </ErrorText>
      )}

      <Actions>
        <GhostButton type="button" onClick={onClose} disabled={crear.isPending}>
          Cancelar
        </GhostButton>
        <PrimaryButton type="submit" disabled={crear.isPending || items.length === 0 || demasiados || observacionesLargas}>
          {crear.isPending ? "Enviando…" : "Enviar solicitud"}
        </PrimaryButton>
      </Actions>
    </FormBody>
  )
}

const CrearSolicitudDialog = ({ open, onClose, ...props }: CrearSolicitudDialogProps) => (
  <Dialog open={open} onClose={onClose} labelledBy="solicitud-title" wide>
    <Formulario {...props} onClose={onClose} />
  </Dialog>
)

export default CrearSolicitudDialog
