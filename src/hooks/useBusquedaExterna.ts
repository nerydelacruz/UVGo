import { useQuery } from '@tanstack/react-query'
import { buscarProductosExternos } from '@/services/producto.service'

// Solo se dispara cuando hay texto (al enviar el formulario, no en cada tecla).
// Cada búsqueda externa cuesta, así que repetir la misma usa la caché por 5 minutos.
export const useBusquedaExterna = (query: string) =>
  useQuery({
    queryKey: ['busqueda-externa', query],
    queryFn: () => buscarProductosExternos(query),
    enabled: query.length > 0,
    staleTime: 5 * 60 * 1000,
    retry: false,
  })
