import Dashboard from "@/pages/Inicio/Dashboard";
import SeguimientoPedidos from "@/pages/SeguimientoPedidos/SeguimientoPedidos";
import CotizarCategoria from "@/pages/CotizarCategoria/CotizarCategoria";
import CotizarInicio from "@/pages/CotizarInicio/CotizarInicio";
import MisSolicitudes from "@/pages/MisSolicitudes/MisSolicitudes";
import AdminHome from "@/pages/Admin/AdminHome";
import Solicitudes from "@/pages/Admin/Solicitudes/Solicitudes";
import Login from "@/pages/Login/Login";
import { Layout } from "@/layout";
import RequireAuth from "@/layout/RequireAuth";
import { Navigate, createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
    {
        // Todo lo que está dentro del Layout requiere sesión
        path: '/',
        element:(<RequireAuth><Layout/></RequireAuth>),
        children:[
            {
                index: true,
                element:(<Dashboard/>)
            },
            {
                path:'dashboard',
                element:(<Dashboard/>)
            },
            {
                path:'seguimiento-pedidos',
                element:(<SeguimientoPedidos/>)
            },
            {
                path:'cotizar',
                element:(<CotizarInicio/>)
            },
            {
                path:'cotizar/:categoria',
                element:(<CotizarCategoria/>)
            },
            {
                path:'mis-solicitudes',
                element:(<MisSolicitudes/>)
            },
            {
                // Vista admin: solo para administradores
                path:'admin',
                element:(<RequireAuth rol="ADMINISTRADOR"><AdminHome/></RequireAuth>)
            },
            {
                path:'admin/solicitudes',
                element:(<RequireAuth rol="ADMINISTRADOR"><Solicitudes/></RequireAuth>)
            }
        ]

    },
    {
        path:'/login',
        element:(<Login/>)
    },
    {
        // Rutas que ya no existen (p. ej. /kits) o mal escritas vuelven al inicio
        path:'*',
        element:(<Navigate to="/" replace/>)
    },

])
