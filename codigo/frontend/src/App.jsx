import { useState } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import LoginModal from "./components/LoginModal";
import ServiceTypeModal from "./components/ServiceTypeModal";

import HomePage from "./pages/Home";
import StartHosting from "./pages/StartHosting";
import SelectPropertyType from "./pages/SelectPropertyType";
import SelectLocation from "./pages/SelectLocation";
import SelectBasicInfo from "./pages/SelectBasicInfo";
import SelectListingDetails from "./pages/SelectListingDetails";


function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isServiceTypeOpen, setIsServiceTypeOpen] = useState(false);

const hideNavbarRoutes = [
  "/empezar",
  "/registro/hospedaje/tipo",
  "/registro/hospedaje/ubicacion",
  "/registro/hospedaje/datos",
  "/registro/hospedaje/detalles", 
];

  const hideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {!hideNavbar && !isLoginModalOpen && !isServiceTypeOpen && (
        <Navbar
          onOpenLogin={() => setIsLoginModalOpen(true)}
          onOpenServiceType={() => setIsServiceTypeOpen(true)}/>
      )}
      <ServiceTypeModal
        isOpen={isServiceTypeOpen}
        onClose={() => setIsServiceTypeOpen(false)}
        onSelect={() => {
          setIsServiceTypeOpen(false);
          setIsLoginModalOpen(true);
        }}
      />
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => {setIsLoginModalOpen(false);
        navigate("/"); }}
      />
      {!isLoginModalOpen && !isServiceTypeOpen && (
        <>
          {!hideNavbar && <div className="h-[180px]" />}

          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/empezar" element={<StartHosting />} />
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
          </Routes>
        </>
      )}
    </>
  );
}

export default App;
