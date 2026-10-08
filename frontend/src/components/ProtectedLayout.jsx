import { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Menu } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import Sidebar from "./Sidebar";
import PulseLogo from "./PulseLogo";

export default function ProtectedLayout() {
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!user) return <Navigate to="/login" replace />;

  return (
    <div className="flex min-h-screen bg-cloud">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile top bar */}
        <header className="lg:hidden flex items-center justify-between px-4 py-3 bg-white border-b border-slate-200 sticky top-0 z-30">
          <PulseLogo size="sm" />
          <button onClick={() => setSidebarOpen(true)} className="text-ink">
            <Menu size={24} />
          </button>
        </header>

        <main className="flex-1 p-4 sm:p-8 max-w-[1400px] w-full overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
