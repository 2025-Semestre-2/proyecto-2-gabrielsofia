import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/Home";
import Dashboard from "./pages/dashboard/Dashboard";
import ReportesView from "./pages/reportes/ReportesView";
import ProtectedRoute from "./routes/ProtectedRoute";
import LoginModal from "./components/LoginModal";

function App() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  return (
    <>
      {/* Cuando el modal esté abierto, NO se mostrará el Navbar ni contenido */}
      {!isLoginModalOpen && <Navbar onOpenLogin={() => setIsLoginModalOpen(true)} />}
      
      {/* Modal de login - cuando está abierto, cubre TODO */}
      <LoginModal 
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />

      {/* Solo mostrar contenido si el modal NO está abierto */}
      {!isLoginModalOpen && (
        <>
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
      )}
    </>
  );
}

export default App;