import { useState, useMemo } from "react";

export default function VistaHabitacion() {
  const [fechaEntrada, setFechaEntrada] = useState("");
  const [fechaSalida, setFechaSalida] = useState("");

  const hoy = new Date().toISOString().split("T")[0];
  const precioPorNoche = 45000;

  // Cálculo de noches
  const noches = useMemo(() => {
    if (!fechaEntrada || !fechaSalida) return 0;

    const entrada = new Date(fechaEntrada);
    const salida = new Date(fechaSalida);
    const diff = salida - entrada;

    return diff > 0 ? diff / (1000 * 60 * 60 * 24) : 0;
  }, [fechaEntrada, fechaSalida]);

  const total = noches * precioPorNoche;

  const fechasValidas = noches > 0;

  return (
    <div className="min-h-screen bg-[#f7f7f7] px-6 py-10">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-sm p-8">

        {/* TÍTULO */}
        <h1 className="text-4xl font-bold mb-2">
          Habitación privada en cabaña
        </h1>
        <p className="text-gray-500 mb-8">
          Limón, Costa Rica · 2 huéspedes · 1 cama · 1 baño
        </p>

        {/* GALERÍA */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="h-56 bg-gray-200 rounded-xl flex items-center justify-center text-gray-500"
            >
              Foto {item}
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-10">

          <div className="md:col-span-2">
            <h2 className="text-2xl font-semibold mb-4">
              Sobre esta habitación
            </h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Habitación privada dentro de una cabaña rodeada de naturaleza,
              ideal para descansar y desconectarse.
            </p>

            <ul className="space-y-2 text-gray-700">
              <li> Cama matrimonial</li>
              <li> Baño privado</li>
              <li> Wi-Fi</li>
              <li> Parqueo incluido</li>
            </ul>
          </div>

          <div className="border rounded-2xl p-6 shadow-sm">
            <p className="text-2xl font-bold mb-6">
              ₡{precioPorNoche.toLocaleString()}{" "}
              <span className="text-base font-normal">/ noche</span>
            </p>
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-semibold mb-1">
                  Fecha de entrada
                </label>
                <input
                  type="date"
                  min={hoy}
                  value={fechaEntrada}
                  onChange={(e) => {
                    setFechaEntrada(e.target.value);
                    if (fechaSalida && e.target.value >= fechaSalida) {
                      setFechaSalida("");
                    }
                  }}
                  className="w-full border rounded-xl px-4 py-3"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">
                  Fecha de salida
                </label>
                <input
                  type="date"
                  min={fechaEntrada || hoy}
                  value={fechaSalida}
                  onChange={(e) => setFechaSalida(e.target.value)}
                  disabled={!fechaEntrada}
                  className="w-full border rounded-xl px-4 py-3 disabled:bg-gray-100"
                />
              </div>
            </div>

            {fechasValidas && (
              <div className="border-t pt-4 mb-6 space-y-2 text-gray-700">
                <div className="flex justify-between">
                  <span>{noches} noche{noches > 1 && "s"}</span>
                  <span>
                    ₡{total.toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>₡{total.toLocaleString()}</span>
                </div>
              </div>
            )}

            <button
              disabled={!fechasValidas}
              className={`w-full py-4 rounded-xl font-bold text-lg transition-all
                ${
                  fechasValidas
                    ? "bg-red-400 text-white hover:bg-red-500"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
            >
              Reservar
            </button>

            {!fechasValidas && (
              <p className="text-sm text-gray-400 mt-3 text-center">
                Selecciona fechas válidas
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}