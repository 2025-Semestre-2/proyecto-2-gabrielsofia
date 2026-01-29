import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import HomePage from "./pages/Home";
import Login from "./pages/auth/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import ReportesView from "./pages/reportes/ReportesView";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <Routes>

      {/* LOGIN SIN NAVBAR */}
      <Route path="/login" element={<Login />} />

      {/* TODAS LAS DEMÁS RUTAS */}
      <Route
        path="/*"
        element={
          <>
            <Navbar />

            {/* ESPACIADOR DEL NAVBAR */}
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
        }
      />
    </Routes>
  );
}

export default App;
