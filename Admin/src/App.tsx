import React, { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import LoadingSpinner from "./components/UI/loadingSpinner/LoadingSpinner";
import AuthLayout from "./layout/AuthLayout";
import MainLayout from "./layout/MainLayout";
import "./scss/App.scss";

const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const CustomerUsers = React.lazy(() => import("./pages/CustomerUsers"));
const CustomerEdit = React.lazy(() => import("./pages/CustomerEdit"));
const CustomerUserEdit = React.lazy(() => import("./pages/CustomerUserEdit"));
const Products = React.lazy(() => import("./pages/Products"));
const ProductEdit = React.lazy(() => import("./pages/ProductEdit"));
const NotFound = React.lazy(() => import("./pages/NotFound"));
const BlankPage = React.lazy(() => import("./pages/BlankPage"));
const Booking = React.lazy(() => import("./pages/Booking"));
const Login = React.lazy(() => import("./pages/Login"));
const ProductAdd = React.lazy(() => import("./pages/AddProduct"));
const Category = React.lazy(() => import("./pages/Category"));
const Inventory = React.lazy(() => import("./pages/Inventory"));
const AddInventory = React.lazy(() => import("./pages/AddInventory"));
const EditInventory = React.lazy(() => import("./pages/InventoryEdit"));
const Orders = React.lazy(() => import("./pages/Order"));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route element={<AuthLayout />}>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="/customers" element={<CustomerUsers />} />
              <Route path="/customers/:customerId" element={<CustomerEdit />} />
              <Route
                path="/customer-user/:customerUserId"
                element={<CustomerUserEdit />}
              />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:productId" element={<ProductEdit />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/bookings" element={<Booking />} />
              <Route path="/discount" element={<BlankPage />} />
              <Route path="/addproduct" element={<ProductAdd />} />
              <Route path="/category" element={<Category />} />
              <Route path="/inventory" element={<Inventory />} />
              <Route path="/addinventory" element={<AddInventory />} />
              <Route
                path="/inventory/:InventoryId"
                element={<EditInventory />}
              />
            </Route>
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
