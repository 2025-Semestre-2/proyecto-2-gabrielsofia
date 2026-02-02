import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { FaCalendarAlt } from "react-icons/fa";

const API = "http://localhost:3000";

function formatDate(iso) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return ""; 
  return d.toLocaleDateString();
}

export default function HospedajesList() {
  const [searchParams] = useSearchParams();

  const filtros = useMemo(() => {
    const destino = searchParams.get("destino") || "";
    const fechaIn = searchParams.get("fechaIn") || "";
    const fechaFn = searchParams.get("fechaFn") || "";
    const cupoPersonas = searchParams.get("cupoPersonas") || "";

    return { destino, fechaIn, fechaFn, cupoPersonas };
  }, [searchParams]);

  const [habitaciones, setHabitaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function cargar() {
      setLoading(true);
      setError("");

      try {
        let url = `${API}/habitaciones`;

        const vieneBusqueda =
          filtros.destino || filtros.fechaIn || filtros.fechaFn || filtros.cupoPersonas;

        if (vieneBusqueda) {
          const params = new URLSearchParams();
          if (filtros.destino) params.set("destino", filtros.destino);
          if (filtros.fechaIn) params.set("fechaIn", filtros.fechaIn);
          if (filtros.fechaFn) params.set("fechaFn", filtros.fechaFn);
          if (filtros.cupoPersonas) params.set("cupoPersonas", filtros.cupoPersonas);
          url += `?${params.toString()}`;
        }

        const res = await fetch(url);
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data?.error || `HTTP ${res.status}`);
        }

        setHabitaciones(Array.isArray(data) ? data : []);
      } catch (e) {
        setError(e.message);
        setHabitaciones([]);
      } finally {
        setLoading(false);
      }
    }

    cargar();
  }, [filtros]);

  return (
    <div className="min-h-screen bg-[#fdfbf7] px-6 py-10">
      <div className="max-w-6xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Alquileres disponibles
        </h1>

        {/* Debug opcional (podés borrarlo luego) */}
        <p className="text-sm text-gray-500">
          {filtros.destino || filtros.fechaIn || filtros.fechaFn || filtros.cupoPersonas
            ? `Filtro: destino=${filtros.destino || "-"} | ${filtros.fechaIn || "-"} → ${filtros.fechaFn || "-"} | personas=${filtros.cupoPersonas || "-"}`
            : "Sin filtros (mostrando todo)"}
        </p>

        {loading && <p className="text-gray-500">Cargando...</p>}
        {error && <p className="text-red-600">Error: {error}</p>}

        {!loading && !error && habitaciones.length === 0 && (
          <p className="text-gray-500">No hay resultados con esos filtros.</p>
        )}

        {/* CARDS REALES */}
        {habitaciones.map((h, idx) => (
          <div
            key={`${h.CedulaJuridica}-${h.NumeroHabitacion}-${idx}`}
            className="flex justify-between items-center bg-white border rounded-xl p-6 hover:shadow transition"
          >
            {/* INFO */}
            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-gray-800">
                {h.NombreHospedaje} — Hab. {h.NumeroHabitacion}
              </h2>

              <p className="text-sm text-gray-500">
                {h.CupoHuespedes} huéspedes · {h.CantidadCamas} cama(s) · {h["CantidadBaños"]} baño(s)
              </p>

              <p className="text-sm text-gray-500">
                {h.TipoHospedaje} · {h.NombreHabitacion}
              </p>

              <p className="text-sm text-gray-500">
                Disponible: {formatDate(h.FechaInicio)} → {formatDate(h.FechaFin)}
              </p>

              <p className="text-sm text-gray-500">
                Estado: {h.Estado}
              </p>
            </div>

            {/* PRECIO + ICONO */}
            <div className="flex items-center gap-6">
              <div className="text-right">
                <p className="text-lg font-semibold text-gray-800">
                  ₡{h.Precio} / noche
                </p>
                <p className="text-xs text-gray-400">CRC</p>
              </div>

              <FaCalendarAlt className="text-gray-400 text-xl" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
