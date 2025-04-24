import React from "react";
import { Pencil, User } from "lucide-react";
import StatusBadge from "../ui/StatusBadge";
const AgentBodyItem = ({agent}) => {
  return (
    <tr key={agent._id} className="hover:bg-gray-700 transition-colors">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center mr-3">
            <User size={16} />
          </div>
          <div>
            <div className="font-medium">{agent.name}</div>
            <div className="text-sm text-gray-400">{agent.email?.email}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-center">{agent.clients?.length}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="font-bold">${agent.totalCommissionMade}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <StatusBadge status={agent.verified ? "verified" : "unverified"} />
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
        {!agent.verified && (
          <button
            onClick={() => verifyAgent(agent._id)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm mr-2 transition-colors"
          >
            Verify
          </button>
        )}

        <button
          onClick={() => {
            setSelectedAgent(agent);
            setShowAgentModal(true);
          }}
          className="ml-2 text-blue-400 hover:text-blue-300"
        >
          <Pencil size={16} />
        </button>
      </td>
    </tr>
  );
};

export default AgentBodyItem;
