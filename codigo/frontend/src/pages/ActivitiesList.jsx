import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { FaCalendarAlt } from "react-icons/fa";

export default function HospedajesList() {
  const { state } = useLocation();

  const [resultados, setResultados] = useState([]);
  const [filtros] = useState(state);

  useEffect(() => {
    if (!state) return;

    fetch("http://localhost:3000/habitaciones/buscar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        Destino: state.destino,
        FechaIn: state.entrada,
        FechaFn: state.salida,
        CupoPersonas: state.personas,
      }),
    })
      .then((r) => r.json())
      .then((data) => setResultados(data))
      .catch(console.error);
  }, []);

  return (
    <div className="min-h-screen bg-[#fdfbf7] px-6 py-10 pt-32">
      <div className="max-w-6xl mx-auto space-y-6">

        <h1 className="text-3xl font-bold">Hospedajes disponibles</h1>

        {filtros && (
          <p className="text-sm text-gray-500">
            {filtros.destino} · {filtros.entrada} → {filtros.salida} · {filtros.personas} personas
          </p>
        )}

        {resultados.length === 0 ? (
          <p className="text-gray-400 pt-10">Sin resultados.</p>
        ) : (
          resultados.map((h, i) => (
            <div
              key={i}
              className="flex justify-between bg-white border rounded-xl p-6"
            >
              <div>
                <h2 className="font-semibold text-xl">
                  {h.NombreHospedaje}
                </h2>

                <p className="text-sm text-gray-500">
                  {h.CupoHuespedes} huéspedes
                </p>

                <p className="text-sm text-gray-500">
                  {h.Provincia} · {h.Canton} · {h.Barrio}
                </p>
              </div>

              <div className="flex items-center gap-4">
                <p className="font-semibold">₡{h.PrecioNoche}</p>
                <FaCalendarAlt />
              </div>
            </div>
          ))
        )}

      </div>
    </div>
  );
}
