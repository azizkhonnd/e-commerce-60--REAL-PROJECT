import { Navigate, useRoutes } from "react-router-dom";
import { lazy } from "react";
import { useSelector } from "react-redux";

import Suspense from "../utils";
import Products from "./dashboard/products/Products";
import Users from "./dashboard/users/Users";
import UserSettings from "./dashboard/user-settings-page/UserSettings";
import CartPage from "../routes/cart-page/CartPage";

const Dashboard = lazy(() => import("./dashboard/Dashboard"));
const Home = lazy(() => import("./home/Home"));
const Auth = lazy(() => import("./auth/Auth"));
const SingleProduct = lazy(() => import("../routes/single-page/SingleProduct"));

const Login = lazy(() => import("./auth/login/Login"));
const Register = lazy(() => import("./auth/register/Register"));

const RouteController = () => {
  const auth = useSelector((state) => state?.token);
  return useRoutes([
    {
      path: "",
      element: (
        <Suspense>
          <Home />
        </Suspense>
      ),
    },
    {
      path: "product/:id",
      element: (
        <Suspense>
          <SingleProduct />
        </Suspense>
      ),
    },
    {
      path: "cart",
      element: (
        <Suspense>
          <CartPage />
        </Suspense>
      ),
    },
    {
      path: "auth",
      element: auth ? (
        <Navigate to="/dashboard" />
      ) : (
        <Suspense>
          <Auth />
        </Suspense>
      ),
      children: [
        {
          path: "",
          element: (
            <Suspense>
              <Login />
            </Suspense>
          ),
        },
        {
          path: "register",
          element: (
            <Suspense>
              <Register />
            </Suspense>
          ),
        },
      ],
    },
    {
      path: "dashboard",
      element: (
        <Suspense>
          <Dashboard />
        </Suspense>
      ),
      children: [
        {
          path: "",
          element: (
            <Suspense>
              <Products />
            </Suspense>
          ),
        },
        {
          path: "users",
          element: (
            <Suspense>
              <Users />
            </Suspense>
          ),
        },
        {
          path: "user-settings",
          element: (
            <Suspense>
              <UserSettings />
            </Suspense>
          ),
        },
      ],
    },
  ]);
};

export default RouteController;
