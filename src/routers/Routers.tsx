import { RouteObject, createBrowserRouter } from "react-router-dom";
import { Login } from "../../src/pages/Login";
import { DashBoard } from "../components/layout/DashBoard/DashBoard";
import { NotFound } from "../components/common/NotFound/NotFound";
import { Notice } from "../pages/system/Notice";
import { CommonCode } from "../pages/system/CommonCode";

const routers: RouteObject[] = [
    { path: "*", element: <NotFound /> },
    { path: "/", element: <Login /> },
    {
        path: "/react",
        element: <DashBoard />,
        children: [
            {
                path: "system",
                children: [
                    { path: "notice", element: <Notice /> },
                    { path: "code", element: <CommonCode /> },
                ],
            },
        ],
    },
];

export const Routers = createBrowserRouter(routers);
