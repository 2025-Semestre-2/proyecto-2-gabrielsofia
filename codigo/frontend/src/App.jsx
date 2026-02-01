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

  // Para saber por qué se abrió el login
  const [loginIntent, setLoginIntent] = useState(null);

  /* RUTAS DONDE NO VA NAVBAR */
  const hideNavbarRoutes = [
    "/empezar",

    /* Hospedaje */
    "/registro/hospedaje/tipo",
    "/registro/hospedaje/ubicacion",
    "/registro/hospedaje/datos",
    "/registro/hospedaje/detalles",

    /* Actividades */
    "/registro/actividad/tipo",
    "/registro/actividad/datos",
  ];

  const hideNavbar = hideNavbarRoutes.includes(location.pathname);

  /* MODO ANFITRIÓN */
  const isHostMode = location.pathname === "/anfitrion";

  return (
    <>
      {/* NAVBAR (NO en anfitrión) */}
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

      {/* SERVICE TYPE MODAL (SÍ funciona en anfitrión) */}
      <ServiceTypeModal
        isOpen={isServiceTypeOpen}
        onClose={() => setIsServiceTypeOpen(false)}
        onSelect={(type) => {
          setIsServiceTypeOpen(false);

          if (type === "hospedaje") {
            navigate("/registro/hospedaje/tipo");
          }

          if (type === "actividades") {
            navigate("/registro/actividad/tipo");
          }
        }}
      />

      {/* LOGIN MODAL (NO existe en /anfitrion) */}
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


            {/* MODO ANFITRIÓN */}
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
              element={<SelectPropertyType />}
            />
            <Route
              path="/registro/hospedaje/ubicacion"
              element={<SelectLocation />}
            />
            <Route
              path="/registro/hospedaje/datos"
              element={<SelectBasicInfo />}
            />
            <Route
              path="/registro/hospedaje/detalles"
              element={<SelectListingDetails />}
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
