import axios from "axios"
import { useState, type FormEvent } from "react"
import { FiAlertCircle } from "react-icons/fi"
import { useRegistro } from "@/hooks/useAuth"
import type { RegistroRequest } from "@/models/auth.model"
import { ErrorText } from "@/styles/shared.styles"
import { getErrorMessage } from "@/utilities/apiError"
import { Field, Form, Hint, Input, Row, Submit, Switch } from "../Login.styles"
import PasswordInput from "./PasswordInput"

// Mismas reglas que valida el backend (AuthDtos.Registro)
const MIN_CONTRASENA = 12

interface RegistroFormProps {
  onSwitch: () => void
}

const mensajeError = (error: unknown) =>
  axios.isAxiosError(error) && error.response?.status === 409
    ? "Ya existe una cuenta con ese correo. Inicia sesión."
    : getErrorMessage(error, "No pudimos crear tu cuenta. Revisa los datos e intenta de nuevo.")

const RegistroForm = ({ onSwitch }: RegistroFormProps) => {
  const registro = useRegistro()
  const [datos, setDatos] = useState<Required<RegistroRequest>>({
    nombre: "",
    correo: "",
    telefono: "",
    carne: "",
    carrera: "",
    contrasena: "",
  })

  const set = (campo: keyof RegistroRequest) => (e: { target: { value: string } }) =>
    setDatos((current) => ({ ...current, [campo]: e.target.value }))

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    registro.mutate(
      {
        nombre: datos.nombre.trim(),
        correo: datos.correo.trim(),
        telefono: datos.telefono.trim(),
        carne: datos.carne.trim(),
        contrasena: datos.contrasena,
        // carrera es opcional: no se envía vacía
        ...(datos.carrera.trim() ? { carrera: datos.carrera.trim() } : {}),
      },
    )
  }

  return (
    <Form onSubmit={handleSubmit} aria-labelledby="tab-registro">
      <Field>
        Nombre completo
        <Input value={datos.nombre} onChange={set("nombre")} autoComplete="name" maxLength={120} required autoFocus />
      </Field>

      <Field>
        Correo institucional
        <Input
          type="email"
          value={datos.correo}
          onChange={set("correo")}
          placeholder="usuario@uvg.edu.gt"
          autoComplete="email"
          maxLength={254}
          required
        />
        <Hint>Solo se aceptan correos @uvg.edu.gt</Hint>
      </Field>

      <Row>
        <Field>
          Teléfono
          <Input
            type="tel"
            value={datos.telefono}
            onChange={set("telefono")}
            placeholder="5555 0000"
            autoComplete="tel"
            pattern="[+0-9 ()\-]{8,25}"
            title="Entre 8 y 25 dígitos; se permiten +, espacios, paréntesis y guiones"
            required
          />
        </Field>
        <Field>
          Carné
          <Input
            value={datos.carne}
            onChange={set("carne")}
            inputMode="numeric"
            pattern="[0-9]{4,30}"
            title="Solo números (mínimo 4)"
            required
          />
        </Field>
      </Row>

      <Field>
        <span>
          Carrera <Hint>(opcional)</Hint>
        </span>
        <Input value={datos.carrera} onChange={set("carrera")} maxLength={120} />
      </Field>

      <Field>
        Contraseña
        <PasswordInput
          value={datos.contrasena}
          onChange={set("contrasena")}
          placeholder={`Al menos ${MIN_CONTRASENA} caracteres`}
          autoComplete="new-password"
          minLength={MIN_CONTRASENA}
          maxLength={72}
          required
        />
      </Field>

      {registro.isError && (
        <ErrorText role="alert">
          <FiAlertCircle size={14} aria-hidden />
          {mensajeError(registro.error)}
        </ErrorText>
      )}

      <Submit type="submit" disabled={registro.isPending}>
        {registro.isPending ? "Creando cuenta…" : "Crear cuenta"}
      </Submit>

      <Switch>
        ¿Ya tienes cuenta?{" "}
        <button type="button" onClick={onSwitch}>
          Inicia sesión
        </button>
      </Switch>
    </Form>
  )
}

export default RegistroForm
