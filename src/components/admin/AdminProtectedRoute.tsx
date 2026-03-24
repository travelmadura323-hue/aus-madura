import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAdminAuth } from '../../contexts/AdminAuthContext';
import { AlertCircle } from 'lucide-react';

const AdminProtectedRoute = ({ children }: { children?: React.ReactNode }) => {
  const { user, isAdmin, loading, logout } = useAdminAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
        <div className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-gray-100 text-center max-w-lg">
          <div className="w-20 h-20 bg-red-50 text-red-500 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="w-10 h-10" />
          </div>
          <h1 className="text-3xl font-black text-gray-900 mb-4 tracking-tight">Access Restricted</h1>
          <p className="text-gray-500 mb-8 leading-relaxed">
            Your account <span className="font-bold text-gray-900 italic">({user.email})</span> does not have administrative privileges for this dashboard.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
              <button 
                onClick={logout} 
                className="flex-1 bg-red-600 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl shadow-red-200 hover:scale-[1.02] transition-all"
              >
                Sign Out
              </button>
              <Navigate to="/" replace /> {/* Fallback if they try to stay */}
          </div>
        </div>
      </div>
    );
  }

  return children ? <>{children}</> : <Outlet />;
};

export default AdminProtectedRoute;
