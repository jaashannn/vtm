import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Loader2 } from "lucide-react";
import AdminLayout from "../admin/layout/AdminLayout";
import DashboardSection from "../admin/sections/DashboardSection";
import ClientsSection from "../admin/sections/ClientsSection";
import AgentsSection from "../admin/sections/AgentsSection";
import ReportsSection from "../admin/sections/ReportsSection";
import CommissionsSection from "../admin/sections/CommissionsSection";
import AgentClientModal from "../admin/modals/AgentClientModal";
import ConfirmModal from "../admin/modals/ConfirmModal";
import { StoreFunction } from "../../Store/store";

const AdminPortalPage = () => {
  const { logoutUser } = StoreFunction();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [loading, setLoading] = useState(false);

  // Dummy data
  const [agents, setAgents] = useState([
    {
      id: 1,
      name: "John Smith",
      email: "john@example.com",
      clients: 12,
      commission: 1200,
      verified: true,
      pending: false,
      clientsList: [
        { id: 1, name: "Acme Corp", service: "Web Dev" },
        { id: 2, name: "Beta LLC", service: "SEO" },
      ],
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah@example.com",
      clients: 8,
      commission: 800,
      verified: false,
      pending: true,
      clientsList: [{ id: 3, name: "Gamma Inc", service: "SEO" }],
    },
    {
      id: 3,
      name: "Mike Brown",
      email: "mike@example.com",
      clients: 15,
      commission: 1500,
      verified: true,
      pending: false,
      clientsList: [
        { id: 4, name: "Delta Co", service: "Web Dev" },
        { id: 5, name: "Epsilon Ltd", service: "Marketing" },
      ],
    },
  ]);

  const [clients, setClients] = useState([
    {
      id: 1,
      name: "Acme Corp",
      email: "contact@acme.com",
      service: "Web Dev",
      agent: "John Smith",
    },
    {
      id: 2,
      name: "Beta LLC",
      email: "hello@beta.com",
      service: "SEO",
      agent: "John Smith",
    },
    {
      id: 3,
      name: "Gamma Inc",
      email: "info@gamma.com",
      service: "SEO",
      agent: "Sarah Johnson",
    },
    {
      id: 4,
      name: "Delta Co",
      email: "support@delta.com",
      service: "Web Dev",
      agent: "Mike Brown",
    },
    {
      id: 5,
      name: "Epsilon Ltd",
      email: "contact@epsilon.com",
      service: "Marketing",
      agent: "Mike Brown",
    },
    {
      id: 6,
      name: "Zeta Corp",
      email: "hello@zeta.com",
      service: "Web Dev",
      agent: null,
    },
  ]);

  const servicesData = [
    { name: "Web Dev", count: 3, color: "bg-blue-500" },
    { name: "SEO", count: 2, color: "bg-green-500" },
    { name: "Marketing", count: 1, color: "bg-purple-500" },
  ];

  // State for modals
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [selectedClient, setSelectedClient] = useState(null);
  const [showAgentModal, setShowAgentModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [modalAction, setModalAction] = useState(null);

  // Handlers
  const verifyAgent = (agentId) => {
    setLoading(true);
    setTimeout(() => {
      setAgents(
        agents.map((agent) =>
          agent.id === agentId
            ? { ...agent, verified: true, pending: false }
            : agent
        )
      );
      toast.success("Agent Verified Successfully!");
      setLoading(false);
    }, 1000);
  };

  const handleAgentApproval = (approve) => {
    if (!selectedAgent) return;
    setLoading(true);
    setTimeout(() => {
      if (approve) {
        setAgents(
          agents.map((agent) =>
            agent.id === selectedAgent.id
              ? { ...agent, verified: true, pending: false }
              : agent
          )
        );
        toast.success("Agent Approved Successfully!");
      } else {
        setAgents(agents.filter((agent) => agent.id !== selectedAgent.id));
        toast.error("Agent Rejected");
      }
      setShowConfirmModal(false);
      setSelectedAgent(null);
      setLoading(false);
    }, 1000);
  };

  const assignClientToAgent = (clientId, agentId) => {
    setLoading(true);
    setTimeout(() => {
      setClients(
        clients.map((client) =>
          client.id === clientId
            ? {
                ...client,
                agent: agents.find((a) => a.id === agentId)?.name || null,
              }
            : client
        )
      );
      setAgents(
        agents.map((agent) => {
          if (agent.id === agentId) {
            const client = clients.find((c) => c.id === clientId);
            if (client && !agent.clientsList.some((c) => c.id === clientId)) {
              return {
                ...agent,
                clients: agent.clients + 1,
                commission: agent.commission + 100,
                clientsList: [
                  ...agent.clientsList,
                  { id: client.id, name: client.name, service: client.service },
                ],
              };
            }
          }
          return agent;
        })
      );
      toast.success("Client Assigned Successfully!");
      setLoading(false);
      setSelectedClient(null);
    }, 1000);
  };

  const removeClientFromAgent = (clientId, agentId) => {
    setLoading(true);
    setTimeout(() => {
      setClients(
        clients.map((client) =>
          client.id === clientId ? { ...client, agent: null } : client
        )
      );
      setAgents(
        agents.map((agent) => {
          if (agent.id === agentId) {
            return {
              ...agent,
              clients: agent.clients - 1,
              commission: agent.commission - 100,
              clientsList: agent.clientsList.filter((c) => c.id !== clientId),
            };
          }
          return agent;
        })
      );
      toast.success("Client Removed Successfully!");
      setLoading(false);
    }, 1000);
  };

  const closeModal = () => {
    setShowAgentModal(false);
    setShowConfirmModal(false);
    setSelectedAgent(null);
    setSelectedClient(null);
  };

  return (
    <>
      <Toaster position="top-right" />
      <AdminLayout
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        logoutUser={logoutUser}
      >
        {activeTab === "dashboard" && (
          <DashboardSection
            agents={agents}
            clients={clients}
            servicesData={servicesData}
          />
        )}
        {activeTab === "clients" && (
          <ClientsSection
            clients={clients}
            setClients={setClients}
            agents={agents}
            setSelectedClient={setSelectedClient}
            setShowAgentModal={setShowAgentModal}
          />
        )}
        {activeTab === "agents" && (
          <AgentsSection
            agents={agents}
            setAgents={setAgents}
            setSelectedAgent={setSelectedAgent}
            setShowAgentModal={setShowAgentModal}
            setShowConfirmModal={setShowConfirmModal}
            setModalAction={setModalAction}
            verifyAgent={verifyAgent}
          />
        )}
        {activeTab === "reports" && (
          <ReportsSection agents={agents} clients={clients} servicesData={servicesData} />
        )}
        {activeTab === "commissions" && (
          <CommissionsSection agents={agents} />
        )}
      </AdminLayout>

      {showAgentModal && (selectedAgent || selectedClient) && (
        <AgentClientModal
          selectedAgent={selectedAgent}
          selectedClient={selectedClient}
          agents={agents}
          clients={clients}
          closeModal={closeModal}
          assignClientToAgent={assignClientToAgent}
          removeClientFromAgent={removeClientFromAgent}
        />
      )}

      {showConfirmModal && selectedAgent && (
        <ConfirmModal
          selectedAgent={selectedAgent}
          modalAction={modalAction}
          closeModal={closeModal}
          handleAgentApproval={handleAgentApproval}
        />
      )}

      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Loader2 className="animate-spin text-white" size={48} />
        </div>
      )}
    </>
  );
};

export default AdminPortalPage;