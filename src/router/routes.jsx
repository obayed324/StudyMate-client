import { createBrowserRouter } from "react-router";
import HomeLayOut from "../Layouts/HomeLayOut";
import Home from "../Pages/Home/Home";
import AuthLayout from "../Layouts/AuthLayout";
import Registration from "../Pages/Auth/Registration";
import Login from "../Pages/Auth/Login";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayOut></HomeLayOut>,
    children:[
      {
        path:"/",
        element:<Home></Home>
      }
    ]
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "/auth/login",
        element: <Login></Login>
      },
      {
        path: "/auth/register",
        element: <Registration></Registration>
      },
      // {
      //   path:"/auth/forget-password",
      //   element:<ForgetPassword></ForgetPassword>
      // }
    ]
  },
]);
