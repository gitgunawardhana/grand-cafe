import { useRoutes } from "react-router-dom";
import ErrorPage from "../pages/ErrorPage";
import Landing from "../pages/Landing";
import Login from "../pages/Login";
import Register from "../pages/Register";

function Router() {
  const routes = [
    {
      path: "/",
      element: <Landing />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/error-page",
      element: <ErrorPage />,
    },
    {
      path: "*",
      element: <ErrorPage />,
    },
  ];

  return useRoutes(routes);
}

export default Router;
