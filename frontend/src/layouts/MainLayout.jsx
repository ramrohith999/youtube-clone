import { useState, useEffect } from "react";

import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

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
    if (location.pathname.startsWith("/video/")) {
      setIsOpen(false);
    }
  }, [location.pathname]);

  return (
    <div
      className="
        min-h-screen
        bg-gray-100
        text-gray-900
        dark:bg-gray-900
        dark:text-white
        transition-colors
        duration-300
      "
    >
      <Header
        toggleSidebar={toggleSidebar}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <div className="flex">
        <Sidebar isOpen={isOpen} />

        <div className="flex-1 flex flex-col">
          <main
            className="
        flex-1
        p-6
        bg-gray-50
        dark:bg-gray-950
        min-h-[calc(100vh-64px)]
      "
          >
            {children}
          </main>

          <Footer />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
