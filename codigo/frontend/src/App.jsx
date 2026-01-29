import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/Home";
import Dashboard from "./pages/dashboard/Dashboard";
import ReportesView from "./pages/reportes/ReportesView";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <>
      <Navbar />

      {/* Espacio del navbar */}
      <div className="h-[180px]" />

      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/reportes"
          element={
            <ProtectedRoute role="ADMIN">
              <ReportesView />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
