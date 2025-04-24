import DataCard from "../ui/DataCard";
import ServicePieChart from "../ui/ServicePieChart";
import { User } from "lucide-react";

const DashboardSection = ({ agents, clients, servicesData }) => {
  const totalCommission = agents.reduce((sum, agent) => sum + agent.commission, 0);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DataCard title="Total Agents" value={agents.length} color="text-blue-400" />
        <DataCard title="Total Clients" value={clients.length} color="text-green-400" />
        <DataCard title="Total Commission" value={`$${totalCommission}`} color="text-purple-400" />
      </div>

      <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
        <h3 className="text-lg font-semibold mb-4">Services Overview</h3>
        <ServicePieChart servicesData={servicesData} clients={clients} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
          <h3 className="text-lg font-semibold mb-4">Recent Clients</h3>
          <div className="space-y-4">
            {clients.slice(0, 5).map((client) => (
              <div key={client.id} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                <div>
                  <h4 className="font-medium">{client.name}</h4>
                  <p className="text-sm text-gray-400">{client.service}</p>
                </div>
                <span className="text-sm bg-gray-600 px-2 py-1 rounded">
                  {client.agent || "Unassigned"}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
          <h3 className="text-lg font-semibold mb-4">Top Agents</h3>
          <div className="space-y-4">
            {agents
              .sort((a, b) => b.clients - a.clients)
              .slice(0, 3)
              .map((agent) => (
                <div key={agent.id} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
                      <User size={16} />
                    </div>
                    <div>
                      <h4 className="font-medium">{agent.name}</h4>
                      <p className="text-sm text-gray-400">
                        {agent.clients} clients
                      </p>
                    </div>
                  </div>
                  <span className="font-bold">${agent.commission}</span>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSection;