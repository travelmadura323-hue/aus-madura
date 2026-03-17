// components/admin/RequireAuth.tsx
import { Navigate, useLocation } from "react-router-dom";
import { useAdminAccess } from "../../pages/admin/admincontext"; // your admin context

export default function RequireAuth({ children }: { children: React.ReactNode }) {
  const { cameFromAdmin } = useAdminAccess(); // get admin login state from context
  const location = useLocation();

  // if not logged in, redirect to /admin/login
  if (!cameFromAdmin) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  // if logged in, render children (protected page)
  return children;
}