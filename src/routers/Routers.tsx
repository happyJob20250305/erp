import { RouteObject, createBrowserRouter } from "react-router-dom";
import { Login } from "../../src/pages/Login";
import { DashBoard } from "../components/layout/DashBoard/DashBoard";
import { NotFound } from "../components/common/NotFound/NotFound";
import { Notice } from "../pages/system/Notice";
import { Sales } from "../pages/business/Sales";
import { Client } from "../pages/business/Client";

const routers: RouteObject[] = [
    { path: "*", element: <NotFound /> },
    { path: "/", element: <Login /> },
    {
        path: "/react",
        element: <DashBoard />,
        children: [
            {
                path: "system",
                children: [{ path: "notice", element: <Notice /> }],
            },
            {
                path: "business",
                children: [
                    { path: "sales-plan", element: <Sales /> },
                    { path: "client-list", element: <Client /> },
                ],
            },
        ],
    },
];

export const Routers = createBrowserRouter(routers);
