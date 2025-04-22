import React, { createContext, useState, useContext } from 'react';

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [adminData, setAdminData] = useState(null);

  const updateAdminData = (data) => setAdminData(data);

  return (
    <AdminContext.Provider value={{ adminData, updateAdminData }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);