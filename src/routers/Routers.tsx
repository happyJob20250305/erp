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
import { ReceivablesList } from "../pages/sales/ReceivablesList";
import { AttendanceApproval } from "../pages/personnel/AttendanceApproval";
import { AttendanceList } from "../pages/personnel/AttendanceList";
import { VoucherList } from "../pages/account/VoucherList";
import { Employee } from "../pages/personnel/Employee";
import { Promotion } from "../pages/personnel/Promotion";
import { SalesPlanList } from "../pages/business/SalesPlanList";
import { SalesResultList } from "../pages/business/SalesResultList";
import { ClientList } from "../pages/business/ClientList";
import { OrderList } from "../pages/business/OrderList";

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
                    { path: "employee", element: <Employee /> },
                    { path: "promotion", element: <Promotion /> },
                    { path: "attendance-approval", element: <AttendanceApproval /> },
                    { path: "attendance-request", element: <AttendanceRequest /> },
                    { path: "attendance-list", element: <AttendanceList /> },
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
                path: "sales",
                children: [
                    { path: "daily", element: <Daily /> },
                    { path: "monthly", element: <Monthly /> },
                    { path: "annual", element: <Annual /> },
                    { path: "receivables-list", element: <ReceivablesList /> },
                ],
            },
            {
                path: "business",
                children: [
                    { path: "sales-plan", element: <SalesPlanList /> },
                    { path: "sales-list", element: <SalesResultList /> },
                    { path: "client-list", element: <ClientList /> },
                    { path: "order-information-list", element: <OrderList /> },
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
        ],
    },
];

export const Routers = createBrowserRouter(routers);
