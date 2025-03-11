import { RouteObject, createBrowserRouter } from "react-router-dom";
import { Login } from "../../src/pages/Login";
import { DashBoard } from "../components/layout/DashBoard/DashBoard";
import { NotFound } from "../components/common/NotFound/NotFound";
import { Manage } from "../pages/account/Manage";
import { Notice } from "../pages/system/Notice";
import { ExpenseList } from "../pages/account/ExpenseList";
import { MySalary } from "../pages/personnel/MySalary";
import { SalaryManager } from "../pages/personnel/SalaryManager";
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
                path: "account",
                children: [
                    { path: "manage", element: <Manage /> },
                    { path: "expense-list", element: <ExpenseList /> },
                ],
            },
            {
                path: "system",
                children: [{ path: "notice", element: <Notice /> }],
            },
            {
                path: "personnel",
                children: [
                    { path: "salary-list", element: <MySalary /> },
                    { path: "salary-manage", element: <SalaryManager /> },

                    { path: "notice", element: <Notice /> },
                    { path: "code", element: <CommonCode /> },
                    { path: "code/:groupCode", element: <DetailCode /> },
                    { path: "department", element: <Department /> },
                ],
            },
        ],
    },
];

export const Routers = createBrowserRouter(routers);
