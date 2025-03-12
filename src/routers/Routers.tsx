import { RouteObject, createBrowserRouter } from "react-router-dom";
import { Login } from "../../src/pages/Login";
import { DashBoard } from "../components/layout/DashBoard/DashBoard";
import { NotFound } from "../components/common/NotFound/NotFound";
import { Manage } from "../pages/account/Manage";
import { Notice } from "../pages/system/Notice";
import { Daily } from "../pages/sales/Daily";
import { Monthly } from "../pages/sales/Monthly";
import { CommonCode } from "../pages/system/CommonCode";
import { DetailCode } from "../pages/system/DetailCode";
import { Department } from "../pages/system/Department";

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
                    { path: "code/:groupCode", element: <DetailCode /> },
                    { path: "department", element: <Department /> },
                ],
            },

            {
                path: "sales",
                children: [
                    { path: "daily", element: <Daily /> },
                    { path: "monthly", element: <Monthly /> },
                ],
            },
            {
                path: "account",
                children: [{ path: "manage", element: <Manage /> }],
            },
        ],
    },
];

export const Routers = createBrowserRouter(routers);
