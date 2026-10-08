import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  ClipboardList,
  ListChecks,
  BarChart3,
  Users,
  LogOut,
  X,
} from "lucide-react";
import PulseLogo from "./PulseLogo";
import { useAuth } from "../context/AuthContext";

const NAV_ITEMS = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/requirements", label: "Requirements", icon: ClipboardList },
  { to: "/tasks", label: "Tasks", icon: ListChecks },
  { to: "/reports", label: "Reports", icon: BarChart3 },
];

export default function Sidebar({ isOpen, onClose }) {
  const { user, logout, isAdmin } = useAuth();

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
      isActive
        ? "bg-white/10 text-white"
        : "text-slate-400 hover:text-white hover:bg-white/5"
    }`;

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-ink/60 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen w-64 shrink-0 bg-ink flex flex-col px-4 py-6 z-50 transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        <div className="flex items-center justify-between px-2 mb-8">
          <div className="[&_span]:text-white [&_.text-violet]:text-violet-light">
            <PulseLogo />
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 space-y-1">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={linkClass}
              onClick={onClose}
            >
              <item.icon size={18} />
              {item.label}
            </NavLink>
          ))}
          {isAdmin && (
            <NavLink to="/users" className={linkClass} onClick={onClose}>
              <Users size={18} />
              Users
            </NavLink>
          )}
        </nav>

        <div className="border-t border-white/10 pt-4 px-2">
          <p className="text-sm font-medium text-white">{user?.name}</p>
          <p className="text-xs text-slate-400 mb-3">{user?.role}</p>
          <button
            onClick={logout}
            className="flex items-center gap-2 text-sm text-slate-400 hover:text-coral transition-colors"
          >
            <LogOut size={16} />
            Log out
          </button>
        </div>
      </aside>
    </>
  );
}
