import { useRoutes } from "react-router-dom";
import PrivateRouteInverse from "../components/PrivateRouteInverse";
import PrivateRoutes from "../components/PrivateRoutes";
import SideMenuLayout from "../layouts/SideMenuLayout";
import SimpleLayout from "../layouts/SimpleLayout";
import TopLayout from "../layouts/TopMenu";
import CustomerAcc from "../pages/CustomerAccount";
import CustomerView from "../pages/CustomerView";
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
      element: <PrivateRoutes />,
      children: [
        {
          path: "/customize-page",
          element: (
            <TopLayout>
              <CustomizePage />
            </TopLayout>
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
          path: "/customer-acc",
          element: (
            <SideMenuLayout footer>
              <CustomerAcc />
            </SideMenuLayout>
          ),
        },
        {
          path: "/customer-view",
          element: (
            <SideMenuLayout footer>
              <CustomerView />
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
      ],
    },
    {
      element: <PrivateRouteInverse />,
      children: [
        {
          path: "/",
          element: (
            <TopLayout landing>
              <Landing />
            </TopLayout>
          ),
        },
        {
          path: "/sign-in",
          element: <Login />,
        },
        {
          path: "/sign-up",
          element: <Register />,
        },
        {
          path: "/register",
          element: <Register />,
        },
      ],
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
      path: "/product-page",
      element: (
        <SideMenuLayout footer>
          <ProductPage />
        </SideMenuLayout>
      ),
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
