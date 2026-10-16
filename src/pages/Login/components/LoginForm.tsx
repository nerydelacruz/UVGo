import axios from "axios"
import { useState, type FormEvent } from "react"
import { FiAlertCircle } from "react-icons/fi"
import { useLogin } from "@/hooks/useAuth"
import { ErrorText } from "@/styles/shared.styles"
import { getErrorMessage } from "@/utilities/apiError"
import { Field, Form, Input, Submit, Switch } from "../Login.styles"
import PasswordInput from "./PasswordInput"

interface LoginFormProps {
  onSwitch: () => void
}

const mensajeError = (error: unknown) =>
  axios.isAxiosError(error) && error.response?.status === 401
    ? "Correo o contraseña incorrectos."
    : getErrorMessage(error, "No pudimos iniciar sesión. Intenta de nuevo.")

const LoginForm = ({ onSwitch }: LoginFormProps) => {
  const login = useLogin()
  const [correo, setCorreo] = useState("")
  const [contrasena, setContrasena] = useState("")

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    login.mutate({ correo: correo.trim(), contrasena })
  }

  return (
    <Form onSubmit={handleSubmit} aria-labelledby="tab-login">
      <Field>
        Correo institucional
        <Input
          type="email"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          placeholder="usuario@uvg.edu.gt"
          autoComplete="username"
          required
          autoFocus
        />
      </Field>

      <Field>
        Contraseña
        <PasswordInput
          value={contrasena}
          onChange={(e) => setContrasena(e.target.value)}
          placeholder="Tu contraseña"
          autoComplete="current-password"
          required
        />
      </Field>

      {login.isError && (
        <ErrorText role="alert">
          <FiAlertCircle size={14} aria-hidden />
          {mensajeError(login.error)}
        </ErrorText>
      )}

      <Submit type="submit" disabled={login.isPending || !correo.trim() || !contrasena}>
        {login.isPending ? "Entrando…" : "Iniciar sesión"}
      </Submit>

      <Switch>
        ¿No tienes cuenta?{" "}
        <button type="button" onClick={onSwitch}>
          Crea una
        </button>
      </Switch>
    </Form>
  )
}

export default LoginForm
