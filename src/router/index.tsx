import Kits from "@/pages/Kits/Kits";
import KitDetail from "@/pages/KitDetail/KitDetail";
import { Layout } from "@/layout";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
    {
        path: '/',
        element:(<Layout/>),
        children:[
            {
                path:'home',
                element:(<Kits/>)
            },
            {
                path:'kits',
                element:(<KitDetail/>)
            },
            {
                path:'dashboard',

            }
        ]

    },

])