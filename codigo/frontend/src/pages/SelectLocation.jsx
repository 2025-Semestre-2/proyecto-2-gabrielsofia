import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaTimes } from "react-icons/fa";

const cantonesLimon = {
  Limón: ["Limón", "Valle La Estrella", "Río Blanco", "Matama"],
  Pococí: ["Guápiles", "Jiménez", "La Rita", "Roxana", "Cariari", "Colorado", "La Colonia"],
  Siquirres: ["Siquirres", "Pacuarito", "Florida", "Germania", "Cairo", "Alegria", "Reventazon"],
  Talamanca: ["Bratsi", "Sixaola", "Cahuita", "Telire"],
  Matina: ["Matina", "Batán", "Carrandi"],
  Guácimo: ["Guácimo", "Mercedes", "Pocora", "Río Jiménez", "Duacarí"],
};

export default function SelectLocation({
  hospedajeData = {},
  setHospedajeData,
}) {
  const navigate = useNavigate();
  const stayType = hospedajeData.stayType;

  const [form, setForm] = useState({
    canton: "",
    distrito: "",
    barrio: "",
    senas: "",
    gpsUrl: "",
    roomNumber:
      stayType === "Alojamiento completo" ? "1" : "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const isValid =
    form.canton &&
    form.distrito &&
    form.barrio &&
    form.senas &&
    form.gpsUrl &&
    (stayType !== "Habitación privada" || form.roomNumber);

  return (
    <div className="h-screen bg-white flex flex-col overflow-hidden">
   
      <header className="flex items-center justify-between px-10 py-6 border-b">
        <h1 className="font-bold text-2xl text-[#99BFA1]">LimonT&H</h1>
        <button
          onClick={() => navigate("/")}
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition"
        >
          <FaTimes className="text-xl text-gray-600" />
        </button>
      </header>

      <main className="flex-1 py-10 overflow-hidden">
        <div className="mx-auto w-full max-w-xl px-6">
          <h2 className="text-4xl font-bold mb-3 text-center">
            Confirma tu dirección
          </h2>
          <p className="text-gray-500 mb-10 text-center">
            Esta información ayuda a los huéspedes a ubicar tu alojamiento
          </p>

          <div className="space-y-6">
       
            <div>
              <label className="block text-sm font-semibold mb-1">País</label>
              <input
                value="Costa Rica"
                disabled
                className="w-full rounded-xl border px-5 py-4 bg-gray-100 text-gray-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">Provincia</label>
              <input
                value="Limón"
                disabled
                className="w-full rounded-xl border px-5 py-4 bg-gray-100 text-gray-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">Cantón</label>
              <select
                value={form.canton}
                onChange={(e) =>
                  setForm({
                    ...form,
                    canton: e.target.value,
                    distrito: "",
                  })
                }
                className="w-full rounded-xl border px-5 py-4 bg-white focus:ring-2 focus:ring-[#99BFA1]"
              >
                <option value="" disabled>
                  Seleccione un cantón
                </option>
                {Object.keys(cantonesLimon).map((canton) => (
                  <option key={canton} value={canton}>
                    {canton}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">Distrito</label>
              <select
                name="distrito"
                value={form.distrito}
                onChange={handleChange}
                disabled={!form.canton}
                className="w-full rounded-xl border px-5 py-4 bg-white focus:ring-2 focus:ring-[#99BFA1] disabled:bg-gray-100"
              >
                <option value="" disabled>
                  Seleccione un distrito
                </option>
                {form.canton &&
                  cantonesLimon[form.canton].map((distrito) => (
                    <option key={distrito} value={distrito}>
                      {distrito}
                    </option>
                  ))}
              </select>
            </div>

            {stayType === "Habitación privada" ? (
              <div>
                <label className="block text-sm font-semibold mb-1">
                  Número de habitación
                </label>
                <input
                  name="roomNumber"
                  value={form.roomNumber}
                  onChange={handleChange}
                  className="w-full rounded-xl border px-5 py-4 focus:ring-2 focus:ring-[#99BFA1]"
                />
              </div>
            ) : (
              <div>
                <label className="block text-sm font-semibold mb-1">
                  Número de habitación
                </label>
                <input
                  value="1"
                  disabled
                  className="w-full rounded-xl border px-5 py-4 bg-gray-100 text-gray-500"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold mb-1">Barrio</label>
              <input
                name="barrio"
                value={form.barrio}
                onChange={handleChange}
                className="w-full rounded-xl border px-5 py-4 focus:ring-2 focus:ring-[#99BFA1]"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">
                Señas exactas
              </label>
              <textarea
                name="senas"
                value={form.senas}
                onChange={handleChange}
                rows={3}
                className="w-full rounded-xl border px-5 py-4 focus:ring-2 focus:ring-[#99BFA1]"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">
                URL de referencia GPS
              </label>
              <input
                name="gpsUrl"
                value={form.gpsUrl}
                onChange={handleChange}
                className="w-full rounded-xl border px-5 py-4 focus:ring-2 focus:ring-[#99BFA1]"
              />
            </div>
          </div>

          <div className="flex justify-center gap-6 mt-10">
            <button
              onClick={() => navigate(-1)}
              className="px-10 py-4 rounded-2xl font-bold text-lg bg-gray-200 text-gray-600 hover:bg-gray-300"
            >
              ← Atrás
            </button>

            <button
              disabled={!isValid}
              onClick={() => {
                setHospedajeData({
                  ...hospedajeData,
                  ubicacion: form,
                  roomNumber:
                    stayType === "Alojamiento completo"
                      ? "1"
                      : form.roomNumber,
                });

                navigate("/registro/hospedaje/datos");
              }}
              className={`px-14 py-4 rounded-2xl font-bold text-lg transition-all ${
                isValid
                  ? "bg-gradient-to-r from-[#99BFA1] to-[#8BB593] text-white hover:shadow-xl hover:scale-[1.02]"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              Continuar
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
