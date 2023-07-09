import { useRoutes } from "react-router-dom";
import SideMenuLayout from "../layouts/SideMenuLayout";
import SimpleLayout from "../layouts/SimpleLayout";
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
      path: "/test",
      element: (
        <SideMenuLayout>
          <h1 className="text-5xl font-extrabold text-gradient-yellow-900">
            Test Page
          </h1>
        </SideMenuLayout>
      ),
    },
    {
      path: "/*",
      element: (
        <SimpleLayout className="bg-[#362B19]">
          <ErrorPage />
        </SimpleLayout>
      ),
    },
  ];

  return useRoutes(routes);
}

export default Router;
