import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';
import { User, LogOut, Plus, Trash2 } from 'lucide-react';

const AgentPortalPage = () => {
  // State for profile dropdown
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  // State for add client modal
  const [isAddClientOpen, setIsAddClientOpen] = useState(false);
  // State for client form data
  const [clientFormData, setClientFormData] = useState({
    companyName: '',
    companyAddress: '',
    companyCountry: '',
    postalCode: '',
    email: '',
    phoneNumber: '',
    companySize: '',
    industry: { value: '', label: '' },
    marketingGoals: '',
    password: '',
    confirmPassword: '',
    companyLogo: null
  });
  // State for clients data
  const [clients, setClients] = useState([
    {
      id: 1,
      name: 'Acme Corp',
      serviceType: 'Premium',
      status: 'Active',
      joiningDate: '2023-01-15'
    },
    {
      id: 2,
      name: 'Globex Inc',
      serviceType: 'Standard',
      status: 'Active',
      joiningDate: '2023-02-20'
    },
    {
      id: 3,
      name: 'Soylent Corp',
      serviceType: 'Basic',
      status: 'Inactive',
      joiningDate: '2023-03-10'
    }
  ]);

  // Mock user data
  const userData = {
    name: 'John Agent',
    email: 'john.agent@example.com',
    role: 'Senior Agent'
  };

  // Dashboard stats data
  const stats = [
    { title: 'Total Clients', value: 42, change: '+12%' },
    { title: 'Commission Earned', value: '$8,540', change: '+5%' },
    { title: 'Active Subscriptions', value: 36, change: '+3%' },
    { title: 'Canceled Subscriptions', value: 6, change: '-2%' }
  ];

  // Handle client deletion
  const handleDeleteClient = (id) => {
    try {
      // In a real app, you would call an API here
      setClients(clients.filter(client => client.id !== id));
      toast.success('Client deleted successfully');
    } catch (error) {
      toast.error('Failed to delete client');
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setClientFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle file input change
  const handleFileChange = (e) => {
    setClientFormData(prev => ({
      ...prev,
      companyLogo: e.target.files[0]
    }));
  };

  // Handle form submission
  const registerMasterClient = async () => {
    if (
      !clientFormData.companyName.trim() ||
      !clientFormData.companyAddress.trim() ||
      !clientFormData.companyCountry.trim() ||
      !clientFormData.postalCode.trim() ||
      !clientFormData.email.trim() ||
      !clientFormData.phoneNumber.trim() ||
      !clientFormData.companySize.trim() ||
      !clientFormData.industry?.value?.trim() ||
      !clientFormData.marketingGoals.trim()
    ) {
      toast.error('All fields are required.');
      return false;
    }
    if (clientFormData.password !== clientFormData.confirmPassword) {
      toast.error('Password and Confirm Password should be the same.');
      return false;
    }

    // In a real app, you would use the FormData code here
    // For demo purposes, we'll just simulate an API call
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Add new client to the table
      const newClient = {
        id: clients.length + 1,
        name: clientFormData.companyName,
        serviceType: 'Standard',
        status: 'Active',
        joiningDate: new Date().toISOString().split('T')[0]
      };
      
      setClients([...clients, newClient]);
      setIsAddClientOpen(false);
      toast.success('Client registered successfully!');
      
      // Reset form
      setClientFormData({
        companyName: '',
        companyAddress: '',
        companyCountry: '',
        postalCode: '',
        email: '',
        phoneNumber: '',
        companySize: '',
        industry: { value: '', label: '' },
        marketingGoals: '',
        password: '',
        confirmPassword: '',
        companyLogo: null
      });
      
      return true;
    } catch (error) {
      toast.error('Failed to register client');
      return false;
    }
  };

  // Animation variants for cards
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />
      
      {/* Navbar */}
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
              
              {/* Profile dropdown */}
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
                        // Handle logout logic here
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
      
      {/* Dashboard Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-white overflow-hidden shadow rounded-lg"
            >
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                    {/* Icon would go here */}
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      {stat.title}
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">
                        {stat.value}
                      </div>
                      <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                        {stat.change}
                      </div>
                    </dd>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Client Table Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-medium text-gray-900">Clients</h2>
          <button
            onClick={() => setIsAddClientOpen(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Client
          </button>
        </div>
        
        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Client Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Service Type
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Joining Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {clients.map((client) => (
                <tr key={client.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {client.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {client.serviceType}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${client.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {client.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {client.joiningDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleDeleteClient(client.id)}
                      className="text-red-600 hover:text-red-900 flex items-center"
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Add Client Modal */}
      {isAddClientOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75" onClick={() => setIsAddClientOpen(false)}></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div>
                <div className="mt-3 text-center sm:mt-5">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Add New Client</h3>
                  <div className="mt-2">
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 text-left">
                          Company Name
                        </label>
                        <input
                          type="text"
                          name="companyName"
                          id="companyName"
                          value={clientFormData.companyName}
                          onChange={handleInputChange}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 text-left">
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          id="email"
                          value={clientFormData.email}
                          onChange={handleInputChange}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                      </div>
                      <div>
                        <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 text-left">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          name="phoneNumber"
                          id="phoneNumber"
                          value={clientFormData.phoneNumber}
                          onChange={handleInputChange}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                      </div>
                      <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 text-left">
                          Password
                        </label>
                        <input
                          type="password"
                          name="password"
                          id="password"
                          value={clientFormData.password}
                          onChange={handleInputChange}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                      </div>
                      <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 text-left">
                          Confirm Password
                        </label>
                        <input
                          type="password"
                          name="confirmPassword"
                          id="confirmPassword"
                          value={clientFormData.confirmPassword}
                          onChange={handleInputChange}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                      </div>
                      <div>
                        <label htmlFor="companyLogo" className="block text-sm font-medium text-gray-700 text-left">
                          Company Logo
                        </label>
                        <input
                          type="file"
                          name="companyLogo"
                          id="companyLogo"
                          onChange={handleFileChange}
                          className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                <button
                  type="button"
                  onClick={registerMasterClient}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm"
                >
                  Register Client
                </button>
                <button
                  type="button"
                  onClick={() => setIsAddClientOpen(false)}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AgentPortalPage;