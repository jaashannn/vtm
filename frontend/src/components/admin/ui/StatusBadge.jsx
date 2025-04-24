import { CheckCircle2, AlertCircle } from "lucide-react";

const StatusBadge = ({ status }) => {
  if (status === "verified") {
    return (
      <span className="px-2 py-1 text-xs rounded-full bg-green-900 text-green-200 flex items-center w-fit">
        <CheckCircle2 className="mr-1" size={14} /> Verified
      </span>
    );
  } else if (status === "pending") {
    return (
      <span className="px-2 py-1 text-xs rounded-full bg-yellow-900 text-yellow-200 flex items-center w-fit">
        <AlertCircle className="mr-1" size={14} /> Pending
      </span>
    );
  } else {
    return (
      <span className="px-2 py-1 text-xs rounded-full bg-red-900 text-red-200 flex items-center w-fit">
        <AlertCircle className="mr-1" size={14} /> Unverified
      </span>
    );
  }
};

export default StatusBadge;