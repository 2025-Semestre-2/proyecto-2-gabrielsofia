import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar({ onOpenLogin, onOpenServiceType }) {
  const [entrada, setEntrada] = useState("");
  const [salida, setSalida] = useState("");
  const [personas, setPersonas] = useState(1);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const navigate = useNavigate();

  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setVisible(!(currentScrollY > lastScrollY && currentScrollY > 100));
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
      <div className="flex justify-center pt-6 px-6">
        <div className="w-full max-w-5xl bg-white rounded-2xl shadow-lg border border-gray-200">

          {/* FILA SUPERIOR */}
          <div className="px-6 py-4 flex items-center justify-between gap-6">
            <h1 className="font-bold text-2xl text-[#99BFA1] whitespace-nowrap">
              LimonT&H
            </h1>

            <div className="flex gap-10 flex-1 justify-center">
              <button
  onClick={() => navigate("/actividades")}
  className="bg-[#E69C9C] text-white text-lg font-semibold px-10 py-4 rounded-full hover:bg-[#dc8f8f] transition shadow-md"
>
  Actividades
</button>

              <button
  onClick={() => navigate("/alquileres")}
  className="bg-[#E69C9C] text-white text-lg font-semibold px-10 py-4 rounded-full hover:bg-[#dc8f8f] transition shadow-md"
>
  Alquileres disponibles
</button>


              <button
                onClick={onOpenServiceType}
                className="bg-[#E69C9C] text-white text-lg font-semibold px-10 py-4 rounded-full hover:bg-[#dc8f8f] transition shadow-md"
              >
                Brinda tus servicios
              </button>
            </div>

            {/* BOTONES DERECHA */}
<div className="flex items-center gap-3 whitespace-nowrap">

  <button
    onClick={() => navigate("/admin")}
    className="bg-[#E69C9C] text-white px-5 py-2 rounded-full font-semibold hover:bg-[#dc8f8f] transition shadow-sm"
  >
    Administrar
  </button>

  <button
    onClick={onOpenLogin}
    className="bg-[#99BFA1] rounded-full px-6 py-3 text-base hover:shadow transition"
  >
    Iniciar sesión
  </button>

  <button
    onClick={() => navigate("/anfitrion")}
    className="px-4 py-2 rounded-lg bg-[#99BFA1] text-white font-semibold"
  >
    Modo anfitrión
  </button>

</div>

          </div>

          {/* BUSCADOR */}
          <div className="px-6 pb-5">
            <div className="flex bg-white rounded-xl border overflow-hidden text-sm">

              {/* DESTINO */}
              <div className="flex-1 px-4 py-3 border-r flex flex-col justify-center">
                <span className="text-[11px] font-semibold text-gray-600 mb-1">
                  DESTINO
                </span>
                <input
                  placeholder="¿A dónde?"
                  className="outline-none bg-transparent text-sm h-6 leading-6"
                />
              </div>

              {/* LLEGADA */}
              <div className="flex-1 px-4 py-3 border-r flex flex-col justify-center">
                <span className="text-[11px] font-semibold text-gray-600 mb-1">
                  LLEGADA
                </span>
                <input
                  type="date"
                  value={entrada}
                  min={getTodayDate()}
                  onChange={(e) => {
                    setEntrada(e.target.value);
                    if (salida && e.target.value > salida) setSalida("");
                  }}
                  className="outline-none bg-transparent text-sm h-6 leading-6"
                />
              </div>

              {/* SALIDA */}
              <div className="flex-1 px-4 py-3 border-r flex flex-col justify-center">
                <span className="text-[11px] font-semibold text-gray-600 mb-1">
                  SALIDA
                </span>
                <input
                  type="date"
                  min={entrada || getTomorrowDate()}
                  value={salida}
                  onChange={(e) => setSalida(e.target.value)}
                  disabled={!entrada}
                  className="outline-none bg-transparent text-sm h-6 leading-6"
                />
              </div>

              {/* PERSONAS */}
              <div className="flex-1 px-4 py-3 border-r flex flex-col justify-center">
                <span className="text-[11px] font-semibold text-gray-600 mb-1">
                  PERSONAS
                </span>
                <div className="flex items-center justify-between h-6">
                  <button
                    onClick={() => setPersonas(p => Math.max(1, p - 1))}
                    className="w-6 h-6 rounded-full border hover:bg-gray-100"
                  >
                    -
                  </button>
                  <span>{personas}</span>
                  <button
                    onClick={() => setPersonas(p => Math.min(30, p + 1))}
                    className="w-6 h-6 rounded-full border hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* BOTÓN BUSCAR */}
              <button className="bg-[#99BFA1] text-white px-6 font-semibold hover:bg-[#8bb394] transition rounded-r-xl">
                Buscar
              </button>
            </div>
          </div>

        </div>
      </div>
    </nav>
  );
}
