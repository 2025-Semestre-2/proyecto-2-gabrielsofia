import { useState } from "react";

export default function Navbar() {
  const [entrada, setEntrada] = useState("");
  const [salida, setSalida] = useState("");
  const [personas, setPersonas] = useState(1);

  return (
    <nav className="fixed top-0 w-full bg-[#F7F3F0] border-b border-gray-200 z-50">

      {/* BARRA SUPERIOR */}
      <div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-between text-sm">

        {/* LOGO */}
        <h1 className="font-semibold text-[#99BFA1]">
          LimonT&H
        </h1>

        {/* LOGIN ARRIBA A LA IZQUIERDA */}
        <button className="border rounded-full px-4 py-1 bg-white hover:shadow transition">
          Iniciar sesión
        </button>
      </div>

      {/* BUSCADOR */}
      <div className="max-w-7xl mx-auto px-6 pb-4 flex justify-center">
        <div className="flex w-full md:w-[70%] bg-white rounded-full shadow-sm overflow-hidden border text-sm">

          {/* UBICACIÓN */}
          <div className="px-4 py-2 flex flex-col border-r">
            <span className="text-xs font-semibold">Ubicación</span>
            <input
              type="text"
              placeholder="¿A dónde vas?"
              className="outline-none"
            />
          </div>

          {/* ENTRADA */}
          <div className="px-4 py-2 flex flex-col border-r">
            <span className="text-xs font-semibold">Entrada</span>
            <input
              type="date"
              value={entrada}
              onChange={(e) => {
                setEntrada(e.target.value);
                if (salida && e.target.value >= salida) setSalida("");
              }}
              className="outline-none"
            />
          </div>

          {/* SALIDA */}
          <div className="px-4 py-2 flex flex-col border-r">
            <span className="text-xs font-semibold">Salida</span>
            <input
              type="date"
              min={entrada}
              value={salida}
              onChange={(e) => setSalida(e.target.value)}
              className="outline-none"
              disabled={!entrada}
            />
          </div>

          {/* PERSONAS */}
          <div className="px-4 py-2 flex flex-col border-r">
            <span className="text-xs font-semibold">Personas</span>
            <select
              value={personas}
              onChange={(e) => setPersonas(e.target.value)}
              className="outline-none bg-transparent"
            >
              {Array.from({ length: 30 }, (_, i) => i + 1).map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </div>

          {/* BOTÓN */}
          <button className="bg-[#99BFA1] text-white px-6 font-semibold hover:bg-[#8bb394] transition">
            Buscar
          </button>
        </div>
      </div>
    </nav>
  );
}
