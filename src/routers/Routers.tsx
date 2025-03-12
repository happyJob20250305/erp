import { RouteObject, createBrowserRouter } from "react-router-dom";
import { Login } from "../../src/pages/Login";
import { DashBoard } from "../components/layout/DashBoard/DashBoard";
import { NotFound } from "../components/common/NotFound/NotFound";
import { Manage } from "../pages/account/Manage";
import { Notice } from "../pages/system/Notice";
import { Daily } from "../pages/sales/Daily";
import { Monthly } from "../pages/sales/Monthly";
import { MySalary } from "../pages/personnel/MySalary";
import { SalaryManager } from "../pages/personnel/SalaryManager";
import { CommonCode } from "../pages/system/CommonCode";
import { DetailCode } from "../pages/system/DetailCode";
import { Department } from "../pages/system/Department";
import { AttendanceRequest } from "../pages/personnel/AttendanceRequest";
import { ExpenseList } from "../pages/account/ExpenseList";
import { ExpenseReview } from "../pages/account/ExpenseReview";
import { Annual } from "../pages/sales/Annual";

const routers: RouteObject[] = [
    { path: "*", element: <NotFound /> },
    { path: "/", element: <Login /> },
    {
        path: "/react",
        element: <DashBoard />,
        children: [
            {
                path: "personnel",
                children: [
                    { path: "attendance-request", element: <AttendanceRequest /> },
                    { path: "salary-manage", element: <SalaryManager /> },
                    { path: "salary-list", element: <MySalary /> },
                ],
            },
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
                path: "sales",
                children: [
                    { path: "daily", element: <Daily /> },
                    { path: "monthly", element: <Monthly /> },
                    { path: "annual", element: <Annual /> },
                ],
            },
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
                path: "account",
                children: [{ path: "manage", element: <Manage /> }],
            },
        ],
    },
];

export const Routers = createBrowserRouter(routers);
