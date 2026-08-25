import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedLayout from "./components/ProtectedLayout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Requirements from "./pages/Requirements";
import RequirementDetail from "./pages/RequirementDetail";
import Tasks from "./pages/Tasks";
import Reports from "./pages/Reports";
import Users from "./pages/Users";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/requirements" element={<Requirements />} />
            <Route path="/requirements/:id" element={<RequirementDetail />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/users" element={<Users />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
