// components/ClientsTable.jsx
import TableHead from "../table/TableHead";
import TableBody from "../table/TableBody";
import ClientBodyItem from "./ClientBodyItem";


export const ClientsTable = ({ 
  clients, 
  setSelectedClient, 
  setShowAgentModal 
}) => {
  const columns = ['Client', 'Email', 'Service', 'Agent', 'Actions'];

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-700">
        <TableHead columns={columns} />
        <TableBody 
          isEmpty={clients.length === 0} 
          emptyMessage="No clients found"
        >
          {clients.map((client) => (
            <ClientBodyItem key={client._id} client={client} />
          ))}
        </TableBody>
      </table>
    </div>
  );
};

