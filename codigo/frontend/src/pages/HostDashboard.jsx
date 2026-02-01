import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function HostDashboard({ onOpenServiceType }) {
  const [activeTab, setActiveTab] = useState("anuncios");
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HEADER */}
      <header className="bg-white border-b px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <h1 className="font-bold text-3xl text-[#99BFA1]">
            LimonT&H
          </h1>

          <button
            onClick={() => navigate("/")}
            className="px-6 py-2 rounded-md bg-red-400 text-white font-semibold hover:bg-red-500 transition"
          >
            Cambiar a modo viajero
          </button>
        </div>
      </header>

      {/* CONTENIDO */}
      <main className="px-6 pt-10 pb-20">
        <div className="max-w-6xl mx-auto">

          {/* TABS */}
          <div className="flex gap-8 border-b border-gray-200 mb-10">
            {[
              { key: "anuncios", label: "Tus anuncios" },
              { key: "reservas", label: "Reservas activas" },
              { key: "reportes", label: "Reportes" },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`pb-3 font-semibold transition ${
                  activeTab === tab.key
                    ? "border-b-2 border-[#99BFA1] text-[#99BFA1]"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* ================= ANUNCIOS ================= */}
          {activeTab === "anuncios" && (
            <>
              <div className="flex justify-end mb-10">
                <button
                  onClick={onOpenServiceType}
                  className="flex items-center gap-2 px-6 py-3 rounded-md bg-[#99BFA1] text-white font-semibold hover:bg-[#88ad90] transition"
                >
                  <span className="text-lg">+</span>
                  Nuevo anuncio
                </button>
              </div>

              <div className="text-center mt-24">
                <h2 className="text-4xl font-bold text-gray-800 mb-4">
                  Anuncios activos
                </h2>
                <p className="text-gray-500">
                  Aquí aparecerán los alojamientos o actividades que hayas publicado
                </p>
              </div>
            </>
          )}

          {/* ================= RESERVAS ================= */}
          {activeTab === "reservas" && (
            <div className="text-center mt-24">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">
                Reservas activas
              </h2>
              <p className="text-gray-500">
                Aquí verás las reservas confirmadas por tus clientes
              </p>
            </div>
          )}

          {/* ================= REPORTES ================= */}
          {activeTab === "reportes" && (
            <div className="space-y-10">

              {/* TITULO */}
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                  Reportes
                </h2>
                <p className="text-gray-500">
                  Visualiza información clave del establecimiento mediante filtros personalizados
                </p>
              </div>

              {/* FILTROS */}
              <div className="bg-white border rounded-xl p-8 shadow-sm space-y-6">

                {/* TIPO DE REPORTE */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Tipo de reporte
                  </label>
                  <select className="w-full border rounded-md px-4 py-2">
                    <option>Facturación</option>
                    <option>Reservas por tipo de habitación</option>
                    <option>Rango de edades de clientes</option>
                    <option>Hoteles con mayor demanda</option>
                  </select>
                </div>

                {/* FECHAS */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Fecha inicio
                    </label>
                    <input
                      type="date"
                      className="w-full border rounded-md px-4 py-2"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Fecha fin
                    </label>
                    <input
                      type="date"
                      className="w-full border rounded-md px-4 py-2"
                    />
                  </div>
                </div>

                {/* TIPO DE HABITACIÓN */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Tipo de habitación
                  </label>
                 
                </div>

                {/* HABITACIÓN ESPECÍFICA */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Habitación específica
                  </label>
                  <select className="w-full border rounded-md px-4 py-2">
                    <option>Todas</option>
                    
                  </select>
                </div>

                {/* RANGO DE EDADES */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Rango de edades
                  </label>
                  <select className="w-full border rounded-md px-4 py-2">
                    <option>Todos</option>
                    <option>18 - 25</option>
                    <option>26 - 35</option>
                    <option>36 - 50</option>
                    <option>51+</option>
                  </select>
                </div>

                {/* UBICACIÓN */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Ubicación
                  </label>
                  <select className="w-full border rounded-md px-4 py-2">
                    <option>Todas</option>
                  </select>
                </div>

                {/* BOTÓN */}
                <div className="flex justify-end">
                  <button className="px-8 py-3 rounded-md bg-[#99BFA1] text-white font-semibold hover:bg-[#88ad90] transition">
                    Generar reporte
                  </button>
                </div>
              </div>

              {/* RESULTADOS */}
              <div className="bg-white border rounded-xl p-12 text-center text-gray-500">
                Aquí se mostrará el resultado del reporte seleccionado
              </div>

            </div>
          )}
        </div>
      </main>
    </div>
  );
}
