import { useState } from "react"
import { CANTIDAD_MAX, CANTIDAD_MIN } from "@/models/pedido.model"
import { claveExterno, type Producto, type ProductoExterno } from "@/models/producto.model"
import type { MaterialImportado } from "./materiales"

// Producto elegido para la solicitud. Se guarda completo (no solo el id) porque puede
// dejar de verse en pantalla al buscar otra cosa o cambiar de categoría.
export type ItemSeleccionado =
  | { key: string; origen: "catalogo"; producto: Producto; cantidad: number }
  | { key: string; origen: "web"; producto: ProductoExterno; cantidad: number }
  | { key: string; origen: "texto"; texto: string; codigo?: string; termino?: string; cantidad: number }

const claveCatalogo = (id: number) => `catalogo:${id}`
const claveWeb = (producto: ProductoExterno) => `web:${claveExterno(producto)}`

// Máximo de caracteres de la descripción de un ítem de texto en el backend
const TEXTO_MAX = 500

const limitar = (cantidad: number) => Math.min(CANTIDAD_MAX, Math.max(CANTIDAD_MIN, Math.round(cantidad)))

// Suma los materiales de un PDF como ítems de texto; si un nombre se repite, se suman sus cantidades
const conMateriales = (base: Map<string, ItemSeleccionado>, materiales: MaterialImportado[]) => {
  const next = new Map(base)
  materiales.forEach((material) => {
    const texto = material.nombre.replace(/\s+/g, " ").trim().slice(0, TEXTO_MAX)
    if (!texto) return
    const key = `texto:${texto.toLowerCase()}`
    const previo = next.get(key)
    next.set(key, {
      key,
      origen: "texto",
      texto,
      codigo: material.codigo?.trim() || undefined,
      termino: material.termino?.trim() || undefined,
      cantidad: limitar((previo?.cantidad ?? 0) + material.cantidad),
    })
  })
  return next
}

export const useSeleccion = (materialesIniciales: MaterialImportado[] = []) => {
  const [items, setItems] = useState<Map<string, ItemSeleccionado>>(() => conMateriales(new Map(), materialesIniciales))

  const update = (fn: (next: Map<string, ItemSeleccionado>) => void) =>
    setItems((current) => {
      const next = new Map(current)
      fn(next)
      return next
    })

  const toggleProducto = (producto: Producto) =>
    update((next) => {
      const key = claveCatalogo(producto.id)
      if (next.has(key)) next.delete(key)
      else next.set(key, { key, origen: "catalogo", producto, cantidad: 1 })
    })

  const setProductos = (productos: Producto[], selected: boolean) =>
    update((next) =>
      productos.forEach((producto) => {
        const key = claveCatalogo(producto.id)
        if (!selected) next.delete(key)
        else if (!next.has(key)) next.set(key, { key, origen: "catalogo", producto, cantidad: 1 })
      }),
    )

  const toggleExterno = (producto: ProductoExterno) =>
    update((next) => {
      const key = claveWeb(producto)
      if (next.has(key)) next.delete(key)
      else next.set(key, { key, origen: "web", producto, cantidad: 1 })
    })

  const agregarMateriales = (materiales: MaterialImportado[]) => setItems((current) => conMateriales(current, materiales))

  const setCantidad = (key: string, cantidad: number) =>
    update((next) => {
      const item = next.get(key)
      if (item) next.set(key, { ...item, cantidad: limitar(cantidad) })
    })

  const quitar = (key: string) => update((next) => next.delete(key))

  const limpiar = () => setItems(new Map())

  const lista = [...items.values()]
  return {
    items: lista,
    stockIds: new Set(lista.flatMap((item) => (item.origen === "catalogo" ? [item.producto.id] : []))),
    textoCount: lista.filter((item) => item.origen === "texto").length,
    externoKeys: new Set(lista.flatMap((item) => (item.origen === "web" ? [claveExterno(item.producto)] : []))),
    toggleProducto,
    setProductos,
    toggleExterno,
    agregarMateriales,
    setCantidad,
    quitar,
    limpiar,
  }
}
