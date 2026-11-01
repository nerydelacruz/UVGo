import { useRef, useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { solicitarCotizacionLista, type ListaMateriales, type SolicitudListaRequest } from '@/services/listas-materiales.service'
import { useAuthStore } from '@/store/auth.store'
import { getErrorMessage } from '@/utilities/apiError'
import { hoyISO } from '@/utilities/date'
import { ErrorText, PrimaryButton } from '@/styles/shared.styles'
import { Actions, Field, Fields } from './MaterialesIA.styles'

export default function SolicitarCotizacionLista({ lista }: { lista: ListaMateriales }) {
  const usuario = useAuthStore(s => s.usuario)
  const queryClient = useQueryClient()
  const enviando = useRef(false)
  const [datos, setDatos] = useState<SolicitudListaRequest>({
    curso: '', nombreCatedratico: '', fechaLimite: '', observaciones: '', puntoEntregaPreferido: '',
  })
  const solicitud = useMutation({
    mutationFn: (datos: SolicitudListaRequest) => solicitarCotizacionLista(lista.id, datos),
    onSuccess: (pedido) => {
      queryClient.setQueryData(['lista-materiales', usuario?.id, lista.id], { ...lista, solicitudId: pedido.id })
      void queryClient.invalidateQueries({ queryKey: ['pedidos'] })
    },
  })
  const solicitudId = lista.solicitudId ?? solicitud.data?.id
  const correo = usuario?.correoContacto || usuario?.correo
  const cambiar = (campo: keyof SolicitudListaRequest, valor: string) => setDatos(prev => ({ ...prev, [campo]: valor }))

  async function enviar(event: FormEvent) {
    event.preventDefault()
    if (enviando.current || solicitudId || !datos.curso.trim() || !datos.nombreCatedratico.trim()) return
    enviando.current = true
    try {
      await solicitud.mutateAsync({ ...datos, curso: datos.curso.trim(), nombreCatedratico: datos.nombreCatedratico.trim() })
    } catch { /* El estado de la mutación conserva el error y los datos para reintentar. */ }
    finally { enviando.current = false }
  }

  if (solicitudId) return <section aria-label="Solicitud de la lista">
    <p role="status">Esta lista ya tiene una solicitud de cotización guardada.</p>
    <p>Número: {solicitudId}</p>
    <Link to={`/mis-solicitudes?solicitud=${encodeURIComponent(solicitudId)}`}>Ver solicitud y su estado</Link>
  </section>

  if (usuario?.rol !== 'ESTUDIANTE') return <p>Las cuentas de estudiante pueden solicitar la cotización de sus listas.</p>

  return <form onSubmit={enviar} aria-label="Solicitar cotización de la lista">
    <h3>Solicitar cotización</h3>
    <p>Se enviarán los {lista.materiales.length} materiales de esta lista al equipo de UVGo para revisar disponibilidad y precios.</p>
    <p>El aviso de cotización lista se dirige a <strong>{correo}</strong>. También podrás consultarla en Mis solicitudes.</p>
    <fieldset disabled={solicitud.isPending} style={{ border: 0, minWidth: 0 }}>
      <Fields>
        <Field>Curso *<input required maxLength={150} value={datos.curso} onChange={e => cambiar('curso', e.target.value)} /></Field>
        <Field>Catedrático *<input required maxLength={150} value={datos.nombreCatedratico} onChange={e => cambiar('nombreCatedratico', e.target.value)} /></Field>
        <Field>Fecha límite *<input required type="date" min={hoyISO()} value={datos.fechaLimite} onChange={e => cambiar('fechaLimite', e.target.value)} /></Field>
        <Field>Punto de entrega preferido<input maxLength={150} value={datos.puntoEntregaPreferido} onChange={e => cambiar('puntoEntregaPreferido', e.target.value)} /></Field>
        <Field>Observaciones generales<textarea maxLength={2000} value={datos.observaciones} onChange={e => cambiar('observaciones', e.target.value)} /></Field>
      </Fields>
      {solicitud.isError && <ErrorText role="alert">{getErrorMessage(solicitud.error, 'No se pudo confirmar el envío. Puedes reintentar sin duplicar la solicitud.')}</ErrorText>}
      <Actions><PrimaryButton type="submit" disabled={solicitud.isPending || !datos.curso.trim() || !datos.nombreCatedratico.trim() || !datos.fechaLimite}>
        {solicitud.isPending ? 'Enviando…' : 'Solicitar cotización de esta lista'}
      </PrimaryButton></Actions>
    </fieldset>
  </form>
}
