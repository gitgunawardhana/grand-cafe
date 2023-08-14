import { useRoutes } from "react-router-dom";
import SideMenuLayout from "../layouts/SideMenuLayout";
import SimpleLayout from "../layouts/SimpleLayout";
import TopLayout from "../layouts/TopMenu";
import CustomizePage from "../pages/CustomizePage";
import ErrorPage from "../pages/ErrorPage";
import FirstPage from "../pages/FirstPage";
import HomePage from "../pages/HomePage";
import Landing from "../pages/Landing";
import Login from "../pages/Login";
import ProductPage from "../pages/ProductPage";
import RecipeGenerator from "../pages/RecipeGenerator";
import Register from "../pages/Register";
import TableBooking from "../pages/TableBooking";
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
      element: (
        <TopLayout footer>
          <HomePage />
        </TopLayout>
      ),
    },
    {
      path: "/first",
      element: <FirstPage />,
    },
    {
      path: "/sign-in",
      element: <Login />,
    },
    {
      path: "/customize-page",
      element: (
        <TopLayout>
          <CustomizePage />
        </TopLayout>
      ),
    },
    {
      path: "/product-page",
      element: (
        <SideMenuLayout footer>
          <ProductPage />
        </SideMenuLayout>
      ),
    },
    {
      path: "/recipe-generator",
      element: (
        <SideMenuLayout className="!px-0">
          <RecipeGenerator />
        </SideMenuLayout>
      ),
    },
    {
      path: "/table-booking",
      element: (
        <SideMenuLayout className="!px-10">
          <TableBooking />
        </SideMenuLayout>
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
