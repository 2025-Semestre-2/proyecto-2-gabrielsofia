import { useNavigate } from "react-router-dom";
import {
  CheckCircle,
  MapPin,
  Image,
  DollarSign,
  Users,
  Star,
} from "lucide-react";
import { FaTimes } from "react-icons/fa";

export default function StartHosting() {
  const navigate = useNavigate();

  return (
    <div className="h-screen overflow-hidden bg-white flex flex-col">
      {/* HEADER */}
      <header className="flex items-center justify-between px-8 py-4 border-b">
        <h1 className="font-bold text-2xl text-[#99BFA1]">LimonT&H</h1>
        <button
          onClick={() => navigate("/")}
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100"
        >
          <FaTimes className="text-xl text-gray-600" />
        </button>
      </header>

      {/* MAIN */}
      <main className="flex-1 flex items-center justify-center px-6">
        <div className="w-full max-w-6xl">
          {/* TÍTULO */}
          <div className="text-center mb-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-3">
              Comienza tu viaje como <br />
              anfitrión en{" "}
              <span className="text-[#99BFA1]">LimonT&H</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Sigue estos sencillos pasos para compartir tu espacio y comenzar
              a generar ingresos.
            </p>
          </div>

          {/* PASOS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* PASO 1 */}
            <StepCard
              number={1}
              color="#99BFA1"
              icon={<MapPin />}
              title="Describe tu espacio"
              items={[
                "Ubicación exacta",
                "Capacidad de huéspedes",
                "Tipo de propiedad",
              ]}
              bottomIcon={<Users />}
            />

            {/* PASO 2 */}
            <StepCard
              number={2}
              color="#E69C9C"
              icon={<Image />}
              title="Haz que destaque"
              items={[
                "Fotos profesionales",
                "Descripción detallada",
                "Comodidades clave",
              ]}
              bottomIcon={<Star />}
            />

            {/* PASO 3 */}
            <StepCard
              number={3}
              color="#99BFA1"
              icon={<DollarSign />}
              title="Termina y publica"
              items={[
                "Precio competitivo",
                "Políticas claras",
                "Disponibilidad",
              ]}
              bottomIcon={<DollarSign />}
            />
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="border-t px-8 py-4">
        <div className="max-w-6xl mx-auto flex justify-end gap-4">
          <button
            onClick={() => navigate("/")}
            className="border rounded-lg px-6 py-2 hover:bg-gray-50"
          >
            Volver al inicio
          </button>

          <button
            onClick={() => navigate("/registro/hospedaje/tipo")}
            className="bg-[#E69C9C] text-white px-8 py-2 rounded-lg font-semibold hover:bg-[#dc8f8f]"
          >
            Comencemos
          </button>
        </div>
      </footer>
    </div>
  );
}

/* CARD REUTILIZABLE */
function StepCard({ number, color, icon, title, items, bottomIcon }) {
  return (
    <div className="relative border rounded-2xl p-6 shadow-sm hover:shadow-md transition">
      <div className="absolute -top-6 -left-2 text-gray-400 font-semibold text-lg">
        {number}
      </div>

      <div
        className="w-14 h-14 rounded-xl flex items-center justify-center mb-4"
        style={{ backgroundColor: `${color}20`, color }}
      >
        {icon}
      </div>

      <h3 className="font-bold text-lg mb-3">{title}</h3>

      <div className="space-y-2 mb-4">
        {items.map((item) => (
          <div key={item} className="flex items-center gap-2">
            <CheckCircle size={16} style={{ color }} />
            <span className="text-sm">{item}</span>
          </div>
        ))}
      </div>

      <div className="h-28 bg-gray-50 rounded-xl flex items-center justify-center border">
        {bottomIcon}
      </div>
    </div>
  );
}
