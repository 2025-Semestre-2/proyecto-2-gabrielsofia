import { useEffect } from "react";

export default function LoginModal({ onClose }) {

  useEffect(() => {
    // Bloquear scroll
    document.body.style.overflow = "hidden";
    document.body.style.height = "100vh";
    
    // Prevenir que se cierre con ESC
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    
    window.addEventListener("keydown", handleEsc);
    
    return () => {
      document.body.style.overflow = "auto";
      document.body.style.height = "auto";
      window.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  return (
    <>
      {/* FONDO BLANCO QUE CUBRE ABSOLUTAMENTE TODO */}
      <div className="fixed inset-0 z-[9998] bg-white" />
      
      {/* MODAL SOBRE EL FONDO BLANCO */}
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
        
        {/* MODAL */}
        <div className="relative bg-white rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden border border-gray-300">

          {/* CERRAR */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-gray-500 hover:text-black text-2xl z-10 bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-md"
          >
            ✕
          </button>

          {/* CONTENIDO */}
          <div className="flex flex-col lg:flex-row min-h-[600px]">

            {/* IZQUIERDA */}
            <div className="lg:w-2/5 bg-gradient-to-br from-[#E69C9C] to-[#dc8f8f] p-8 flex flex-col justify-center items-center text-white">
              <div className="text-center">
                <h3 className="text-3xl font-bold mb-4">¡Bienvenido!</h3>
                <p className="text-lg opacity-90">
                  Accede a tu cuenta para gestionar tus reservas y disfrutar de beneficios exclusivos.
                </p>
                <div className="mt-8 text-6xl">🏝️</div>
              </div>
            </div>

            {/* DERECHA */}
            <div className="lg:w-3/5 p-10 flex flex-col justify-center">

              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Iniciar sesión</h2>
                <p className="text-gray-600">Ingresa tus credenciales para acceder a tu cuenta</p>
              </div>

              <form className="space-y-6">
                <div>
                  <input
                    type="text"
                    placeholder="Usuario o correo electrónico"
                    className="w-full border border-gray-300 rounded-xl px-5 py-4 text-lg focus:outline-none focus:ring-2 focus:ring-[#E69C9C] focus:border-transparent"
                    autoFocus
                  />
                </div>

                <div>
                  <input
                    type="password"
                    placeholder="Contraseña"
                    className="w-full border border-gray-300 rounded-xl px-5 py-4 text-lg focus:outline-none focus:ring-2 focus:ring-[#E69C9C] focus:border-transparent"
                  />
                </div>

                <div className="flex justify-between items-center">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 cursor-pointer" />
                    <span className="text-gray-700">Recordar sesión</span>
                  </label>
                  <button type="button" className="text-[#E69C9C] hover:underline">
                    ¿Olvidaste tu contraseña?
                  </button>
                </div>

                <button 
                  type="submit"
                  className="w-full bg-[#E69C9C] hover:bg-[#dc8f8f] text-white text-lg font-semibold py-4 rounded-xl transition shadow-md"
                >
                  Continuar
                </button>
              </form>

              <div className="mt-8 pt-6 border-t text-center">
                <p className="text-gray-600">
                  ¿No tienes cuenta?{" "}
                  <button type="button" className="text-[#E69C9C] font-semibold hover:underline">
                    Regístrate aquí
                  </button>
                </p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}