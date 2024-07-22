/* eslint-disable no-unused-vars */
import { useRoutes } from "react-router-dom"
import { lazy } from "react";

import Suspense, { Loading } from "../utils";
import Products from "./dashboard/products/Products";
import Users from "./dashboard/users/Users";

const Dashboard = lazy(() => import("./dashboard/Dashboard"))
const Private = lazy(() => import("./private/Private"))


const Home = lazy(() => import("./home/Home"))
const Auth = lazy(() => import("./auth/Auth"))

const Login = lazy(() => import("./auth/login/Login"));
const Register = lazy(() => import("./auth/register/Register"));


const RouteController = () => {

  return useRoutes([
    {
      path: "",
      element: <Suspense><Home /></Suspense>
    },
    {
      path: "auth",
      element: <Suspense><Auth /></Suspense>,
      children: [
        {
          path: "",
          element: <Suspense><Login /></Suspense>
        },
        {
          path: "register",
          element: <Suspense> <Register /></Suspense>
        }
      ]
    },
    {
      path: 'dashboard',
      element: <Suspense><Private /></Suspense>,
      children: [
        {
          path: '',
          element: <Suspense><Products /></Suspense>
        },
        {
          path: 'users',
          element: <Suspense><Users /></Suspense>
        }
      ]
    }
  ])
}

export default RouteController