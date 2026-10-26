import { useState } from "react"
import { CANTIDAD_MAX, CANTIDAD_MIN } from "@/models/pedido.model"
import { claveExterno, type Producto, type ProductoExterno } from "@/models/producto.model"

// Producto elegido para la solicitud. Se guarda completo (no solo el id) porque puede
// dejar de verse en pantalla al buscar otra cosa o cambiar de categoría.
export type ItemSeleccionado =
  | { key: string; origen: "catalogo"; producto: Producto; cantidad: number }
  | { key: string; origen: "web"; producto: ProductoExterno; cantidad: number }

const claveCatalogo = (id: number) => `catalogo:${id}`
const claveWeb = (producto: ProductoExterno) => `web:${claveExterno(producto)}`

const limitar = (cantidad: number) => Math.min(CANTIDAD_MAX, Math.max(CANTIDAD_MIN, Math.round(cantidad)))

export const useSeleccion = () => {
  const [items, setItems] = useState<Map<string, ItemSeleccionado>>(new Map())

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
    externoKeys: new Set(lista.flatMap((item) => (item.origen === "web" ? [claveExterno(item.producto)] : []))),
    toggleProducto,
    setProductos,
    toggleExterno,
    setCantidad,
    quitar,
    limpiar,
  }
}
