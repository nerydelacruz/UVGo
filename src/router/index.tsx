import Dashboard from "@/pages/Kits/Dashboard";
import KitsCatalog from "@/pages/Kits/KitsCatalog";
import KitDetail from "@/pages/KitDetail/KitDetail";
import SeguimientoPedidos from "@/pages/SeguimientoPedidos/SeguimientoPedidos";
import { Layout } from "@/layout";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
    {
        path: '/',
        element:(<Layout/>),
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
                path:'kits',
                element:(<KitsCatalog/>)
            },
            {
                path:'kits/:kitId',
                element:(<KitDetail/>)
            }
        ]

    },
    {
        // Vista de pantalla completa con su propio sidebar, fuera del Layout con TopNavbar
        path:'/seguimiento-pedidos',
        element:(<SeguimientoPedidos/>)
    },

])
