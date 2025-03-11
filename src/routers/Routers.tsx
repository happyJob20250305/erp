import { RouteObject, createBrowserRouter } from "react-router-dom";
import { Login } from "../../src/pages/Login";
import { DashBoard } from "../components/layout/DashBoard/DashBoard";
import { NotFound } from "../components/common/NotFound/NotFound";
import { Manage } from "../pages/account/Manage";
import { Notice } from "../pages/system/Notice";

import { MySalary } from "../pages/personnel/MySalary";
import { SalaryManager } from "../pages/personnel/SalaryManager";

import { CommonCode } from "../pages/system/CommonCode";
import { DetailCode } from "../pages/system/DetailCode";
import { Department } from "../pages/system/Department";
import { ExpenseList } from "../pages/account/ExpenseList";
import { ExpenseReview } from "../pages/account/ExpenseReview";

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
                path: "account",
                children: [
                    { path: "manage", element: <Manage /> },
                    { path: "expense-list", element: <ExpenseList /> },
                    { path: "expense-review", element: <ExpenseReview /> },
                    { path: "expense-approval", element: <ExpenseReview /> },
                ],
            },
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
                    { path: "code", element: <CommonCode /> },
                    { path: "code/:groupCode", element: <DetailCode /> },
                    { path: "department", element: <Department /> },
                ],
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
