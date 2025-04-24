import { useState } from "react";
import Sidebar from "./Sidebar";
import TopNav from "./TopNav";

const AdminLayout = ({ children, activeTab, setActiveTab, logoutUser }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const toggleMobileSidebar = () => setMobileSidebarOpen(!mobileSidebarOpen);

  return (
    <div className="flex h-screen bg-gray-900 text-gray-100">
      <Sidebar 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        sidebarOpen={sidebarOpen}
        mobileSidebarOpen={mobileSidebarOpen}
        toggleMobileSidebar={toggleMobileSidebar}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNav 
          activeTab={activeTab}
          toggleSidebar={toggleSidebar}
          toggleMobileSidebar={toggleMobileSidebar}
          logoutUser={logoutUser}
        />
        <main className="flex-1 overflow-y-auto p-4 bg-gray-900">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;