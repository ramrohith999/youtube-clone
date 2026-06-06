import { useState, useEffect } from "react";

import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

import { useLocation } from "react-router-dom";

const MainLayout = ({ children, searchTerm, setSearchTerm }) => {

   const location = useLocation();
  const [isOpen, setIsOpen] = useState(
    !location.pathname.startsWith("/video/"),
  );
 

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
  if (
    location.pathname.startsWith("/video/")
  ) {
    setIsOpen(false);
  }
}, [location.pathname]);

  return (
    <div className="min-h-screen">
      <Header
        toggleSidebar={toggleSidebar}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <div className="flex">
        <Sidebar isOpen={isOpen} />

        <main className="flex-1 p-6 bg-gray-50 min-h-[calc(100vh-64px)]">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
