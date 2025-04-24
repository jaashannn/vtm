import React from "react";
import { Pencil, Trash2 } from "lucide-react";

const ClientBodyItem = ({ client }) => {
  return (
    <tr className="hover:bg-gray-700 transition-colors">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="font-medium">{client.companyName}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-gray-400">
        {client.email?.email}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="px-2 py-1 text-sm rounded-full bg-blue-900 text-blue-200">
          {/* {client.service} */}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        {client.agent ? (
          <span className="text-green-400">{client.agent}</span>
        ) : (
          <span className="text-yellow-400">Direct Client</span>
        )}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
        <button
          onClick={() => {
            setSelectedClient(client);
            setShowAgentModal(true);
          }}
          className="text-blue-400 hover:text-blue-300 mr-3"
        >
          <Pencil size={16} />
        </button>
        <button className="text-red-400 hover:text-red-300">
          <Trash2 size={16} />
        </button>
      </td>
    </tr>
  );
};

export default ClientBodyItem;
