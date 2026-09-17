# UVGo — Frontend

Sistema de gestión de pedidos y entrega de materiales académicos (CC2008 Programación Orientada a Objetos, UVG). Este repo contiene el frontend: React + TypeScript + Vite.

## Stack

- **Datos del servidor**: TanStack Query (caché, invalidación, mutaciones) — no Redux.
- **Estado de cliente** (sesión, UI): Zustand, en `store/`.
- **Diseño**: styled-components, con tokens centralizados en `styled-components/theme.ts`.
- **Ruteo**: React Router.
- **Formularios**: React Hook Form + Zod.
- Alias de imports: `@/` apunta a `src/` (configurado en `vite.config.ts` y `tsconfig.app.json`).

## Estructura de `src/`

Organización por tipo, siguiendo capas de Clean Architecture (de adentro hacia afuera):

| Carpeta | Contiene |
|---|---|
| `models/` | Tipos de dominio puros (entidades: `Pedido`, `Cotizacion`, `Pago`, `EstadoPedido`...). Sin dependencias hacia afuera. |
| `adapters/` | Funciones puras que traducen el JSON del backend (DTO) hacia `models/`, y viceversa. |
| `services/` | Llamadas HTTP puras por recurso, usando el cliente de `interceptors/`. |
| `interceptors/` | Instancia de axios + interceptores (JWT, manejo de 401). |
| `hooks/` | Hooks de TanStack Query (`useQuery`/`useMutation`) por acción de negocio, usando `services/` + `adapters/`. |
| `store/` | Estado global de cliente con Zustand (sesión, UI). No datos del servidor. |
| `contexts/` | React Context solo para UI transversal que no justifica Zustand (ej. modales, toasts). |
| `components/` | Componentes reutilizables entre pantallas. |
| `pages/` | Una por pantalla (nivel de ruta): Login, RegistroPedido, SeguimientoPedido, PanelAdmin, etc. |
| `styled-components/` | Sistema de diseño: `theme.ts`, `GlobalStyle.ts`, primitivos (`Button`, `Input`...). |
| `utilities/` | Funciones puras compartidas (formatos, validadores). |

Regla de dependencia: `pages`/`components` → `hooks`/`contexts`/`store` → `services`/`adapters` → `models`. Nunca al revés.

## Desarrollo

```bash
pnpm install
pnpm dev
```
