import { useRoutes } from "react-router-dom";
import Layout from "../layouts";
import ErrorPage from "../pages/ErrorPage";
import Landing from "../pages/Landing";
import Login from "../pages/Login";
import Register from "../pages/Register";
import FirstPage from "../pages/FirstPage";

function Router() {
  const routes = [
    {
      path: "/",
      element: <Landing />,
    },
    {
      path: "/home",
      element: <FirstPage />,
    },
    {
      path: "/sign-in",
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
      path: "/*",
      element: (
        <Layout className="bg-[#362B19]">
          <ErrorPage />
        </Layout>
      ),
    },
  ];

  return useRoutes(routes);
}

export default Router;
