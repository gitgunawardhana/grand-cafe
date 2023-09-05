import { Navigate, Outlet } from "react-router-dom";

function PrivateRouteInverse() {
  const auth = { token: sessionStorage.getItem("accessToken") };
  return !auth.token ? <Outlet /> : <Navigate to="/home" />;
}

export default PrivateRouteInverse;
