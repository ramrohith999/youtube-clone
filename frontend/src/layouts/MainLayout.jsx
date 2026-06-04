import { useState } from "react";

import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const MainLayout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="min-h-screen">

      <Header toggleSidebar={toggleSidebar} />

      <div className="flex">

        <Sidebar isOpen={isOpen} />

        <main className="flex-1 p-4">
          {children}
        </main>

      </div>

    </div>
  );
};

export default MainLayout;