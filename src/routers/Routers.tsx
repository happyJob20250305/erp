import { RouteObject, createBrowserRouter } from "react-router-dom";
import { Login } from "../../src/pages/Login";
import { DashBoard } from "../components/layout/DashBoard/DashBoard";
import { NotFound } from "../components/common/NotFound/NotFound";
import { Notice } from "../pages/system/Notice";
import { MySalary } from "../pages/personnel/MySalary";
import { SalaryManager } from "../pages/personnel/SalaryManager";

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
                path: "personnel",
                children: [
                    { path: "salary-list", element: <MySalary /> },
                    { path: "salary-manage", element: <SalaryManager /> },
                ],
            },
        ],
    },
];

export const Routers = createBrowserRouter(routers);
