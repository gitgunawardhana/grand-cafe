import { useRoutes } from "react-router-dom";
import SideMenuLayout from "../layouts/SideMenuLayout";
import SimpleLayout from "../layouts/SimpleLayout";
import TopLayout from "../layouts/TopMenu";
import CustomizePage from "../pages/CustomizePage";
import ErrorPage from "../pages/ErrorPage";
import FirstPage from "../pages/FirstPage";
import Landing from "../pages/Landing";
import Login from "../pages/Login";
import Register from "../pages/Register";
import TestPage from "../pages/TestPage";

function Router() {
  const routes = [
    {
      path: "/",
      element: (
        <TopLayout landing>
          <Landing />
        </TopLayout>
      ),
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
      path: "/custormize-page",
      element: (
        <TopLayout>
          <CustomizePage />
        </TopLayout>
      ),
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
          <TestPage />
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
