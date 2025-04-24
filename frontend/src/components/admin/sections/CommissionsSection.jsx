import React from "react";
import { User } from "lucide-react";
const CommissionsSection = ({ agents }) => {
    const totalCommission = agents.reduce((sum, agent) => sum + agent.commission, 0);
  
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Commission Tracker</h2>
  
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
            <h3 className="text-lg font-semibold mb-2">Total Commission</h3>
            <p className="text-3xl font-bold text-purple-400">
              ${totalCommission}
            </p>
          </div>
          <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
            <h3 className="text-lg font-semibold mb-2">Agents Count</h3>
            <p className="text-3xl font-bold text-blue-400">
              {agents.length}
            </p>
          </div>
          <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
            <h3 className="text-lg font-semibold mb-2">Avg. per Agent</h3>
            <p className="text-3xl font-bold text-green-400">
              ${Math.round(totalCommission / agents.length)}
            </p>
          </div>
        </div>
  
        <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
              <thead className="bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Agent</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Clients</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Commission Rate</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Commission</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-gray-800 divide-y divide-gray-700">
                {agents.map((agent) => (
                  <tr key={agent.id} className="hover:bg-gray-700 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center mr-3">
                          <User size={16} />
                        </div>
                        <div>
                          <div className="font-medium">{agent.name}</div>
                          <div className="text-sm text-gray-400">
                            {agent.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      {agent.clients}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      10%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center font-bold">
                      ${agent.commission}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {agent.verified ? (
                        <span className="px-2 py-1 text-xs rounded-full bg-green-900 text-green-200">
                          Verified
                        </span>
                      ) : (
                        <span className="px-2 py-1 text-xs rounded-full bg-red-900 text-red-200">
                          Unverified
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
  
        <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
          <h3 className="text-lg font-semibold mb-4">Commission Breakdown</h3>
          <div className="space-y-4">
            {agents.map((agent) => (
              <div key={agent.id} className="border border-gray-700 rounded-lg overflow-hidden">
                <div className="bg-gray-700 p-3 flex justify-between items-center">
                  <div className="font-medium">{agent.name}</div>
                  <div className="font-bold">Total: ${agent.commission}</div>
                </div>
                <div className="p-3">
                  <table className="min-w-full divide-y divide-gray-700">
                    <thead>
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Client</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Service</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Commission</th>
                      </tr>
                    </thead>
                    <tbody>
                      {agent.clientsList.map((client, index) => (
                        <tr
                          key={index}
                          className={index % 2 === 0 ? "bg-gray-800" : "bg-gray-750"}
                        >
                          <td className="px-4 py-2 whitespace-nowrap">{client.name}</td>
                          <td className="px-4 py-2 whitespace-nowrap">{client.service}</td>
                          <td className="px-4 py-2 whitespace-nowrap">$100</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  export default CommissionsSection;