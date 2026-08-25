import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import api from "../api/client";
import StatusBadge from "../components/StatusBadge";

export default function RequirementDetail() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/requirements/${id}`).then(({ data }) => setData(data)).finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="text-slate-500">Loading...</p>;
  if (!data) return <p className="text-coral-dark">Requirement not found.</p>;

  const { requirement, tasks } = data;

  return (
    <div>
      <Link to="/requirements" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-violet mb-6">
        <ArrowLeft size={16} /> Back to Requirements
      </Link>

      <div className="bg-white rounded-2xl shadow-sm ring-1 ring-slate-200/70 p-6 mb-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-violet/10 text-violet">
            {requirement.category}
          </span>
          <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600">
            {requirement.frequency}
          </span>
        </div>
        <h1 className="text-xl font-display font-semibold text-ink">{requirement.title}</h1>
        <p className="text-slate-600 text-sm mt-2">{requirement.description || "No description provided."}</p>
        <p className="text-xs text-slate-400 mt-4">Created by {requirement.createdBy?.name}</p>
      </div>

      <h2 className="font-display font-semibold text-ink mb-3">Linked Tasks</h2>
      <div className="bg-white rounded-2xl shadow-sm ring-1 ring-slate-200/70 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-slate-500 border-b border-slate-100">
              <th className="px-6 py-3 font-medium">Assigned To</th>
              <th className="px-6 py-3 font-medium">Deadline</th>
              <th className="px-6 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {tasks.length === 0 && (
              <tr><td colSpan={3} className="px-6 py-8 text-center text-slate-400">No tasks linked yet.</td></tr>
            )}
            {tasks.map((task) => (
              <tr key={task._id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50">
                <td className="px-6 py-3.5 text-ink font-medium">{task.assignedTo?.name}</td>
                <td className="px-6 py-3.5 font-mono-data text-slate-600">
                  {new Date(task.deadline).toLocaleDateString()}
                </td>
                <td className="px-6 py-3.5"><StatusBadge status={task.isOverdue ? "Overdue" : task.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
