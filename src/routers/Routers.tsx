import { RouteObject, createBrowserRouter } from "react-router-dom";
import { CommonCode } from "../../src/pages/management/CommonCode";
import { Login } from "../../src/pages/Login";
import { Notice } from "../../src/pages/management/Notice";
import { DashBoard } from "../components/layout/DashBoard/DashBoard";
import { NotFound } from "../components/common/NotFound/NotFound";
import { DetailCode } from "../pages/management/DetailCode";
import { Shopping } from "../pages/tasks/Shopping";
import { Orders } from "../pages/tasks/Orders";
import { Products } from "../pages/mall/Products";
import { ApprovalOrder } from "../pages/approval/orders";
import { ApprovalShoppingReturn } from "../pages/approval/shoppingReturn";
import { ShoppingReturnList } from "../pages/trade/shoppingReturnList";
import { OrdersReturnList } from "../pages/tasks/OrdersReturnList";
import { ShoppingReturn } from "../pages/tasks/ShoppingReturn";
import { OrdersList } from "../pages/tasks/OrdersList";

const routers: RouteObject[] = [
    { path: "*", element: <NotFound /> },
    { path: "/", element: <Login /> },
    {
        path: "/react",
        element: <DashBoard />,
        children: [
            {
                path: "trade",
                children: [
                    {
                        path: "shopping-return-list",
                        element: <ShoppingReturnList />,
                    },
                ],
            },
            {
                path: "approval",
                children: [
                    {
                        path: "orders",
                        element: <ApprovalOrder />,
                    },
                    {
                        path: "shopping-return",
                        element: <ApprovalShoppingReturn />,
                    },
                ],
            },
            {
                path: "management",
                children: [
                    {
                        path: "notice",
                        element: <Notice />,
                    },
                    {
                        path: "common-code",
                        element: <CommonCode />,
                    },
                    {
                        path: "common-code/:groupIdx",
                        element: <DetailCode />,
                    },
                ],
            },
            {
                path: "tasks",
                children: [
                    {
                        path: "shopping",
                        element: <Shopping />,
                    },
                    {
                        path: "orders",
                        element: <Orders />,
                    },
                    {
                        path: "shopping-return",
                        element: <ShoppingReturn />,
                    },
                    {
                        path: "orders-list",
                        element: <OrdersList />,
                    },
                ],
            },
        ],
    },
    {
        path: "/react",
        element: <DashBoard />,
        children: [
            {
                path: "mall",
                children: [
                    {
                        path: "products",
                        element: <Products />,
                    },
                ],
            },
        ],
    },
];

export const Routers = createBrowserRouter(routers);
