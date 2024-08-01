import { Navigate, useRoutes } from "react-router-dom";
import { lazy } from "react";
import { useSelector } from "react-redux";

import Suspense from "../utils";
import Products from "./dashboard/products/Products";
import Users from "./dashboard/users/Users";
import UserSettings from "./dashboard/user-settings-page/UserSettings";

const Dashboard = lazy(() => import("./dashboard/Dashboard"));
const Home = lazy(() => import("./home/Home"));
const Auth = lazy(() => import("./auth/Auth"));

const Login = lazy(() => import("./auth/login/Login"));
const Register = lazy(() => import("./auth/register/Register"));

const RouteController = ({ searchQuery, onSearch }) => {
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
          <Dashboard searchQuery={searchQuery} onSearch={onSearch} />
        </Suspense>
      ),
      children: [
        {
          path: "",
          element: (
            <Suspense>
              <Products searchQuery={searchQuery} />
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
