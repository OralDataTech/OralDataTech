import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export function ProtectedRoutesAdmin() {
  const { isAdmin } = useAuth();
  return isAdmin() ? <Outlet /> : <Navigate to={"/"} />;
}

export function ProtectedRoutesTeacher() {
  const { isAdmin, isTeacher } = useAuth();
  return isAdmin() || isTeacher() ? <Outlet /> : <Navigate to={"/"} />;
}
