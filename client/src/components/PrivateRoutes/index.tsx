import { Navigate, Outlet } from "react-router-dom";

function PrivateRoutes() {
  const auth = { token: sessionStorage.getItem("accessToken") };
  return auth.token ? <Outlet /> : <Navigate to="/" />;
}

export default PrivateRoutes;
