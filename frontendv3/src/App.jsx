import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UserLogin from "./pages/UserLogin";
import UserRegister from "./pages/UserRegister";
import FoodPartnerLogin from "./pages/FoodPartnerLogin";
import FoodPartnerRegister from "./pages/FoodPartnerRegister";
import Home from "./pages/Home";
import RootLayout from "./layouts/RootLayout";
import Profile from "./pages/Profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "login",
        element: <UserLogin />,
      },
      {
        path: "register",
        element: <UserRegister />,
      },
      {
        path: "partner/login",
        element: <FoodPartnerLogin />,
      },
      {
        path: "partner/register",
        element: <FoodPartnerRegister />,
      },
      {
        path: "food-partner/:id",
        element: <Profile />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
