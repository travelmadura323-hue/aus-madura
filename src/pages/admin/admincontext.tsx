import { createContext, useContext, useState, ReactNode } from "react";

interface AdminContextType {
  cameFromAdmin: boolean;
  setCameFromAdmin: (val: boolean) => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider = ({ children }: { children: ReactNode }) => {
  const [cameFromAdmin, setCameFromAdmin] = useState(false);

  return (
    <AdminContext.Provider value={{ cameFromAdmin, setCameFromAdmin }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdminAccess = () => {
  const context = useContext(AdminContext);
  if (!context) throw new Error("useAdminAccess must be used within AdminProvider");
  return context;
};