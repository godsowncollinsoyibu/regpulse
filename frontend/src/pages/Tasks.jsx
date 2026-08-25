import { useEffect, useState } from "react";
import api from "../api/client";
import StatusBadge from "../components/StatusBadge";

const STATUSES = ["Pending", "In Progress", "Completed"];

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("");

  const load = () => {
    setLoading(true);
    const params = statusFilter ? { status: statusFilter } : {};
    api.get("/tasks", { params }).then(({ data }) => setTasks(data)).finally(() => setLoading(false));
  };

  useEffect(load, [statusFilter]);

  const updateStatus = async (id, status) => {
    setTasks((prev) => prev.map((t) => (t._id === id ? { ...t, status } : t)));
    try {
      await api.patch(`/tasks/${id}/status`, { status });
    } catch {
      load();
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-display font-semibold text-ink">Tasks</h1>
          <p className="text-slate-500 text-sm mt-1">Track and update compliance task progress</p>
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal/50"
        >
          <option value="">All statuses</option>
          {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
          <option value="Overdue">Overdue</option>
        </select>
      </div>

      <div className="bg-white rounded-2xl shadow-sm ring-1 ring-slate-200/70 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-slate-500 border-b border-slate-100">
              <th className="px-6 py-3 font-medium">Requirement</th>
              <th className="px-6 py-3 font-medium">Assigned To</th>
              <th className="px-6 py-3 font-medium">Deadline</th>
              <th className="px-6 py-3 font-medium">Status</th>
              <th className="px-6 py-3 font-medium">Update</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr><td colSpan={5} className="px-6 py-8 text-center text-slate-400">Loading...</td></tr>
            )}
            {!loading && tasks.length === 0 && (
              <tr><td colSpan={5} className="px-6 py-8 text-center text-slate-400">No tasks found.</td></tr>
            )}
            {tasks.map((task) => (
              <tr key={task._id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50">
                <td className="px-6 py-3.5 font-medium text-ink">{task.requirement?.title}</td>
                <td className="px-6 py-3.5 text-slate-600">{task.assignedTo?.name}</td>
                <td className="px-6 py-3.5 font-mono-data text-slate-600">
                  {new Date(task.deadline).toLocaleDateString()}
                </td>
                <td className="px-6 py-3.5">
                  <StatusBadge status={task.isOverdue ? "Overdue" : task.status} />
                </td>
                <td className="px-6 py-3.5">
                  <select
                    value={task.status}
                    onChange={(e) => updateStatus(task._id, e.target.value)}
                    className="px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-teal/50"
                  >
                    {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
