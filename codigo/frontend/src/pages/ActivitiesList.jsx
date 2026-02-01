import { useNavigate } from "react-router-dom";
import { FaCalendarAlt } from "react-icons/fa";

export default function ActivitiesList() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#fdfbf7] px-6 py-10">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* TÍTULO */}
        <h1 className="text-3xl font-bold text-gray-800">
          Actividades disponibles
        </h1>

        {/* ACTIVIDAD (CARD) */}
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="flex justify-between items-center bg-white border rounded-xl p-6 hover:shadow transition"
          >
            {/* INFO */}
            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-gray-800">
                Tour de canopy
              </h2>

              <p className="text-sm text-gray-500">
                4 personas · 2 horas · Equipo incluido
              </p>

              <p className="text-sm text-gray-500">
                Guía certificado · Seguridad incluida
              </p>
            </div>

            {/* PRECIO + ICONO */}
            <div className="flex items-center gap-6">
              <div className="text-right">
                <p className="text-lg font-semibold text-gray-800">
                  ₡25,000 / persona
                </p>
                <p className="text-xs text-gray-400">CRC</p>
              </div>

              <FaCalendarAlt className="text-gray-400 text-xl" />
            </div>
          </div>
        ))}

        {/* VACÍO (cuando no haya actividades reales) */}
        <div className="text-center text-gray-400 pt-16">
          <p>Más actividades aparecerán aquí pronto</p>
        </div>
      </div>
    </div>
  );
}
