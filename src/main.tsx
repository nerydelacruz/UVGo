import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from '@emotion/react'
import {BrowserRouter, RouterProvider} from "react-router-dom"
import './index.css'
import { theme } from './styles/theme'
import App from './App.tsx'
import { router } from './router/index.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
        <RouterProvider router={router}/>
    </ThemeProvider>
  </StrictMode>,
)
