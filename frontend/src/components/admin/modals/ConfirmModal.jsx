import { X } from "lucide-react";

const ConfirmModal = ({
  selectedAgent,
  modalAction,
  closeModal,
  handleAgentApproval
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-gray-800 rounded-lg shadow-xl max-w-md w-full">
        <div className="p-4 border-b border-gray-700 flex justify-between items-center">
          <h3 className="text-lg font-semibold">Confirm Action</h3>
          <button
            onClick={closeModal}
            className="text-gray-400 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6">
          <p className="mb-6">
            Are you sure you want to{" "}
            {modalAction === "approve" ? "approve" : "reject"} agent{" "}
            <span className="font-bold">{selectedAgent?.name}</span>?
          </p>

          <div className="flex justify-end space-x-3">
            <button
              onClick={closeModal}
              className="px-4 py-2 border border-gray-600 rounded-lg hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => handleAgentApproval(modalAction === "approve")}
              className={`px-4 py-2 rounded-lg transition-colors ${
                modalAction === "approve"
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-red-600 hover:bg-red-700"
              }`}
            >
              {modalAction === "approve" ? "Approve" : "Reject"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;