import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { selectUserRole } from "../../../Redux/AuthSlice";

export default function ProtectedRoute({ allowedRoles }: { allowedRoles: string[] }) {
  const role = useSelector(selectUserRole);

  if (!role) {
    return <Navigate to="/login" replace />;
  }

  return allowedRoles.includes(role) ? <Outlet /> : <Navigate to="/unauthorized" replace />;
}

