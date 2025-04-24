// components/Navbar.jsx
import { useState } from 'react';
import { User, LogOut } from 'lucide-react';
import toast from 'react-hot-toast';

export const Navbar = ({ userData }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 ">
          <div className="flex items-center">
            <span className="text-xl font-semibold text-gray-900">Agent Portal</span>
          </div>
          <div className="flex items-center relative">
            <button 
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <User className="h-6 w-6" />
            </button>
            
            {isProfileOpen && (
              <div className="origin-top-right absolute right-0 mt-48 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                <div className="py-1 px-4">
                  <div className="py-2 border-b">
                    <p className="text-sm font-medium text-gray-900">{userData.name}</p>
                    <p className="text-xs text-gray-500">{userData.email}</p>
                    <p className="text-xs text-gray-500">{userData.role}</p>
                  </div>
                  <button
                    onClick={() => {
                      toast.success('Logged out successfully');
                      setIsProfileOpen(false);
                    }}
                    className="w-full text-left py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};