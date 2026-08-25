import { useEffect, useState } from "react";
import { ClipboardList, AlertTriangle, Clock, CheckCircle2 } from "lucide-react";
import api from "../api/client";
import SummaryCard from "../components/SummaryCard";
import StatusBadge from "../components/StatusBadge";

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get("/tasks/dashboard-stats")
      .then(({ data }) => setStats(data))
      .catch(() => setError("Failed to load dashboard data."))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-slate-500">Loading dashboard...</p>;
  if (error) return <p className="text-coral-dark">{error}</p>;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-display font-semibold text-ink">Dashboard</h1>
        <p className="text-slate-500 text-sm mt-1">Your compliance status at a glance</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <SummaryCard label="Total Requirements" value={stats.totalRequirements} accent="violet" icon={ClipboardList} />
        <SummaryCard label="Overdue Tasks" value={stats.overdue} accent="coral" icon={AlertTriangle} />
        <SummaryCard label="Due This Week" value={stats.dueThisWeek} accent="amber" icon={Clock} />
        <SummaryCard label="Completed This Month" value={stats.completedThisMonth} accent="teal" icon={CheckCircle2} />
      </div>

      <div className="bg-white rounded-2xl shadow-sm ring-1 ring-slate-200/70 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100">
          <h2 className="font-display font-semibold text-ink">Upcoming Deadlines</h2>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-slate-500 border-b border-slate-100">
              <th className="px-6 py-3 font-medium">Requirement</th>
              <th className="px-6 py-3 font-medium">Assigned To</th>
              <th className="px-6 py-3 font-medium">Deadline</th>
              <th className="px-6 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {stats.upcoming.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-slate-400">
                  No upcoming tasks. You're all caught up.
                </td>
              </tr>
            )}
            {stats.upcoming.map((task) => (
              <tr key={task._id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50">
                <td className="px-6 py-3.5 font-medium text-ink">{task.requirement?.title}</td>
                <td className="px-6 py-3.5 text-slate-600">{task.assignedTo?.name}</td>
                <td className="px-6 py-3.5 font-mono-data text-slate-600">
                  {new Date(task.deadline).toLocaleDateString()}
                </td>
                <td className="px-6 py-3.5">
                  <StatusBadge status={task.isOverdue ? "Overdue" : task.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
