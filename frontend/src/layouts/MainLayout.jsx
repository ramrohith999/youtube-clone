import { useState } from "react";

import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const MainLayout = ({ children, searchTerm, setSearchTerm }) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="min-h-screen">
      <Header
        toggleSidebar={toggleSidebar}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <div className="flex">
        <Sidebar isOpen={isOpen} />

        <main
          className="flex-1 p-6 bg-gray-50 min-h-[calc(100vh-64px)]"
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
