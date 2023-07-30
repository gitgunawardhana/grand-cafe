import { useRoutes } from "react-router-dom";
import SideMenuLayout from "../layouts/SideMenuLayout";
import SimpleLayout from "../layouts/SimpleLayout";
import TopLayout from "../layouts/TopMenu";
import CustomizePage from "../pages/CustomizePage";
import ErrorPage from "../pages/ErrorPage";
import FirstPage from "../pages/FirstPage";
import Landing from "../pages/Landing";
import Login from "../pages/Login";
import ProductPage from "../pages/ProductPage";
import Register from "../pages/Register";
import CustomerAcc from "../pages/CustomerAccount";
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
          {/* <ProductPage /> */}
        </SideMenuLayout>
      ),
    },

    {
      path: "/customer-acc",
      element: (
       <CustomerAcc/>
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
