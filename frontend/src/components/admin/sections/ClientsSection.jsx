// components/ClientsSection.jsx
import { useEffect } from "react";
import { Search } from "lucide-react";
import { StoreFunction } from "../../../Store/store";
import { ClientsTable } from "./ClientTable";

const ClientsSection = ({ setSelectedClient, setShowAgentModal }) => {
  const {
    setSearchQuery,
    searchQuery,
    getAllUsers,
    setUserList,
    userList,
    token,
    searchType
  } = StoreFunction();

  const getClients = async () => {
    try {
      const response = await getAllUsers(searchQuery);
      const data = await response.json();
      setUserList(data.result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getClients();
  }, [token, searchQuery, searchType]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-2xl font-bold">Client Management</h2>
        <div className="relative w-full md:w-64">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Search clients..."
            className="w-full pl-10 pr-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <ClientsTable 
          clients={userList} 
          setSelectedClient={setSelectedClient}
          setShowAgentModal={setShowAgentModal}
        />
      </div>
    </div>
  );
};

export default ClientsSection;