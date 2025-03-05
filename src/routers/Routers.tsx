import { RouteObject, createBrowserRouter } from "react-router-dom";

import { CommonCode } from "../../src/pages/management/CommonCode";
import { Login } from "../../src/pages/Login";
import { Notice } from "../../src/pages/management/Notice";
import { DashBoard } from "../components/layout/DashBoard/DashBoard";
import { NotFound } from "../components/common/NotFound/NotFound";
import { DetailCode } from "../pages/management/DetailCode";
import { Products } from "../pages/mall/Products";

const routers: RouteObject[] = [
    { path: "*", element: <NotFound /> },
    { path: "/", element: <Login /> },
    {
        path: "/react",
        element: <DashBoard />,
        children: [
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
                        element: <Products />
                    },
                ],
            },
        ],
    },
];

export const Routers = createBrowserRouter(routers);
