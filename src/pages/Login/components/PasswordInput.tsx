import { useState, type InputHTMLAttributes } from "react"
import { FiEye, FiEyeOff } from "react-icons/fi"
import { Input, InputWrap, ToggleButton } from "../Login.styles"

// Campo de contraseña con botón para mostrarla u ocultarla
const PasswordInput = (props: Omit<InputHTMLAttributes<HTMLInputElement>, "type">) => {
  const [visible, setVisible] = useState(false)

  return (
    <InputWrap>
      <Input {...props} type={visible ? "text" : "password"} data-with-toggle />
      <ToggleButton
        type="button"
        aria-label={visible ? "Ocultar contraseña" : "Mostrar contraseña"}
        aria-pressed={visible}
        onClick={() => setVisible((current) => !current)}
      >
        {visible ? <FiEyeOff size={18} aria-hidden /> : <FiEye size={18} aria-hidden />}
      </ToggleButton>
    </InputWrap>
  )
}

export default PasswordInput
