import {
  LayoutDashboard,
  Users,
  UserCog,
  BarChart3,
  Wallet,
  X,
} from "lucide-react";
import { StoreFunction } from "../../../Store/store";

const Sidebar = ({
  activeTab,
  setActiveTab,
  sidebarOpen,
  mobileSidebarOpen,
  toggleMobileSidebar,
}) => {
  const { setSearchType } = StoreFunction();
  const navItems = [
    { id: "dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { id: "clients", icon: Users, label: "Clients" },
    { id: "agents", icon: UserCog, label: "Agents" },
    { id: "reports", icon: BarChart3, label: "Reports" },
    { id: "commissions", icon: Wallet, label: "Commissions" },
  ];

  return (
    <>
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
          onClick={toggleMobileSidebar}
        ></div>
      )}

      <aside
        className={`fixed z-30 inset-y-0 left-0 transform ${
          mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:relative lg:translate-x-0 transition-all duration-300 ease-in-out 
        w-64 bg-gray-800 overflow-y-auto ${
          sidebarOpen ? "lg:block" : "lg:hidden"
        }`}
      >
        <div className="p-4 flex items-center justify-between border-b border-gray-700">
          <h1 className="text-xl font-bold">Admin Portal</h1>
          <button
            onClick={toggleMobileSidebar}
            className="lg:hidden text-gray-400 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="p-4 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                toggleMobileSidebar();
                setSearchType(item.label.toLowerCase());
              }}
              className={`flex items-center w-full p-3 rounded-lg transition-colors ${
                activeTab === item.id
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-700"
              }`}
            >
              <item.icon className="mr-3" size={18} />
              {item.label}
            </button>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
