import { useEffect, useMemo, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import api from "../api/client";

const COLORS = { Pending: "#94a3b8", "In Progress": "#7c3aed", Completed: "#14b8a6", Overdue: "#fb7185" };

export default function Reports() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/tasks").then(({ data }) => setTasks(data)).finally(() => setLoading(false));
  }, []);

  const chartData = useMemo(() => {
    const counts = { Pending: 0, "In Progress": 0, Completed: 0, Overdue: 0 };
    tasks.forEach((t) => {
      const status = t.isOverdue ? "Overdue" : t.status;
      counts[status] = (counts[status] || 0) + 1;
    });
    return Object.entries(counts)
      .filter(([, value]) => value > 0)
      .map(([name, value]) => ({ name, value }));
  }, [tasks]);

  const complianceRate = useMemo(() => {
    if (tasks.length === 0) return 0;
    const completed = tasks.filter((t) => t.status === "Completed").length;
    return Math.round((completed / tasks.length) * 100);
  }, [tasks]);

  if (loading) return <p className="text-slate-500">Loading report data...</p>;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-display font-semibold text-ink">Reports</h1>
        <p className="text-slate-500 text-sm mt-1">Compliance overview across all tracked tasks</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl shadow-sm ring-1 ring-slate-200/70 p-6 flex flex-col items-center justify-center">
          <p className="text-sm text-slate-500 font-medium mb-2">Overall Compliance Rate</p>
          <p className="text-5xl font-display font-semibold bg-gradient-to-r from-teal to-violet bg-clip-text text-transparent">
            {complianceRate}%
          </p>
          <p className="text-xs text-slate-400 mt-2">{tasks.length} total tasks tracked</p>
        </div>

        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm ring-1 ring-slate-200/70 p-6">
          <p className="text-sm font-medium text-slate-700 mb-4">Task Status Breakdown</p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={chartData} dataKey="value" nameKey="name" innerRadius={55} outerRadius={85} paddingAngle={3}>
                  {chartData.map((entry) => (
                    <Cell key={entry.name} fill={COLORS[entry.name]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
