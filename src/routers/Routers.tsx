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
import { AttendanceRequest } from "../pages/personnel/AttendanceRequest";
import { ExpenseList } from "../pages/account/ExpenseList";
import { ExpenseReview } from "../pages/account/ExpenseReview";
import { AttendanceApproval } from "../pages/personnel/AttendanceApproval";
import { VoucherList } from "../pages/account/VoucherList";
import { ClientList } from "../pages/business/ClientList";

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
                    { path: "attendance-approval", element: <AttendanceApproval /> },
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
                    { path: "voucher-list", element: <VoucherList /> },
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
                path: "business",
                children: [{ path: "client-list", element: <ClientList /> }],
            },
        ],
    },
];

export const Routers = createBrowserRouter(routers);
