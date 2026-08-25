import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Sidebar from "./Sidebar";

export default function ProtectedLayout() {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />;

  return (
    <div className="flex min-h-screen bg-cloud">
      <Sidebar />
      <main className="flex-1 p-8 max-w-[1400px]">
        <Outlet />
      </main>
    </div>
  );
}
