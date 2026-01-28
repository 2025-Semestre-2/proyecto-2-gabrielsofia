import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import HomePage from "./pages/Home";
import Login from "./pages/auth/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import ReportesView from "./pages/reportes/ReportesView";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <>
      {/* RUTAS DONDE NO QUEREMOS EL NAVBAR */}
      <Routes>
        {/* LOGIN - sin Navbar */}
        <Route path="/login" element={<Login />} />
        
        {/* OTRAS RUTAS - con Navbar */}
        <Route path="/*" element={
          <>
            <Navbar />
            <div className="pt-28">
              <Routes>
                {/* HOME */}
                <Route path="/" element={<HomePage />} />

                {/* DASHBOARD */}
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />

                {/* REPORTES */}
                <Route
                  path="/reportes"
                  element={
                    <ProtectedRoute role="ADMIN">
                      <ReportesView />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </div>
          </>
        } />
      </Routes>
    </>
  );
}

export default App;