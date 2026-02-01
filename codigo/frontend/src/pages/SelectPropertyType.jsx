  import { useState } from "react";
  import { useNavigate } from "react-router-dom";
  import {
    FaHome,
    FaBuilding,
    FaTree,
    FaShuttleVan,
    FaCampground,
    FaHotel,
    FaCrown,
    FaCube,
    FaDoorClosed,
    FaTimes,
    FaBed,
  } from "react-icons/fa";

  const propertyOptions = [
    { label: "Casa", icon: <FaHome /> },
    { label: "Apartamento", icon: <FaBuilding /> },
    { label: "Cabaña", icon: <FaTree /> },
    { label: "Casa rodante", icon: <FaShuttleVan /> },
    { label: "Castillo", icon: <FaCrown /> },
    { label: "Contenedores", icon: <FaCube /> },
    { label: "Domo", icon: <FaHome /> },
    { label: "Hotel", icon: <FaHotel /> },
    { label: "Tienda de campaña", icon: <FaCampground /> },
    { label: "Casa del árbol", icon: <FaTree /> },
  ];

  const stayOptions = [
    {
      label: "Alojamiento completo",
      description: "Los huéspedes disponen del espacio completo para su uso exclusivo.",
      subDescription: "Ideal para familias, grupos o quienes buscan privacidad total.",
      icon: <FaDoorClosed className="text-4xl" />,
      color: "#99BFA1",
      bgColor: "#99BFA1",
    },
    {
      label: "Habitación privada",
      description: "Los huéspedes tienen una habitación privada y acceso a espacios compartidos.",
      subDescription: "Perfecto para viajeros que buscan interacción y economía.",
      icon: <FaBed className="text-4xl" />,
      color: "#E69C9C",
      bgColor: "#E69C9C",
    },
  ];

  export default function SelectPropertyType() {
    const [selectedProperty, setSelectedProperty] = useState(null);
    const [stayType, setStayType] = useState(null);
    const navigate = useNavigate();

    return (
      <div className="h-screen overflow-hidden bg-white flex flex-col">
        {/* HEADER */}
        <header className="flex items-center justify-between px-10 py-6 border-b">
          <h1 className="font-bold text-2xl text-[#99BFA1]">LimonT&H</h1>
          <button
            onClick={() => navigate("/")}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition"
            aria-label="Cerrar">
            <FaTimes className="text-xl text-gray-600" />
          </button>
        </header>
        <main className="flex-1 flex justify-center px-10 py-14">
          <div className="w-full max-w-6xl">
            {/* Sección 1: Tipo de propiedad */}
            <h2 className="text-4xl font-bold mb-3 text-center">
              ¿Cuál de estas opciones describe mejor tu espacio?
            </h2>
            <p className="text-gray-500 mb-12 text-center">
              Selecciona una opción para continuar
            </p>

            <div className="flex justify-center mb-20">
              <div className="grid grid-cols-[repeat(3,300px)] gap-6">
                {propertyOptions.map((option) => {
                  const isSelected = selectedProperty === option.label;
                  return (
                    <button
                      key={option.label}
                      type="button"
                      onClick={() => setSelectedProperty(option.label)}
                      className={`
                        h-60 rounded-xl border transition-all duration-300 flex flex-col items-center justify-center gap-3
                        ${isSelected
                        ? "border-[#99BFA1] bg-[#99BFA1]/10 shadow-md scale-[1.02]"
                        : "border-gray-200 hover:border-[#99BFA1] hover:shadow-sm"}
                      `}

                    >
                      <div
                        className={`text-4xl transition-colors ${
                          isSelected ? "text-[#99BFA1]" : "text-gray-400"
                        }`}
                      >
                        {option.icon}
                      </div>
                      <span className="text-lg font-normal text-center">
                        {option.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="bg-gradient-to-r from-[#F8F9FA] to-[#F5F7FA] rounded-2xl p-10 mb-8 shadow-sm">
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold mb-3">
                  ¿De qué tipo de alojamiento dispondrán los huéspedes?
                </h2>
                <p className="text-gray-600 text-lg">
                  Selecciona la opción que mejor describa cómo usarán tu espacio
                </p>
              </div>

              <div className="flex flex-col items-center gap-8">
                {stayOptions.map((option) => {
                  const isSelected = stayType === option.label;
                  return (
                    <button
                      key={option.label}
                      type="button"
                      onClick={() => setStayType(option.label)}
                      className={`w-full max-w-2xl transition-all duration-300`}
                    >
                      <div
                        className={`
                          relative rounded-2xl border-2 p-8
                          flex items-start gap-8
                          transition-all duration-300
                          ${isSelected
                            ? "shadow-xl bg-white"
                            : "border-gray-200 hover:border-gray-300 hover:shadow-lg bg-white"} `}
                        style={{ borderColor: isSelected ? option.color : undefined }}>
                        <div
                          className="w-20 h-20 rounded-xl flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: `${option.bgColor}15` }}>
                          <div style={{ color: option.color }}>{option.icon}</div>
                        </div>
                        <div className="flex-1">
                          <h3
                            className="text-2xl font-bold mb-2"
                            style={{ color: isSelected ? option.color : "#1F2937" }}>
                            {option.label}
                          </h3>
                          <p className="text-gray-700 text-lg mb-2 font-medium">
                            {option.description}
                          </p>
                          <p className="text-gray-500">{option.subDescription}</p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="flex justify-center gap-6 mt-8 mb-14">
              <button
                onClick={() => navigate(-1)}
                className="px-10 py-5 rounded-2xl font-bold text-2xl transition-all duration-300
                  bg-gray-200 text-gray-600 hover:bg-gray-300 hover:text-gray-800"
              >
                ← Atrás
              </button>

              <button
                disabled={!selectedProperty || !stayType}
                onClick={() => navigate("/registro/hospedaje/ubicacion", {state: { stayType },}) }
                className={` px-14 py-5 rounded-2xl font-bold text-2xl transition-all duration-300
                ${
                selectedProperty && stayType
                 ? "bg-gradient-to-r from-[#99BFA1] to-[#8BB593] text-white hover:shadow-xl hover:scale-[1.02]"
                 : "bg-gray-200 text-gray-400 cursor-not-allowed"
                } `}>
                Continuar
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }
