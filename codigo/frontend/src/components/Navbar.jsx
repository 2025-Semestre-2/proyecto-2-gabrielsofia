import { useState, useEffect } from "react";

export default function Navbar({ onOpenLogin, onOpenServiceType }) {  
  const [entrada, setEntrada] = useState("");
  const [salida, setSalida] = useState("");
  const [personas, setPersonas] = useState(1);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showLogin, setShowLogin] = useState(false);

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

  const handleLoginClick = () => {
    setShowLogin(true);
    if (onOpenLogin) onOpenLogin(); // Notificamos al App
  };

  const handleCloseLogin = () => {
    setShowLogin(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-transform duration-300
        ${visible ? "translate-y-0" : "-translate-y-full"}`}
      >
        {/* CONTENEDOR CENTRADO */}
        <div className="flex justify-center pt-6 px-6">
          <div className="w-full max-w-5xl bg-white rounded-2xl shadow-lg border border-gray-200">

            {/* FILA SUPERIOR */}
            <div className="px-6 py-4 flex items-center justify-between gap-6">

              {/* LOGO */}
              <h1 className="font-bold text-2xl text-[#99BFA1] whitespace-nowrap">
                LimonT&H
              </h1>

              {/* BOTONES CENTRALES */}
              <div className="flex gap-10 flex-1 justify-center">
                <button className="bg-[#E69C9C] text-white text-lg font-semibold px-10 py-4 rounded-full hover:bg-[#dc8f8f] transition shadow-md">
                  Actividades
                </button>

                <button className="bg-[#E69C9C] text-white text-lg font-semibold px-10 py-4 rounded-full hover:bg-[#dc8f8f] transition shadow-md">
                  Alquileres disponibles
                </button>

                <button
  onClick={onOpenServiceType}
  className="bg-[#E69C9C] text-white text-lg font-semibold px-10 py-4 rounded-full hover:bg-[#dc8f8f] transition shadow-md"
>
  Brinda tus servicios
</button>
              </div>

              {/* LOGIN */}
              <button
                onClick={handleLoginClick}  
                className="bg-[#99BFA1] rounded-full px-6 py-3 text-base hover:shadow transition whitespace-nowrap"
              >
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
                    min={getTodayDate()}
                    onChange={(e) => {
                      setEntrada(e.target.value);
                      if (salida && e.target.value > salida) {
                        setSalida("");
                      }
                    }}
                    className="outline-none w-full bg-transparent text-sm"
                  />
                </div>

                <div className="flex-1 px-4 py-3 border-r">
                  <div className="text-[11px] font-semibold text-gray-600 mb-1">
                    SALIDA
                  </div>
                  <input
                    type="date"
                    min={entrada || getTomorrowDate()}
                    value={salida}
                    onChange={(e) => setSalida(e.target.value)}
                    disabled={!entrada}
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

                <button className="bg-[#99BFA1] text-white px-6 font-semibold hover:bg-[#8bb394] transition rounded-r-xl">
                  Buscar
                </button>
              </div>
            </div>

          </div>
        </div>
      </nav>
    </>
  );
}