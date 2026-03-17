import { useAdminAccess } from "../pages/admin/admincontext";
import { Navigate } from "react-router-dom";

export default function ProtectedAdminPage({ children }: { children: React.ReactNode }) {
  const { cameFromAdmin } = useAdminAccess();

  if (!cameFromAdmin) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
}