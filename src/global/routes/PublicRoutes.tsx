import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function PublicRoutes() {
  const { verifyToken } = useAuth();

  return !verifyToken() ? <Outlet /> : <Navigate to="/" />;
}
