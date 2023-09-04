import { useRoutes } from "react-router-dom";
import PrivateRouteInverse from "../components/PrivateRouteInverse";
import PrivateRoutes from "../components/PrivateRoutes";
import SideMenuLayout from "../layouts/SideMenuLayout";
import SimpleLayout from "../layouts/SimpleLayout";
import TopLayout from "../layouts/TopMenu";
import Cart from "../pages/Cart";
import CustomerAcc from "../pages/CustomerAccount";
import CustomerView from "../pages/CustomerView";
import CustomizePage from "../pages/CustomizePage";
import ErrorPage from "../pages/ErrorPage";
import FirstPage from "../pages/FirstPage";
import HomePage from "../pages/HomePage";
import Landing from "../pages/Landing";
import Login from "../pages/Login";
import ProductDetailsPage from "../pages/ProductDetails";
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
      path: "/cart",
      element: (
        <SideMenuLayout footer>
          <Cart />
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
        // <SideMenuLayout>
        //   <TestPage />
        // </SideMenuLayout>
        <TestPage />
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
    {
      path: `/product/:productName`,
      element: (
        <SideMenuLayout>
          <TopLayout footer>
            <ProductDetailsPage />
          </TopLayout>
        </SideMenuLayout>
      ),
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
      path: `/customize-page/:productName`,
      element: (
        <TopLayout>
          <CustomizePage />
        </TopLayout>
      ),
    },
  ];

  return useRoutes(routes);
}

export default Router;
