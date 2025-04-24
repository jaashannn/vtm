import TableHead from "../table/TableHead";
import TableBody from "../table/TableBody";
import AgentBodyItem from "./AgentBodyItem";

export const AgentsTable = ({
  agents,
  setSelectedAgent,
  setShowAgentModal,
  verifyAgent,
}) => {
  const columns = ["Agent", "Clients", "Commission", "Status", "Actions"];

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-700">
        <TableHead columns={columns} />
        <TableBody isEmpty={agents.length === 0} emptyMessage="No agents found">
          {agents.map((agent) => (
            <AgentBodyItem key={agent._id} agent={agent} />
          ))}
        </TableBody>
      </table>
    </div>
  );
};
