import { useQuery } from '@tanstack/react-query'
import { getProductos } from '@/services/producto.service'

// Sin búsqueda se muestran solo unos cuantos artículos; al buscar se pide más resultados
const TAMANO_INICIAL = 5
const TAMANO_BUSQUEDA = 20

export const useProductos = (query: string) =>
  useQuery({
    queryKey: ['articulos', query],
    queryFn: () =>
      getProductos(query ? { q: query, tamano: TAMANO_BUSQUEDA } : { tamano: TAMANO_INICIAL }),
  })
