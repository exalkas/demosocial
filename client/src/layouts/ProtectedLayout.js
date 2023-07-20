import { useContext } from "react";
import { AppContext } from "../components/Context";
import { Outlet, Navigate, useLocation } from "react-router-dom";

function ProtectedLayout(props) {
  const { state } = useContext(AppContext);

  const location = useLocation();
  console.log("🚀 ~ location:", location);

  if (state.user._id) {
    return <Outlet />;
  }

  // Unsuccessful access
  localStorage.setItem("abandonedAddress", location.pathname);
  return <Navigate to="/" />;
}

export default ProtectedLayout;
