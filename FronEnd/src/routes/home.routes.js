import { lazy } from "react";
import { Redirect } from "react-router-dom";
// layouts
import HomeLayout from "../layouts/home";

// ----------------------------------------------------------------------

const HomeRoutes = {
  path: "*",
  layout: HomeLayout,
  routes: [
    {
      exact: true,
      path: "/",
      component: lazy(() => import("../views/home")),
    },
    {
      exact: true,
      path: "/product/:id",
      component: lazy(() => import("../views/productPage")),
    },

    // ----------------------------------------------------------------------

    {
      component: () => <Redirect to="/404" />,
    },
  ],
};

export default HomeRoutes;
