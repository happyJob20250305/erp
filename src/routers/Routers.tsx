import { RouteObject, createBrowserRouter } from "react-router-dom";
import { Login } from "../../src/pages/Login";
import { DashBoard } from "../components/layout/DashBoard/DashBoard";
import { NotFound } from "../components/common/NotFound/NotFound";
import { Manage } from "../pages/account/Manage";
import { Notice } from "../pages/system/Notice";
import { ExpenseList } from "../pages/account/ExpenseList";

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
                path: "account",
                children: [
                    { path: "manage", element: <Manage /> },
                    { path: "expense-list", element: <ExpenseList /> },
                ],
            },
        ],
    },
];

export const Routers = createBrowserRouter(routers);
