import AgentBarChart from "../ui/AgentBarChart";

const ReportsSection = ({ agents, clients, servicesData }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Reports & Analytics</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
          <h3 className="text-lg font-semibold mb-4">Services Distribution</h3>
          <div className="h-64 flex items-center justify-center">
            <div className="relative w-48 h-48 rounded-full flex items-center justify-center bg-gray-700">
              {servicesData.map((service, index) => {
                const percentage = (service.count / clients.length) * 100;
                const rotation = servicesData
                  .slice(0, index)
                  .reduce((sum, s) => sum + (s.count / clients.length) * 360, 0);

                return (
                  <div
                    key={index}
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: `conic-gradient(${service.color} ${rotation}deg, ${service.color} ${
                        rotation + percentage * 3.6
                      }deg, transparent ${rotation + percentage * 3.6}deg)`,
                      clipPath: "circle(50% at 50% 50%)",
                    }}
                  ></div>
                );
              })}
              <div className="absolute w-32 h-32 rounded-full bg-gray-800"></div>
            </div>
          </div>
          <div className="mt-4 flex justify-center">
            <div className="space-y-2">
              {servicesData.map((service, index) => (
                <div key={index} className="flex items-center">
                  <div className={`w-3 h-3 rounded-full ${service.color} mr-2`}></div>
                  <span>
                    {service.name}: {service.count} clients (
                    {Math.round((service.count / clients.length) * 100)}%)
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
          <h3 className="text-lg font-semibold mb-4">Agents Performance</h3>
          <AgentBarChart agents={agents} />
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
        <h3 className="text-lg font-semibold mb-4">Client Acquisition</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Agent</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Web Dev</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">SEO</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Marketing</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Total</th>
              </tr>
            </thead>
            <tbody className="bg-gray-800 divide-y divide-gray-700">
              {agents.map((agent) => {
                const webDevCount = agent.clientsList.filter((c) => c.service === "Web Dev").length;
                const seoCount = agent.clientsList.filter((c) => c.service === "SEO").length;
                const marketingCount = agent.clientsList.filter((c) => c.service === "Marketing").length;

                return (
                  <tr key={agent.id} className="hover:bg-gray-700 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium">{agent.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      {webDevCount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      {seoCount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      {marketingCount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center font-bold">
                      {agent.clients}
                    </td>
                  </tr>
                );
              })}
              <tr className="bg-gray-700 font-bold">
                <td className="px-6 py-4 whitespace-nowrap">Total</td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  {servicesData.find((s) => s.name === "Web Dev")?.count || 0}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  {servicesData.find((s) => s.name === "SEO")?.count || 0}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  {servicesData.find((s) => s.name === "Marketing")?.count || 0}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  {clients.length}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReportsSection;