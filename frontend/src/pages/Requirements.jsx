import { useEffect, useState } from "react";
import { Plus, X } from "lucide-react";
import { Link } from "react-router-dom";
import api from "../api/client";

const CATEGORIES = ["Data Protection", "Licensing", "Reporting", "Anti-Money Laundering", "Tax", "Other"];
const FREQUENCIES = ["One-time", "Monthly", "Quarterly", "Annually"];

export default function Requirements() {
  const [requirements, setRequirements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ title: "", description: "", category: "Other", frequency: "One-time" });
  const [saving, setSaving] = useState(false);

  const load = () => {
    setLoading(true);
    api.get("/requirements").then(({ data }) => setRequirements(data)).finally(() => setLoading(false));
  };

  useEffect(load, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.post("/requirements", form);
      setShowModal(false);
      setForm({ title: "", description: "", category: "Other", frequency: "One-time" });
      load();
    } catch {
      alert("Failed to create requirement.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-display font-semibold text-ink">Requirements</h1>
          <p className="text-slate-500 text-sm mt-1">Regulatory obligations your organization must meet</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-teal to-violet text-white text-sm font-medium hover:opacity-90 transition-opacity"
        >
          <Plus size={16} /> Add Requirement
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm ring-1 ring-slate-200/70 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-slate-500 border-b border-slate-100">
              <th className="px-6 py-3 font-medium">Title</th>
              <th className="px-6 py-3 font-medium">Category</th>
              <th className="px-6 py-3 font-medium">Frequency</th>
              <th className="px-6 py-3 font-medium">Created</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr><td colSpan={4} className="px-6 py-8 text-center text-slate-400">Loading...</td></tr>
            )}
            {!loading && requirements.length === 0 && (
              <tr><td colSpan={4} className="px-6 py-8 text-center text-slate-400">No requirements yet. Add your first one.</td></tr>
            )}
            {requirements.map((req) => (
              <tr key={req._id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50">
                <td className="px-6 py-3.5">
                  <Link to={`/requirements/${req._id}`} className="font-medium text-ink hover:text-violet transition-colors">
                    {req.title}
                  </Link>
                </td>
                <td className="px-6 py-3.5">
                  <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-violet/10 text-violet">
                    {req.category}
                  </span>
                </td>
                <td className="px-6 py-3.5 text-slate-600">{req.frequency}</td>
                <td className="px-6 py-3.5 font-mono-data text-slate-500">
                  {new Date(req.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-ink/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-display font-semibold text-lg text-ink">New Requirement</h2>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-ink">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Title</label>
                <input
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal/50 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Description</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  rows={3}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal/50 text-sm"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Category</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal/50 text-sm"
                  >
                    {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Frequency</label>
                  <select
                    value={form.frequency}
                    onChange={(e) => setForm({ ...form, frequency: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal/50 text-sm"
                  >
                    {FREQUENCIES.map((f) => <option key={f} value={f}>{f}</option>)}
                  </select>
                </div>
              </div>
              <button
                type="submit"
                disabled={saving}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-teal to-violet text-white text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save Requirement"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
