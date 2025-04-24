import { User } from "lucide-react";

const AgentBarChart = ({ agents }) => {
  return (
    <div className="h-64">
      <div className="h-full flex items-end space-x-4">
        {agents.map((agent, index) => {
          const maxClients = Math.max(...agents.map((a) => a.clients));
          const height = (agent.clients / maxClients) * 100;

          return (
            <div key={index} className="flex flex-col items-center flex-1">
              <div
                className={`w-full ${
                  index % 2 === 0 ? "bg-blue-500" : "bg-green-500"
                } rounded-t-lg transition-all duration-500`}
                style={{ height: `${height}%` }}
              ></div>
              <div className="text-xs mt-2 text-center truncate w-full">
                {agent.name.split(" ")[0]}
              </div>
              <div className="text-xs text-gray-400">
                {agent.clients}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AgentBarChart;