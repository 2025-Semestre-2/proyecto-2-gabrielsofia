import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function LoginModal({ isOpen, onClose }) {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCloseToHome = () => {
    onClose();
    navigate("/");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isLogin && password !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    onClose();
  };

  return (
  
    <div className="fixed inset-0 z-[9999] bg-black/40 backdrop-blur-sm">

      <div
        className="fixed top-1/2 left-1/2
        -translate-x-1/2 -translate-y-1/2
        bg-white rounded-2xl shadow-2xl
        w-[420px] max-w-[90vw]
        border border-gray-200
        overflow-hidden"
      >
  
        <button
          onClick={handleCloseToHome}
          className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md border hover:bg-gray-50 transition"
        >
          <X size={20} />
        </button>

   
        <div className="pt-10 pb-8 text-center">
          <h1 className="font-bold text-3xl text-[#99BFA1]">LimonT&H</h1>
          <p className="text-gray-500 text-sm mt-1">
            Turismo y Hospedaje
          </p>
        </div>

   
        <div className="px-8 pb-10">
          <h2 className="text-xl font-bold text-center mb-2">
            {isLogin
              ? "Inicia sesión en tu cuenta"
              : "Crea una nueva cuenta"}
          </h2>

          <p className="text-sm text-gray-500 text-center mb-8">
            {isLogin
              ? "Ingresa tus credenciales para continuar"
              : "Completa el formulario para registrarte"}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <>
                <input
                  type="text"
                  placeholder="Nombre completo"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full box-border px-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-[#99BFA1]"
                  required
                />

                <input
                  type="text"
                  placeholder="Nombre de usuario"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full box-border px-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-[#99BFA1]"
                  required
                />
              </>
            )}

            <input
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full box-border px-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-[#99BFA1]"
              required
            />

            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full box-border px-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-[#99BFA1]"
              required
            />

            {!isLogin && (
              <input
                type="password"
                placeholder="Confirmar contraseña"
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(e.target.value)
                }
                className="w-full box-border px-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-[#99BFA1]"
                required
              />
            )}

            <button
              type="submit"
              className="w-full bg-[#99BFA1] text-white py-3 rounded-lg font-semibold hover:bg-[#8bb394] transition shadow mt-2"
            >
              {isLogin ? "Iniciar sesión" : "Crear cuenta"}
            </button>
          </form>


          <div className="text-center pt-8 mt-8 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              {isLogin ? "¿No tienes cuenta?" : "¿Ya tienes cuenta?"}
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="ml-2 font-semibold text-[#99BFA1] hover:underline"
              >
                {isLogin ? "Regístrate" : "Inicia sesión"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
