import { useState } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import LoginModal from "./components/LoginModal";
import ServiceTypeModal from "./components/ServiceTypeModal";

import HomePage from "./pages/Home";
import StartHosting from "./pages/StartHosting";
import Dashboard from "./pages/dashboard/Dashboard";
import ReportesView from "./pages/reportes/ReportesView";
import SelectPropertyType from "./pages/SelectPropertyType";

import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isServiceTypeOpen, setIsServiceTypeOpen] = useState(false);
  const [serviceType, setServiceType] = useState(null);

  const hideNavbarRoutes = [
  "/empezar",
  "/registro/hospedaje/tipo",
];
  const hideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {/* NAVBAR */}
      {!hideNavbar && !isLoginModalOpen && !isServiceTypeOpen && (
        <Navbar
          onOpenLogin={() => setIsLoginModalOpen(true)}
          onOpenServiceType={() => setIsServiceTypeOpen(true)}
        />
      )}

      {/* MODAL: TIPO DE SERVICIO */}
      <ServiceTypeModal
        isOpen={isServiceTypeOpen}
        onClose={() => setIsServiceTypeOpen(false)}
        onSelect={(type) => {
          setServiceType(type);
          setIsServiceTypeOpen(false);
          setIsLoginModalOpen(true);
        }}
      />

      {/* MODAL: LOGIN */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => {
          setIsLoginModalOpen(false);

          if (serviceType === "hospedaje") {
            navigate("/empezar");
          }

          if (serviceType === "actividades") {
            navigate("/empezar"); 
          }

          setServiceType(null);
        }}
      />

      {/* CONTENIDO */}
      {!isLoginModalOpen && !isServiceTypeOpen && (
        <>
          {/* Espacio para navbar */}
          {!hideNavbar && <div className="h-[180px]" />}

          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/empezar" element={<StartHosting />} />
            <Route
  path="/registro/hospedaje/tipo"
  element={<SelectPropertyType />}
/>
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
      )}
    </>
  );
}

export default App;
