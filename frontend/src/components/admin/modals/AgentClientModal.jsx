import { X, User, CheckCircle2, AlertCircle } from "lucide-react";

const AgentClientModal = ({
  selectedAgent,
  selectedClient,
  agents,
  clients,
  closeModal,
  assignClientToAgent,
  removeClientFromAgent
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-fadeIn">
        <div className="p-4 border-b border-gray-700 flex justify-between items-center">
          <h3 className="text-lg font-semibold">
            {selectedAgent ? "Agent Details" : "Client Details"}
          </h3>
          <button
            onClick={closeModal}
            className="text-gray-400 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6">
          {selectedAgent && (
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center">
                  <User size={24} />
                </div>
                <div>
                  <h4 className="text-xl font-bold">{selectedAgent.name}</h4>
                  <p className="text-gray-400">{selectedAgent.email}</p>
                  <div className="mt-1">
                    {selectedAgent.verified ? (
                      <span className="px-2 py-1 text-xs rounded-full bg-green-900 text-green-200 inline-flex items-center">
                        <CheckCircle2 className="mr-1" size={12} /> Verified
                      </span>
                    ) : selectedAgent.pending ? (
                      <span className="px-2 py-1 text-xs rounded-full bg-yellow-900 text-yellow-200 inline-flex items-center">
                        <AlertCircle className="mr-1" size={12} /> Pending Approval
                      </span>
                    ) : (
                      <span className="px-2 py-1 text-xs rounded-full bg-red-900 text-red-200 inline-flex items-center">
                        <AlertCircle className="mr-1" size={12} /> Unverified
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-semibold mb-2">Agent Statistics</h5>
                  <div className="bg-gray-700 rounded-lg p-4 space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Total Clients:</span>
                      <span className="font-bold">{selectedAgent.clients}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Total Commission:</span>
                      <span className="font-bold">${selectedAgent.commission}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Commission Rate:</span>
                      <span className="font-bold">10% per client</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h5 className="font-semibold mb-2">Services Distribution</h5>
                  <div className="bg-gray-700 rounded-lg p-4">
                    {selectedAgent.clientsList.length > 0 ? (
                      <div className="space-y-2">
                        {Array.from(
                          new Set(selectedAgent.clientsList.map((c) => c.service))
                        ).map((service, index) => (
                          <div key={index}>
                            <div className="flex justify-between text-sm mb-1">
                              <span>{service}</span>
                              <span>
                                {
                                  selectedAgent.clientsList.filter(
                                    (c) => c.service === service
                                  ).length
                                } clients
                              </span>
                            </div>
                            <div className="w-full bg-gray-600 rounded-full h-2">
                              <div
                                className="bg-blue-500 h-2 rounded-full"
                                style={{
                                  width: `${
                                    (selectedAgent.clientsList.filter(
                                      (c) => c.service === service
                                    ).length /
                                      selectedAgent.clients) *
                                    100
                                  }%`,
                                }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-400 text-sm">
                        No clients assigned yet
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <h5 className="font-semibold mb-2">Assigned Clients</h5>
                {selectedAgent.clientsList.length > 0 ? (
                  <div className="bg-gray-700 rounded-lg overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-600">
                      <thead className="bg-gray-600">
                        <tr>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                            Client
                          </th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                            Service
                          </th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-600">
                        {selectedAgent.clientsList.map((client) => (
                          <tr key={client.id}>
                            <td className="px-4 py-2 whitespace-nowrap">
                              {client.name}
                            </td>
                            <td className="px-4 py-2 whitespace-nowrap">
                              <span className="px-2 py-1 text-xs rounded-full bg-blue-900 text-blue-200">
                                {client.service}
                              </span>
                            </td>
                            <td className="px-4 py-2 whitespace-nowrap">
                              <button
                                onClick={() =>
                                  removeClientFromAgent(
                                    client.id,
                                    selectedAgent.id
                                  )
                                }
                                className="text-red-400 hover:text-red-300 text-sm"
                              >
                                Remove
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="bg-gray-700 rounded-lg p-4 text-center text-gray-400">
                    No clients assigned to this agent
                  </div>
                )}
              </div>
            </div>
          )}

          {selectedClient && (
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 rounded-full bg-purple-500 flex items-center justify-center">
                  <User size={24} />
                </div>
                <div>
                  <h4 className="text-xl font-bold">{selectedClient.name}</h4>
                  <p className="text-gray-400">{selectedClient.email}</p>
                  <div className="mt-1">
                    <span className="px-2 py-1 text-xs rounded-full bg-blue-900 text-blue-200">
                      {selectedClient.service}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-semibold mb-2">Client Information</h5>
                  <div className="bg-gray-700 rounded-lg p-4 space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Email:</span>
                      <span>{selectedClient.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Service:</span>
                      <span>{selectedClient.service}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Assigned Agent:</span>
                      <span>
                        {selectedClient.agent ? (
                          <span className="text-green-400">
                            {selectedClient.agent}
                          </span>
                        ) : (
                          <span className="text-yellow-400">
                            Unassigned
                          </span>
                        )}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h5 className="font-semibold mb-2">Assign to Agent</h5>
                  <div className="bg-gray-700 rounded-lg p-4">
                    {agents.length > 0 ? (
                      <div className="space-y-3">
                        <select
                          className="w-full bg-gray-600 border border-gray-500 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          defaultValue=""
                        >
                          <option value="" disabled>
                            Select an agent
                          </option>
                          {agents.map((agent) => (
                            <option key={agent.id} value={agent.id}>
                              {agent.name}
                            </option>
                          ))}
                        </select>
                        <button
                          onClick={() => {
                            const select = document.querySelector("select");
                            if (select && select.value) {
                              assignClientToAgent(
                                selectedClient.id,
                                parseInt(select.value)
                              );
                            }
                          }}
                          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors"
                        >
                          Assign Client
                        </button>
                      </div>
                    ) : (
                      <p className="text-gray-400 text-sm">
                        No agents available
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="p-4 border-t border-gray-700 flex justify-end space-x-3">
          <button
            onClick={closeModal}
            className="px-4 py-2 border border-gray-600 rounded-lg hover:bg-gray-700 transition-colors"
          >
            Cancel
          </button>
          <button className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default AgentClientModal;