import { useEffect, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { createPortal } from 'react-dom'
import axios from 'axios'
import styled from '@emotion/styled'
import type { NuevoArticulo } from '@/models/articulo.model'
import { extraerMateriales } from '@/services/extraccion.service'
import type { MaterialExtraido } from '@/services/extraccion.service'
import { Actions, CancelButton, Field, Fields, Input, SubmitButton, TextArea, Title } from '../AddArticuloModal/AddArticuloModal.styles'

const Modal = styled.dialog`
  position: fixed; inset: 0; margin: auto; width: min(94vw, 76rem);
  max-height: 90vh; overflow: auto; border: 0; border-radius: 20px;
  padding: 28px; background: white; color: #262626; font-size: 1.4rem;
  &::backdrop { background: rgba(0,0,0,.45); }
  p { margin: 12px 0; }
  fieldset { border: 1px solid #ddd; border-radius: 12px; padding: 16px; margin: 16px 0; }
  legend { font-weight: 600; padding: 0 6px; }
  blockquote { margin: 12px 0; padding: 12px; background: #f5f5f5; white-space: pre-wrap; }
`

type Fila = Omit<MaterialExtraido, 'cantidad'> & { id: number; cantidad: string }
interface Props { onAdd: (articulos: NuevoArticulo[]) => void; onClose: () => void }

export default function ImportarMateriales({ onAdd, onClose }: Props) {
  const modal = useRef<HTMLDialogElement>(null)
  const ocupado = useRef(false)
  const siguiente = useRef(0)
  const [archivo, setArchivo] = useState<File | null>(null)
  const [filas, setFilas] = useState<Fila[]>([])
  const [analizado, setAnalizado] = useState(false)
  const [cargando, setCargando] = useState(false)
  const [error, setError] = useState('')
  const [revisado, setRevisado] = useState(false)

  useEffect(() => {
    const anterior = document.activeElement as HTMLElement | null
    const dialog = modal.current
    dialog?.showModal()
    return () => { dialog?.close(); anterior?.focus() }
  }, [])

  function editar(id: number, campo: keyof Fila, valor: string) {
    setFilas(prev => prev.map(fila => fila.id === id ? { ...fila, [campo]: valor } : fila))
    setRevisado(false)
  }

  async function analizar() {
    if (!archivo || ocupado.current) return
    if (!archivo.name.toLowerCase().endsWith('.pdf') || archivo.size === 0 || archivo.size > 5 * 1024 * 1024) {
      setError('Seleccione un PDF no vacío de hasta 5 MB.'); return
    }
    ocupado.current = true
    setCargando(true); setError('')
    try {
      const resultado = await extraerMateriales(archivo)
      setFilas(resultado.materiales.map(fila => ({ ...fila, id: siguiente.current++, cantidad: fila.cantidad?.toString() ?? '' })))
      setAnalizado(true); setRevisado(false)
    } catch (e) {
      const mensaje = axios.isAxiosError(e) ? e.response?.data?.mensaje : null
      setError(typeof mensaje === 'string' ? mensaje : 'No se pudo completar el análisis. Puede agregar materiales manualmente. No se reintentó automáticamente.')
    } finally { ocupado.current = false; setCargando(false) }
  }

  const validas = filas.length > 0 && filas.every(fila => {
    const cantidad = Number(fila.cantidad)
    const descripcion = `${fila.descripcion?.trim() ?? ''} (Unidad: ${fila.unidad?.trim() ?? ''})`
    return fila.nombre.trim() && fila.descripcion?.trim() && fila.unidad?.trim()
      && Number.isFinite(cantidad) && cantidad >= 0.001 && cantidad <= 999999999.999
      && /^\d+(\.\d{1,3})?$/.test(fila.cantidad) && descripcion.length <= 500
  })

  function confirmar(e: FormEvent) {
    e.preventDefault()
    if (!validas || !revisado || ocupado.current) return
    ocupado.current = true
    onAdd(filas.map(fila => ({
      nombre: fila.nombre.trim(),
      descripcion: `${fila.descripcion!.trim()} (Unidad: ${fila.unidad!.trim()})`,
      cantidad: Number(fila.cantidad), categoria: '',
      observacionesCotizacion: [fila.observaciones?.trim(), fila.referencia ? `Fuente del PDF: ${fila.referencia}` : 'Agregado durante la revisión.'].filter(Boolean).join('\n'),
    })))
    onClose()
  }

  return createPortal(<Modal ref={modal} aria-labelledby="importar-titulo" onCancel={e => {
    e.preventDefault(); if (!ocupado.current) onClose()
  }}>
    <form onSubmit={confirmar}>
      <Title id="importar-titulo">Importar materiales desde PDF</Title>
      <p>El texto se enviará a Claude para preparar una lista. Revísela antes de incorporarla al kit.</p>
      {!analizado && <>
        <Field>PDF con texto seleccionable (máximo 5 MB y 20 páginas)
          <Input type="file" accept=".pdf,application/pdf" disabled={cargando} onChange={e => {
            setArchivo(e.target.files?.[0] ?? null); setError('')
          }} />
        </Field>
        <Actions><SubmitButton type="button" disabled={!archivo || cargando} onClick={analizar}>
          {cargando ? 'Analizando…' : 'Analizar con Claude'}
        </SubmitButton></Actions>
      </>}
      <div role="status" aria-live="polite">{cargando && 'El análisis puede tardar hasta un minuto. Espere sin cerrar esta ventana.'}</div>
      {error && <p role="alert">{error}</p>}
      {analizado && <>
        <p>{filas.length === 0 ? 'No hay materiales en la lista. Puede agregarlos manualmente o cerrar y elegir otro PDF.' : `${filas.length} materiales por revisar. Complete los campos vacíos y verifique las cantidades con el PDF.`}</p>
        {filas.map((fila, indice) => <fieldset key={fila.id}>
          <legend>Material {indice + 1}</legend>
          {fila.advertencias.length > 0 && <p>Revisión pendiente en el resultado original: {fila.advertencias.join(' ')}</p>}
          {fila.referencia && <blockquote><strong>Texto de origen:</strong> {fila.referencia}</blockquote>}
          <Fields>
            <Field>Nombre *<Input required maxLength={120} value={fila.nombre} onChange={e => editar(fila.id, 'nombre', e.target.value)} /></Field>
            <Field>Cantidad *<Input required type="number" min="0.001" max="999999999.999" step="0.001" value={fila.cantidad} onChange={e => editar(fila.id, 'cantidad', e.target.value)} /></Field>
            <Field>Unidad *<Input required maxLength={60} placeholder="Ej. unidad, par, mL" value={fila.unidad ?? ''} onChange={e => editar(fila.id, 'unidad', e.target.value)} /></Field>
            <Field>Descripción *<TextArea required maxLength={400} value={fila.descripcion ?? ''} onChange={e => editar(fila.id, 'descripcion', e.target.value)} /></Field>
            <Field>Observaciones<TextArea maxLength={1200} value={fila.observaciones ?? ''} onChange={e => editar(fila.id, 'observaciones', e.target.value)} /></Field>
          </Fields>
          <CancelButton type="button" onClick={() => { setFilas(prev => prev.filter(item => item.id !== fila.id)); setRevisado(false) }}>Eliminar material {indice + 1}</CancelButton>
        </fieldset>)}
        <CancelButton type="button" disabled={filas.length >= 50} onClick={() => {
          setFilas(prev => [...prev, { id: siguiente.current++, nombre: '', descripcion: '', cantidad: '', unidad: '', observaciones: '', referencia: '', advertencias: [] }]); setRevisado(false)
        }}>Agregar material faltante</CancelButton>
        <p><label><input type="checkbox" checked={revisado} onChange={e => setRevisado(e.target.checked)} /> Revisé todos los materiales y sus cantidades con el documento original.</label></p>
        <p>Se incorporarán como artículos nuevos. Después use «Guardar cambios» para crear su kit personalizado.</p>
      </>}
      <Actions>
        <CancelButton type="button" disabled={cargando} onClick={onClose}>Cancelar</CancelButton>
        {analizado && <SubmitButton type="submit" disabled={!validas || !revisado}>Incorporar {filas.length} materiales</SubmitButton>}
      </Actions>
    </form>
  </Modal>, document.body)
}
