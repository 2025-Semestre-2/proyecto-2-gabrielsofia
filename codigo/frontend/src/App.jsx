import { useState } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import LoginModal from "./components/LoginModal";
import ServiceTypeModal from "./components/ServiceTypeModal";

import HomePage from "./pages/Home";
import StartHosting from "./pages/StartHosting";

/* HOSPEDAJE */
import SelectPropertyType from "./pages/SelectPropertyType";
import SelectLocation from "./pages/SelectLocation";
import SelectBasicInfo from "./pages/SelectBasicInfo";
import SelectListingDetails from "./pages/SelectListingDetails";

/* ACTIVIDADES */
import SelectActivityType from "./pages/SelectActivityType";
import SelectActivityServices from "./pages/SelectActivityServices";

/* ANFITRIÓN */
import HostDashboard from "./pages/HostDashboard";
import ActivitiesList from "./pages/ActivitiesList";
import HospedajesList from "./pages/HospedajesList";

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isServiceTypeOpen, setIsServiceTypeOpen] = useState(false);
  const [loginIntent, setLoginIntent] = useState(null);

  // 🔥 ESTADO GLOBAL DEL REGISTRO DE HOSPEDAJE
  const [hospedajeData, setHospedajeData] = useState({});

  /* RUTAS SIN NAVBAR */
  const hideNavbarRoutes = [
    "/empezar",
    "/registro/hospedaje/tipo",
    "/registro/hospedaje/ubicacion",
    "/registro/hospedaje/datos",
    "/registro/hospedaje/detalles",
    "/registro/actividad/tipo",
    "/registro/actividad/datos",
  ];

  const hideNavbar = hideNavbarRoutes.includes(location.pathname);
  const isHostMode = location.pathname === "/anfitrion";

  return (
    <>
      {/* NAVBAR */}
      {!hideNavbar && !isLoginModalOpen && !isServiceTypeOpen && !isHostMode && (
        <Navbar
          onOpenLogin={() => {
            setLoginIntent("login-only");
            setIsLoginModalOpen(true);
          }}
          onOpenServiceType={() => {
            setLoginIntent("service-type");
            setIsLoginModalOpen(true);
          }}
        />
      )}

      {/* SERVICE TYPE MODAL */}
      <ServiceTypeModal
        isOpen={isServiceTypeOpen}
        onClose={() => setIsServiceTypeOpen(false)}
        onSelect={(type) => {
          setIsServiceTypeOpen(false);
          if (type === "hospedaje") navigate("/registro/hospedaje/tipo");
          if (type === "actividades") navigate("/registro/actividad/tipo");
        }}
      />

      {/* LOGIN MODAL */}
      {!isHostMode && (
        <LoginModal
          isOpen={isLoginModalOpen}
          onClose={() => {
            setIsLoginModalOpen(false);
            if (loginIntent === "service-type") {
              setIsServiceTypeOpen(true);
            }
            setLoginIntent(null);
          }}
        />
      )}

      {/* CONTENIDO */}
      {!isLoginModalOpen && !isServiceTypeOpen && (
        <>
          {!hideNavbar && !isHostMode && <div className="h-[180px]" />}

          <Routes>
            {/* HOME */}
            <Route path="/" element={<HomePage />} />
            <Route path="/empezar" element={<StartHosting />} />
            <Route path="/actividades" element={<ActivitiesList />} />
            <Route path="/alquileres" element={<HospedajesList />} />

            {/* ANFITRIÓN */}
            <Route
              path="/anfitrion"
              element={
                <HostDashboard
                  onOpenServiceType={() => setIsServiceTypeOpen(true)}
                />
              }
            />

            {/* HOSPEDAJE */}
            <Route
              path="/registro/hospedaje/tipo"
              element={
                <SelectPropertyType
                  hospedajeData={hospedajeData}
                  setHospedajeData={setHospedajeData}
                />
              }
            />
            <Route
              path="/registro/hospedaje/ubicacion"
              element={
                <SelectLocation
                  hospedajeData={hospedajeData}
                  setHospedajeData={setHospedajeData}
                />
              }
            />
            <Route
              path="/registro/hospedaje/datos"
              element={
                <SelectBasicInfo
                  hospedajeData={hospedajeData}
                  setHospedajeData={setHospedajeData}
                />
              }
            />
            <Route
              path="/registro/hospedaje/detalles"
              element={
                <SelectListingDetails
                  hospedajeData={hospedajeData}
                  setHospedajeData={setHospedajeData}
                />
              }
            />

            {/* ACTIVIDADES */}
            <Route
              path="/registro/actividad/tipo"
              element={<SelectActivityType />}
            />
            <Route
              path="/registro/actividad/datos"
              element={<SelectActivityServices />}
            />
          </Routes>
        </>
      )}
    </>
  );
}

export default App;
