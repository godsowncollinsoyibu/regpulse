import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import PulseLogo from "../components/PulseLogo";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-ink via-ink-light to-violet/40 p-4">
      <div className="w-full max-w-sm">
        <div className="flex justify-center mb-8">
          <div className="[&_span]:text-white [&_.text-violet]:text-violet-light scale-125">
            <PulseLogo />
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-xl font-display font-semibold text-ink mb-1">Welcome back</h1>
          <p className="text-sm text-slate-500 mb-6">Sign in to your compliance dashboard</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal/50 focus:border-teal text-sm"
                placeholder="you@company.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal/50 focus:border-teal text-sm"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <p className="text-sm text-coral-dark bg-coral/10 rounded-lg px-3 py-2">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-teal to-violet text-white text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <p className="text-xs text-slate-400 mt-6 text-center">
            Demo: admin@regpulse.com / admin123
          </p>
        </div>
      </div>
    </div>
  );
}
