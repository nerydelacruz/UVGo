import { useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { extraerMateriales } from '@/services/extraccion.service'
import type { MaterialExtraido } from '@/services/extraccion.service'
import { guardarLista, obtenerLista, obtenerListas } from '@/services/listas-materiales.service'
import { useAuthStore } from '@/store/auth.store'
import { getErrorMessage } from '@/utilities/apiError'
import { Title, PrimaryButton, GhostButton, ErrorText } from '@/styles/shared.styles'
import { Actions, Card, Field, Fields, Row, Screen } from './MaterialesIA.styles'
import SolicitarCotizacionLista from './SolicitarCotizacionLista'

type Fila = Omit<MaterialExtraido, 'cantidad'> & { id: number; cantidad: string }
const nuevaFila = (id: number): Fila => ({ id, nombre: '', descripcion: '', cantidad: '', unidad: '', observaciones: '', referencia: '', advertencias: [] })

export default function MaterialesIA() {
  const usuario = useAuthStore(s => s.usuario?.id)
  // Al cambiar de cuenta se descartan también los borradores de la cuenta anterior.
  return <Contenido key={usuario} usuario={usuario} />
}

function Contenido({ usuario }: { usuario: string | undefined }) {
  const queryClient = useQueryClient()
  const siguiente = useRef(0)
  const ocupado = useRef(false)
  const [archivo, setArchivo] = useState<File | null>(null)
  const [nombre, setNombre] = useState('')
  const [filas, setFilas] = useState<Fila[]>([])
  const [revisada, setRevisada] = useState(false)
  const [actividad, setActividad] = useState<'analizar' | 'guardar' | null>(null)
  const [error, setError] = useState('')
  const [aviso, setAviso] = useState('')
  const [pagina, setPagina] = useState(0)
  const [seleccionada, setSeleccionada] = useState<string | null>(null)
  const historial = useQuery({ queryKey: ['listas-materiales', usuario, pagina], queryFn: () => obtenerListas(pagina), enabled: !!usuario })
  const detalle = useQuery({ queryKey: ['lista-materiales', usuario, seleccionada], queryFn: () => obtenerLista(seleccionada!), enabled: !!usuario && !!seleccionada })

  function editar(id: number, campo: keyof Fila, valor: string) {
    setFilas(prev => prev.map(f => f.id === id ? { ...f, [campo]: valor } : f))
    setRevisada(false); setAviso('')
  }

  async function analizar() {
    if (!archivo || ocupado.current) return
    if (!archivo.name.toLowerCase().endsWith('.pdf') || !archivo.size || archivo.size > 5 * 1024 * 1024) {
      setError('Selecciona un PDF no vacío de hasta 5 MB.'); return
    }
    if (filas.length && !window.confirm('Un nuevo análisis reemplazará los materiales del borrador. ¿Continuar?')) return
    ocupado.current = true; setActividad('analizar'); setError(''); setAviso('')
    try {
      const resultado = await extraerMateriales(archivo)
      setFilas(resultado.materiales.map(f => ({ ...f, id: siguiente.current++, cantidad: f.cantidad?.toString() ?? '' })))
      if (!nombre.trim()) setNombre(archivo.name.replace(/\.pdf$/i, '').slice(0, 120))
      setRevisada(false)
      setAviso(resultado.materiales.length ? 'Análisis completo. Revisa los materiales antes de guardar.' : 'No se encontraron materiales. Puedes agregarlos manualmente.')
    } catch (e) {
      const mensaje = axios.isAxiosError(e) ? e.response?.data?.mensaje : null
      setError(typeof mensaje === 'string' ? mensaje : getErrorMessage(e, 'No se pudo analizar el PDF. Puedes completar la lista manualmente.'))
    } finally { ocupado.current = false; setActividad(null) }
  }

  const validas = nombre.trim().length > 0 && filas.length > 0 && filas.every(f =>
    f.nombre.trim() && f.descripcion?.trim() && f.unidad?.trim()
    && /^\d+(\.\d{1,3})?$/.test(f.cantidad) && Number(f.cantidad) >= .001 && Number(f.cantidad) <= 999999999.999)

  async function guardar(e: FormEvent) {
    e.preventDefault()
    if (!validas || !revisada || ocupado.current) return
    ocupado.current = true; setActividad('guardar'); setError(''); setAviso('')
    try {
      const lista = await guardarLista(nombre.trim(), filas.map(f => ({
        nombre: f.nombre.trim(), descripcion: f.descripcion!.trim(), cantidad: Number(f.cantidad),
        unidad: f.unidad!.trim(), observaciones: f.observaciones, referencia: f.referencia,
      })))
      setFilas([]); setNombre(''); setRevisada(false); setPagina(0); setSeleccionada(lista.id)
      queryClient.setQueryData(['lista-materiales', usuario, lista.id], lista)
      void queryClient.invalidateQueries({ queryKey: ['listas-materiales', usuario] })
      setAviso('Lista guardada en tu cuenta. Puedes consultarla abajo, incluso después de recargar.')
    } catch (e) { setError(getErrorMessage(e, 'No se pudo guardar. Tu borrador sigue disponible. Revisa el historial antes de volver a intentarlo.')) }
    finally { ocupado.current = false; setActividad(null) }
  }

  return <Screen>
    <header><Link to="/dashboard">Volver al inicio</Link><Title>Materiales con IA</Title>
      <p>Convierte tu PDF en una lista, revisa los materiales y solicita su cotización.</p></header>
    <Card aria-labelledby="nuevo-titulo">
      <h2 id="nuevo-titulo">1. Sube tu documento</h2>
      <p>Se enviará el texto a Claude. Usa un PDF con texto seleccionable, de hasta 5 MB y 20 páginas.</p>
      <Field>Documento PDF<input type="file" accept=".pdf,application/pdf" disabled={!!actividad} onChange={e => { setArchivo(e.target.files?.[0] ?? null); setError('') }} /></Field>
      <Actions><PrimaryButton type="button" disabled={!archivo || !!actividad} onClick={analizar}>{actividad === 'analizar' ? 'Analizando…' : 'Analizar con Claude'}</PrimaryButton></Actions>
    </Card>
    <div role="status" aria-live="polite">{actividad === 'analizar' ? 'El análisis puede tardar hasta un minuto. No se reintenta automáticamente.' : aviso}</div>
    {error && <ErrorText role="alert">{error}</ErrorText>}
    <Card>
      <h2>2. Revisa y guarda tu lista</h2>
      <p>Completa los campos obligatorios (*). También puedes crear una lista manualmente.</p>
      <form onSubmit={guardar}>
        <fieldset disabled={!!actividad} style={{ border: 0, minWidth: 0 }}>
          <Field>Nombre de la lista *<input required maxLength={120} value={nombre} onChange={e => setNombre(e.target.value)} /></Field>
          {filas.map((f, indice) => <Row key={f.id}>
            <legend>Material {indice + 1}</legend>
            {f.advertencias.length > 0 && <p>Revisa: {f.advertencias.join(' ')}</p>}
            {f.referencia && <blockquote><strong>Texto del PDF:</strong> {f.referencia}</blockquote>}
            <Fields>
              <Field>Nombre *<input required maxLength={120} value={f.nombre} onChange={e => editar(f.id, 'nombre', e.target.value)} /></Field>
              <Field>Cantidad *<input required type="number" min="0.001" max="999999999.999" step="0.001" value={f.cantidad} onChange={e => editar(f.id, 'cantidad', e.target.value)} /></Field>
              <Field>Unidad *<input required maxLength={60} value={f.unidad ?? ''} onChange={e => editar(f.id, 'unidad', e.target.value)} /></Field>
              <Field>Descripción *<textarea required maxLength={400} value={f.descripcion ?? ''} onChange={e => editar(f.id, 'descripcion', e.target.value)} /></Field>
              <Field>Observaciones<textarea maxLength={1200} value={f.observaciones ?? ''} onChange={e => editar(f.id, 'observaciones', e.target.value)} /></Field>
            </Fields>
            <GhostButton type="button" onClick={() => { setFilas(prev => prev.filter(item => item.id !== f.id)); setRevisada(false) }}>Eliminar material {indice + 1}</GhostButton>
          </Row>)}
          <GhostButton type="button" disabled={filas.length >= 50} onClick={() => { setFilas(prev => [...prev, nuevaFila(siguiente.current++)]); setRevisada(false) }}>Agregar material ({filas.length}/50)</GhostButton>
          <p style={{ margin: '16px 0' }}><label><input type="checkbox" checked={revisada} onChange={e => setRevisada(e.target.checked)} /> Revisé los materiales y sus cantidades.</label></p>
          <PrimaryButton type="submit" disabled={!validas || !revisada || !!actividad}>{actividad === 'guardar' ? 'Guardando…' : 'Guardar lista'}</PrimaryButton>
        </fieldset>
      </form>
    </Card>
    <Card aria-labelledby="historial-titulo">
      <h2 id="historial-titulo">Mis listas guardadas</h2>
      {historial.isPending && <p>Cargando listas…</p>}
      {historial.isError && <><ErrorText role="alert">No se pudieron cargar las listas.</ErrorText><GhostButton onClick={() => void historial.refetch()}>Reintentar</GhostButton></>}
      {historial.data?.listas.length === 0 && <p>Todavía no tienes listas en esta página.</p>}
      {historial.data?.listas.map(lista => <Actions key={lista.id}><strong>{lista.nombre}</strong><span>{new Date(lista.creada).toLocaleDateString('es-GT')}</span><GhostButton aria-label={`Ver lista ${lista.nombre}`} onClick={() => setSeleccionada(lista.id)}>Ver materiales</GhostButton></Actions>)}
      <Actions><GhostButton disabled={pagina === 0} onClick={() => setPagina(p => p - 1)}>Anterior</GhostButton><span>Página {pagina + 1}</span><GhostButton disabled={!historial.data?.hayMas} onClick={() => setPagina(p => p + 1)}>Siguiente</GhostButton></Actions>
      {seleccionada && <section aria-label="Detalle de la lista">
        {detalle.isPending && <p>Cargando materiales…</p>}
        {detalle.isError && <><ErrorText role="alert">No se pudo abrir la lista.</ErrorText><GhostButton onClick={() => void detalle.refetch()}>Reintentar</GhostButton></>}
        {detalle.data && <><h3>{detalle.data.nombre}</h3><ol>{detalle.data.materiales.map((m, i) => <li key={i} style={{ margin: '12px 24px', overflowWrap: 'anywhere' }}>
          <strong>{m.nombre} — {m.cantidad} {m.unidad}</strong><p>{m.descripcion}</p>{m.observaciones && <p>{m.observaciones}</p>}{m.referencia && <p>Fuente: {m.referencia}</p>}
        </li>)}</ol><SolicitarCotizacionLista key={detalle.data.id} lista={detalle.data} /></>}
      </section>}
    </Card>
  </Screen>
}
