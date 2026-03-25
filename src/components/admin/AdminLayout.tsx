import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, MapPin, Compass, LogOut } from 'lucide-react';
import { useAdminAuth } from '../../contexts/AdminAuthContext';

const AdminLayout = () => {
  const { logout, user } = useAdminAuth();
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Destinations', href: '/admin/destinations', icon: MapPin },
    { name: 'Tours', href: '/admin/tours', icon: Compass },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex pb-16">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg hidden md:flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-gray-200">
          <h1 className="text-xl font-bold text-primary">Admin Panel</h1>
        </div>
        <div className="flex-1 overflow-y-auto py-4">
          <nav className="px-3 space-y-1">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${isActive
                      ? 'bg-primary/10 text-primary'
                      : 'text-gray-700 hover:bg-gray-50'
                    }`}
                >
                  <item.icon
                    className={`mr-3 h-5 w-5 ${isActive ? 'text-primary' : 'text-gray-400'
                      }`}
                  />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center mb-4 px-3">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold mr-3">
              {user?.email?.charAt(0).toUpperCase()}
            </div>
            <div className="text-sm truncate">
              {user?.email}
            </div>
          </div>
          <button
            onClick={logout}
            className="flex items-center w-full px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
          >
            <LogOut className="mr-3 h-5 w-5 text-gray-400" />
            Logout
          </button>
        </div>
      </div>

      {/* Mobile nav (bottom) - optional but good to have a way out */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around p-3 z-50">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={`flex flex-col items-center p-2 rounded-lg ${isActive ? 'text-primary' : 'text-gray-500'
                }`}
            >
              <item.icon className="h-6 w-6" />
              <span className="text-[10px] mt-1">{item.name}</span>
            </Link>
          );
        })}
        <button onClick={logout} className="flex flex-col items-center p-2 rounded-lg text-gray-500">
          <LogOut className="h-6 w-6" />
          <span className="text-[10px] mt-1">Logout</span>
        </button>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <main className="p-4 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
