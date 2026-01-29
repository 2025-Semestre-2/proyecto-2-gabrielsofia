import { useState, useEffect } from "react";

export default function Navbar() {
  const [entrada, setEntrada] = useState("");
  const [salida, setSalida] = useState("");
  const [personas, setPersonas] = useState(1);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setVisible(false);
      } else {
        setVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-transform duration-300
      ${visible ? "translate-y-0" : "-translate-y-full"}`}
    >
      {/* CONTENEDOR CENTRADO */}
      <div className="flex justify-center pt-6 px-6">
        <div className="w-full max-w-5xl bg-white rounded-2xl shadow-lg border border-gray-200">

          {/* FILA SUPERIOR */}
          <div className="px-6 py-4 flex items-center justify-between">

            {/* LOGO */}
            <h1 className="font-bold text-2xl text-[#99BFA1]">
              LimonT&H
            </h1>

            {/* BOTONES CENTRALES */}
            <div className="flex justify-between w-[650px]">
              <button
                className="bg-[#E69C9C] text-white text-lg font-semibold
                px-10 py-5 scale-120 rounded-full hover:bg-[#dc8f8f]
                transition shadow-md"
              >
                Actividades
              </button>

              <button
                className="bg-[#E69C9C] text-white text-lg font-semibold
                px-10 py-5 scale-120 rounded-full hover:bg-[#dc8f8f]
                transition shadow-md"
              >
                Alquileres disponibles
              </button>

              <button
                className="bg-[#E69C9C] text-white text-lg font-semibold
                px-10 py-5 scale-120 rounded-full hover:bg-[#dc8f8f]
                transition shadow-md"
              >
                Brinda tus servicios
              </button>
            </div>

            {/* LOGIN */}
            <button className="border border-gray-300 rounded-full px-6 py-3 text-base hover:shadow transition">
              Iniciar sesión
            </button>
          </div>

          {/* BUSCADOR */}
          <div className="px-6 pb-5">
            <div className="flex bg-white rounded-xl border overflow-hidden text-sm">

              <div className="flex-1 px-4 py-3 border-r">
                <div className="text-[11px] font-semibold text-gray-600 mb-1">
                  DESTINO
                </div>
                <input
                  placeholder="¿A dónde?"
                  className="outline-none w-full bg-transparent text-sm"
                />
              </div>

              <div className="flex-1 px-4 py-3 border-r">
                <div className="text-[11px] font-semibold text-gray-600 mb-1">
                  LLEGADA
                </div>
                <input
                  type="date"
                  value={entrada}
                  onChange={(e) => setEntrada(e.target.value)}
                  className="outline-none w-full bg-transparent text-sm"
                />
              </div>

              <div className="flex-1 px-4 py-3 border-r">
                <div className="text-[11px] font-semibold text-gray-600 mb-1">
                  SALIDA
                </div>
                <input
                  type="date"
                  min={entrada}
                  value={salida}
                  onChange={(e) => setSalida(e.target.value)}
                  className="outline-none w-full bg-transparent text-sm"
                />
              </div>

              <div className="flex-1 px-4 py-3 border-r">
                <div className="text-[11px] font-semibold text-gray-600 mb-1">
                  PERSONAS
                </div>
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => setPersonas(p => Math.max(1, p - 1))}
                    className="w-6 h-6 rounded-full border flex items-center justify-center hover:bg-gray-100 text-sm"
                  >
                    -
                  </button>
                  <span className="text-sm">{personas}</span>
                  <button
                    onClick={() => setPersonas(p => Math.min(30, p + 1))}
                    className="w-6 h-6 rounded-full border flex items-center justify-center hover:bg-gray-100 text-sm"
                  >
                    +
                  </button>
                </div>
              </div>

              <button className="bg-[#99BFA1] text-white px-6 text-sm font-semibold hover:bg-[#8bb394] transition rounded-r-xl">
                Buscar
              </button>
            </div>
          </div>

        </div>
      </div>
    </nav>
  );
}
