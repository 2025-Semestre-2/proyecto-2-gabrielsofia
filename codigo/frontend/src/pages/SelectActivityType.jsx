import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaLandmark,
  FaPaintBrush,
  FaImages,
  FaUtensils,
  FaConciergeBell,
  FaWineGlassAlt,
  FaDumbbell,
  FaRoute,
  FaUniversity,
  FaTree,
  FaPlane,
  FaWater,
  FaPaw,
  FaTimes,
} from "react-icons/fa";


const activityOptions = [
  { label: "Ruta arquitectónica", icon: <FaLandmark /> },
  { label: "Taller de arte", icon: <FaPaintBrush /> },
  { label: "Visita a galerías", icon: <FaImages /> },
  { label: "Experiencia gastronómica", icon: <FaUtensils /> },
  { label: "Clase de cocina", icon: <FaConciergeBell /> },
  { label: "Catas", icon: <FaWineGlassAlt /> },
  { label: "Entrenamiento", icon: <FaDumbbell /> },
  { label: "Recorrido cultural", icon: <FaRoute /> },
  { label: "Visita al museo", icon: <FaUniversity /> },
  { label: "Experiencia al aire libre", icon: <FaTree /> },
  { label: "Experiencia de vuelo", icon: <FaPlane /> },
  { label: "Deporte acuático", icon: <FaWater /> },
  { label: "Experiencia con animales", icon: <FaPaw /> },
];


const cantonesLimon = {
  Limón: ["Limón", "Valle La Estrella", "Río Blanco", "Matama"],
  Pococí: ["Guápiles", "Jiménez", "La Rita", "Roxana", "Cariari", "Colorado", "La Colonia"],
  Siquirres: ["Siquirres", "Pacuarito", "Florida", "Germania", "Cairo", "Alegría", "Reventazón"],
  Talamanca: ["Bratsi", "Sixaola", "Cahuita", "Telire"],
  Matina: ["Matina", "Batán", "Carrandi"],
  Guácimo: ["Guácimo", "Mercedes", "Pocora", "Río Jiménez", "Duacarí"],
};

export default function SelectActivityType() {
  const navigate = useNavigate();

  const [activityType, setActivityType] = useState(null);
  const [form, setForm] = useState({
    canton: "",
    distrito: "",
    barrio: "",
    senas: "",
    gpsUrl: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const isValid =
    activityType &&
    form.canton &&
    form.distrito &&
    form.barrio &&
    form.senas &&
    form.gpsUrl;

  return (
    <div className="h-screen overflow-hidden bg-white flex flex-col">
   
      <header className="flex items-center justify-between px-10 py-6 border-b">
        <h1 className="font-bold text-2xl text-[#99BFA1]">LimonT&H</h1>
        <button
          onClick={() => navigate("/")}
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition"
        >
          <FaTimes className="text-xl text-gray-600" />
        </button>
      </header>

      <main className="flex-1 overflow-auto px-10 py-14">
        <div className="w-full max-w-6xl mx-auto">

          <h2 className="text-4xl font-bold mb-3 text-center">
            ¿Qué experiencia ofrecerás a los participantes?
          </h2>
          <p className="text-gray-500 mb-12 text-center">
            Selecciona la opción que mejor describa tu actividad
          </p>

          <div className="flex justify-center mb-20">
            <div className="grid grid-cols-[repeat(3,300px)] gap-6">
              {activityOptions.map((option) => {
                const isSelected = activityType === option.label;
                return (
                  <button
                    key={option.label}
                    type="button"
                    onClick={() => setActivityType(option.label)}
                    className={`h-60 rounded-xl border transition-all flex flex-col items-center justify-center gap-3
                      ${
                        isSelected
                          ? "border-[#99BFA1] bg-[#99BFA1]/10 shadow-md scale-[1.02]"
                          : "border-gray-200 hover:border-[#99BFA1]"
                      }`}
                  >
                    <div className={`text-4xl ${isSelected ? "text-[#99BFA1]" : "text-gray-400"}`}>
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

          <div className="bg-gradient-to-r from-white to-[#F1F5F3] rounded-2xl p-10 shadow-md">
            <h3 className="text-3xl font-bold mb-3 text-center">
              ¿Dónde se realizará la experiencia?
            </h3>
            <p className="text-gray-600 mb-10 text-center">
              Esta información ayuda a los participantes a ubicar el punto de encuentro
            </p>

            <div className="space-y-5 max-w-xl mx-auto">

              <label className="text-sm font-semibold">País</label>
              <input
                value="Costa Rica"
                disabled
                className="w-full rounded-xl border px-5 py-4 bg-gray-100 text-gray-500"
              />

              <label className="text-sm font-semibold">Provincia</label>
              <input
                value="Limón"
                disabled
                className="w-full rounded-xl border px-5 py-4 bg-gray-100 text-gray-500"
              />

              <label className="text-sm font-semibold">Cantón</label>
              <select
                name="canton"
                value={form.canton}
                onChange={(e) =>
                  setForm({ ...form, canton: e.target.value, distrito: "" })
                }
                className="w-full rounded-xl border px-5 py-4"
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

              <label className="text-sm font-semibold">Distrito</label>
              <select
                name="distrito"
                value={form.distrito}
                onChange={handleChange}
                disabled={!form.canton}
                className="w-full rounded-xl border px-5 py-4 disabled:bg-gray-100"
              >
                <option value="" disabled>
                  Seleccione un distrito
                </option>
                {form.canton &&
                  cantonesLimon[form.canton].map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
              </select>

              <label className="text-sm font-semibold">Barrio</label>
              <input
                name="barrio"
                value={form.barrio}
                onChange={handleChange}
                className="w-full rounded-xl border px-5 py-4"
              />

              <label className="text-sm font-semibold">Señas exactas</label>
              <textarea
                name="senas"
                rows={3}
                value={form.senas}
                onChange={handleChange}
                className="w-full rounded-xl border px-5 py-4"
              />

              <label className="text-sm font-semibold">
                URL de referencia GPS
              </label>
              <input
                name="gpsUrl"
                value={form.gpsUrl}
                onChange={handleChange}
                className="w-full rounded-xl border px-5 py-4"
              />
            </div>
          </div>

          <div className="flex justify-center gap-6 mt-12 mb-10">
            <button
              onClick={() => navigate(-1)}
              className="px-10 py-5 rounded-2xl font-bold text-2xl bg-gray-200 text-gray-600 hover:bg-gray-300"
            >
              ← Atrás
            </button>

            <button
              disabled={!isValid}
              onClick={() => navigate("/registro/actividad/datos")}
              className={`px-14 py-5 rounded-2xl font-bold text-2xl transition-all ${
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
