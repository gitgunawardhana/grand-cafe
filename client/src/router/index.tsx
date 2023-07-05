import { useRoutes } from "react-router-dom";
import Layout from "../layouts/index";
import ErrorPage from "../pages/ErrorPage";
import Landing from "../pages/Landing";
import Login from "../pages/Login";
import Register from "../pages/Register";

function Router() {
  const routes = [
    {
      path: "/",
      element: (
        <Layout>
          <Landing />
        </Layout>
      ),
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
