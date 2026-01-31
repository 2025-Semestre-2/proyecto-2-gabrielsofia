import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaWifi,
  FaTv,
  FaUtensils,
  FaTshirt,
  FaParking,
  FaSnowflake,
  FaSwimmingPool,
  FaHotTub,
  FaUmbrellaBeach,
  FaFire,
  FaFireAlt,
  FaTimes,
  FaWater,
} from "react-icons/fa";

export default function SelectBasicInfo() {
  const navigate = useNavigate();

  const [data, setData] = useState({
    guests: 4,
    rooms: 1,
    beds: 1,
    baths: 1,
  });

  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [bedTypes, setBedTypes] = useState([""]);

  const amenities = [
    { label: "Wifi", icon: <FaWifi /> },
    { label: "TV", icon: <FaTv /> },
    { label: "Cocina", icon: <FaUtensils /> },
    { label: "Lavadora", icon: <FaTshirt /> },
    { label: "Estacionamiento", icon: <FaParking /> },
    { label: "AC", icon: <FaSnowflake /> },
    { label: "Piscina", icon: <FaSwimmingPool /> },
    { label: "Jacuzzi", icon: <FaHotTub /> },
    { label: "Terraza", icon: <FaUmbrellaBeach /> },
    { label: "Parrilla", icon: <FaFire /> },
    { label: "Fogata", icon: <FaFireAlt /> },
    { label: "Chimenea", icon: <FaFireAlt /> },
    { label: "Acceso a Lago", icon: <FaWater /> },
    { label: "Acceso a Playa", icon: <FaUmbrellaBeach /> },
  ];

  const updateValue = (key, delta) => {
    setData((prev) => {
      const newValue = Math.max(1, prev[key] + delta);

      if (key === "beds") {
        setBedTypes((prevBeds) => {
          if (newValue > prevBeds.length) {
            return [
              ...prevBeds,
              ...Array(newValue - prevBeds.length).fill(""),
            ];
          } else {
            return prevBeds.slice(0, newValue);
          }
        });
      }

      return { ...prev, [key]: newValue };
    });
  };

  const toggleAmenity = (label) => {
    setSelectedAmenities((prev) =>
      prev.includes(label)
        ? prev.filter((a) => a !== label)
        : [...prev, label]
    );
  };

  const isValid =
    Object.values(data).every((v) => v > 0) &&
    selectedAmenities.length > 0 &&
    bedTypes.length === data.beds &&
    bedTypes.every((t) => t !== "");

  const Counter = ({ label, value, onMinus, onPlus }) => (
    <div className="flex items-center justify-between py-6 border-b">
      <span className="text-lg">{label}</span>
      <div className="flex items-center gap-4">
        <button
          onClick={onMinus}
          disabled={value <= 1}
          className="w-9 h-9 rounded-full border text-xl flex items-center justify-center
            hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          −
        </button>
        <span className="w-6 text-center">{value}</span>
        <button
          onClick={onPlus}
          className="w-9 h-9 rounded-full border text-xl flex items-center justify-center hover:bg-gray-100"
        >
          +
        </button>
      </div>
    </div>
  );

  const BedTypeSelector = ({ index, value }) => {
    const options = ["Queen", "King", "Individual"];

    return (
      <div className="border rounded-xl p-4">
        <p className="font-medium mb-3">Cama {index + 1}</p>
        <div className="flex gap-3">
          {options.map((opt) => (
            <button
              key={opt}
              onClick={() => {
                const copy = [...bedTypes];
                copy[index] = opt;
                setBedTypes(copy);
              }}
              className={`px-4 py-2 rounded-lg border text-sm transition-all
                ${
                  value === opt
                    ? "bg-[#99BFA1] text-white border-[#99BFA1]"
                    : "border-gray-300 text-gray-600 hover:border-gray-500"
                }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="h-screen bg-white flex flex-col">
      <header className="flex items-center justify-between px-10 py-6 border-b">
        <h1 className="font-bold text-2xl text-[#99BFA1]">LimonT&H</h1>
           <button
           onClick={() => navigate("/")}
           className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition"
          aria-label="Cerrar">
    <FaTimes className="text-xl text-gray-600 hover:text-black transition" />
  </button>
</header>

      <main className="flex-1 flex">
        <div className="flex-1" />

        <div className="w-full max-w-xl px-10 py-10 overflow-auto">
          <h2 className="text-3xl font-bold mb-2">
            Agrega algunos datos básicos sobre tu espacio
          </h2>
          <p className="text-gray-500 mb-10">
            Después podrás agregar más información.
          </p>

          <div className="divide-y">
            <Counter label="Huéspedes" value={data.guests}
              onMinus={() => updateValue("guests", -1)}
              onPlus={() => updateValue("guests", 1)}
            />
            <Counter label="Habitaciones" value={data.rooms}
              onMinus={() => updateValue("rooms", -1)}
              onPlus={() => updateValue("rooms", 1)}
            />
            <Counter label="Camas" value={data.beds}
              onMinus={() => updateValue("beds", -1)}
              onPlus={() => updateValue("beds", 1)}
            />
            <Counter label="Baños" value={data.baths}
              onMinus={() => updateValue("baths", -1)}
              onPlus={() => updateValue("baths", 1)}
            />
          </div>

          {/* TIPOS DE CAMA */}
          <div className="mt-10">
            <h3 className="text-2xl font-bold mb-2">Tipo de camas</h3>
            <p className="text-gray-500 mb-6">
              Debes seleccionar el tipo para cada cama
            </p>

            <div className="space-y-4">
              {bedTypes.map((type, index) => (
                <BedTypeSelector
                  key={index}
                  index={index}
                  value={type}
                />
              ))}
            </div>
          </div>

          {/* AMENITIES */}
          <div className="mt-14">
            <h3 className="text-2xl font-bold mb-2">
              Servicios disponibles
            </h3>
            <p className="text-gray-500 mb-6">
              Selecciona al menos uno
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {amenities.map((item) => {
                const isSelected = selectedAmenities.includes(item.label);
                return (
                  <button
                    key={item.label}
                    onClick={() => toggleAmenity(item.label)}
                    className={`border rounded-xl p-4 flex flex-col items-center gap-3 transition-all
                      ${
                        isSelected
                          ? "border-[#99BFA1] bg-[#99BFA1]/10"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                  >
                    <span
                      className={`text-2xl ${
                        isSelected ? "text-[#99BFA1]" : "text-gray-500"
                      }`}
                    >
                      {item.icon}
                    </span>
                    <span
                      className={`text-sm text-center ${
                        isSelected ? "text-[#99BFA1]" : "text-gray-700"
                      }`}
                    >
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
          <div className="flex justify-center gap-6 mt-14">
            <button
              onClick={() => navigate(-1)}
              className="px-10 py-4 rounded-2xl font-bold text-lg bg-gray-200 text-gray-600 hover:bg-gray-300"> ← Atrás
            </button>

            <button
              disabled={!isValid}
              onClick={() => navigate("/registro/hospedaje/detalles")}
              className={`px-14 py-4 rounded-2xl font-bold text-lg transition-all ${
              isValid
              ? "bg-gradient-to-r from-[#99BFA1] to-[#8BB593] text-white hover:shadow-xl hover:scale-[1.02]"
              : "bg-gray-200 text-gray-400 cursor-not-allowed" }`} >
              Continuar
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
