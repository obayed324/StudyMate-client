import { createBrowserRouter } from "react-router";
import HomeLayOut from "../Layouts/HomeLayOut";
import Home from "../Pages/Home/Home";
import AuthLayout from "../Layouts/AuthLayout";
import Registration from "../Pages/Auth/Registration";
import Login from "../Pages/Auth/Login";
import FindAllPartners from "../Pages/FindAllPartners/FindAllPartners";
import PartnerDetails from "../Pages/PartnerDetails/PartnerDetails";
import PrivateRoute from "./PrivateRoute";
import CreatePartner from "../Pages/CreatePartner/CreatePartner";
import MyConnections from "../Pages/MyConnections/MyConnections";


const allPartnersLoader = async () => {
  const res = await fetch('http://localhost:3000/partners');
  return res.json();
};


const partnerDetailsLoader = async ({ params }) => {
  const res = await fetch(`http://localhost:3000/partners/${params.id}`);
  return res.json();
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayOut />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/allPartner",
        element: (
          <FindAllPartners />
        ),
        loader: allPartnersLoader
      },
      {
        path: "/partner/:id",
        element: (
          <PrivateRoute>
            <PartnerDetails />
          </PrivateRoute>
        ),
        loader: partnerDetailsLoader
      },
      {
        path: "/create-profile",
        element: (
          <PrivateRoute>
            <CreatePartner />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-connections",
        element: (
          <PrivateRoute>
            <MyConnections />
          </PrivateRoute>
        ),
      }


    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "/auth/login",
        element: <Login />,
      },
      {
        path: "/auth/register",
        element: <Registration />,
      },
    ],
  },
]);
