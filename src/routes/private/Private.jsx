import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const Private = () => {
  const auth = useSelector((state) => state.token);

  return auth.token ? <Outlet /> : <Navigate to="/auth" />;
};

export default Private;
