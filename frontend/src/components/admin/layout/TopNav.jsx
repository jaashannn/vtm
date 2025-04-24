import { Menu, LogOut, User } from "lucide-react";

const TopNav = ({ 
  activeTab, 
  toggleSidebar, 
  toggleMobileSidebar,
  logoutUser 
}) => {
  return (
    <header className="bg-gray-800 border-b border-gray-700 p-4 flex items-center justify-between">
      <div className="flex items-center">
        <button
          onClick={toggleSidebar}
          className="mr-4 text-gray-400 hover:text-white hidden lg:block"
        >
          <Menu size={20} />
        </button>
        <button
          onClick={toggleMobileSidebar}
          className="mr-4 text-gray-400 hover:text-white lg:hidden"
        >
          <Menu size={20} />
        </button>
        <h2 className="text-lg font-semibold capitalize">{activeTab}</h2>
      </div>
      <div className="flex items-center space-x-4">
        <div className="relative">
          <button className="flex items-center space-x-2 bg-gray-700 hover:bg-gray-600 rounded-full px-3 py-2 transition-colors">
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
              <User size={16} />
            </div>
            <span>Admin</span>
          </button>
        </div>
        <button
          className="text-gray-400 hover:text-white"
          onClick={logoutUser}
        >
          <LogOut size={20} />
        </button>
      </div>
    </header>
  );
};

export default TopNav;