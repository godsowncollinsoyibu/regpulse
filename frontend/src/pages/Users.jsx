import { useEffect, useState } from "react";
import { Plus, X } from "lucide-react";
import api from "../api/client";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "Officer" });
  const [saving, setSaving] = useState(false);

  const load = () => {
    setLoading(true);
    api.get("/users").then(({ data }) => setUsers(data)).finally(() => setLoading(false));
  };

  useEffect(load, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.post("/users", form);
      setShowModal(false);
      setForm({ name: "", email: "", password: "", role: "Officer" });
      load();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to create user.");
    } finally {
      setSaving(false);
    }
  };

  const toggleActive = async (user) => {
    setUsers((prev) => prev.map((u) => (u._id === user._id ? { ...u, isActive: !u.isActive } : u)));
    try {
      await api.put(`/users/${user._id}`, { isActive: !user.isActive });
    } catch {
      load();
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-display font-semibold text-ink">Users</h1>
          <p className="text-slate-500 text-sm mt-1">Manage compliance team members and access</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-teal to-violet text-white text-sm font-medium hover:opacity-90 transition-opacity"
        >
          <Plus size={16} /> Add User
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm ring-1 ring-slate-200/70 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-slate-500 border-b border-slate-100">
              <th className="px-6 py-3 font-medium">Name</th>
              <th className="px-6 py-3 font-medium">Email</th>
              <th className="px-6 py-3 font-medium">Role</th>
              <th className="px-6 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr><td colSpan={4} className="px-6 py-8 text-center text-slate-400">Loading...</td></tr>
            )}
            {users.map((u) => (
              <tr key={u._id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50">
                <td className="px-6 py-3.5 font-medium text-ink">{u.name}</td>
                <td className="px-6 py-3.5 text-slate-600">{u.email}</td>
                <td className="px-6 py-3.5">
                  <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-violet/10 text-violet">{u.role}</span>
                </td>
                <td className="px-6 py-3.5">
                  <button
                    onClick={() => toggleActive(u)}
                    className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      u.isActive ? "bg-teal/10 text-teal-dark" : "bg-coral/10 text-coral-dark"
                    }`}
                  >
                    {u.isActive ? "Active" : "Deactivated"}
                  </button>
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
              <h2 className="font-display font-semibold text-lg text-ink">New User</h2>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-ink">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Full Name</label>
                <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal/50 text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Email</label>
                <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal/50 text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Temporary Password</label>
                <input required type="password" minLength={6} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal/50 text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Role</label>
                <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal/50 text-sm">
                  <option value="Officer">Officer</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>
              <button type="submit" disabled={saving}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-teal to-violet text-white text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50">
                {saving ? "Saving..." : "Create User"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
