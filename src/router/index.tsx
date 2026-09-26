import Dashboard from "@/pages/Kits/Dashboard";
import KitDetail from "@/pages/KitDetail/KitDetail";
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
                element:(<KitDetail/>)
            },
            {
                path:'kits/:kitId',
                element:(<KitDetail/>)
            }
        ]

    },

])