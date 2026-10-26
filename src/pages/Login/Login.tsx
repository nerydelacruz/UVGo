import { useState } from "react"
import { Navigate, useLocation } from "react-router-dom"
import caja from "@/assets/caja_uvgo.png"
import logo from "@/assets/logo.png"
import { homePorRol } from "@/layout/vista"
import { isSesionVigente, useAuthStore } from "@/store/auth.store"
import LoginForm from "./components/LoginForm"
import RegistroForm from "./components/RegistroForm"
import { BackCard, BoxArt, Brand, Card, Orb, Scene, Stage, TabButton, TabList } from "./Login.styles"

type Tab = "login" | "registro"

const Login = () => {
  const [tab, setTab] = useState<Tab>("login")
  const location = useLocation()
  const { token, expiresAt, usuario } = useAuthStore()
  // Ruta que el usuario intentaba abrir antes de que lo mandaran al login
  const from = (location.state as { from?: string } | null)?.from

  // Al iniciar sesión (o si ya había una vigente) se sale del login: a la ruta que quería abrir
  // o al inicio de su rol. Si esa ruta no es de su rol, RequireAuth lo redirige.
  if (isSesionVigente(token, expiresAt)) return <Navigate to={from ?? homePorRol(usuario?.rol)} replace />

  const tabs: Array<{ id: Tab; label: string }> = [
    { id: "login", label: "Iniciar sesión" },
    { id: "registro", label: "Crear cuenta" },
  ]

  return (
    <Scene>
      <Orb tone="green" aria-hidden style={{ width: "62vmax", height: "62vmax", top: "-22vmax", left: "-18vmax" }} />
      <Orb tone="coral" aria-hidden style={{ width: "48vmax", height: "48vmax", top: "18%", right: "-16vmax" }} />
      <Orb tone="sun" aria-hidden style={{ width: "44vmax", height: "44vmax", bottom: "-20vmax", left: "12%" }} />
      <Orb tone="deep" aria-hidden style={{ width: "40vmax", height: "40vmax", bottom: "-18vmax", right: "6%" }} />

      <Brand src={logo} alt="UVGo" />
      <BackCard aria-hidden />

      <Stage>
        <BoxArt src={caja} alt="" placement="front" aria-hidden />

        <Card aria-label="Acceso a UVGo">
          <TabList role="tablist">
            {tabs.map(({ id, label }) => (
              <TabButton
                key={id}
                id={`tab-${id}`}
                type="button"
                role="tab"
                aria-selected={tab === id}
                selected={tab === id}
                onClick={() => setTab(id)}
              >
                {label}
              </TabButton>
            ))}
          </TabList>

          {tab === "login" ? (
            <LoginForm onSwitch={() => setTab("registro")} />
          ) : (
            <RegistroForm onSwitch={() => setTab("login")} />
          )}
        </Card>

        <BoxArt src={caja} alt="" placement="back" aria-hidden />
      </Stage>
    </Scene>
  )
}

export default Login
