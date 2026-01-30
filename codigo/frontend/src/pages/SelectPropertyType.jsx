import { useState } from "react";
import { useNavigate } from "react-router-dom";

const options = [
  "Casa",
  "Apartamento",
  "Cabaña",
  "Casa rodante",
  "Castillo",
  "Contenedores",
  "Domo",
  "Hotel",
  "Tienda de campaña",
  "Casa del árbol",
];

export default function SelectPropertyType() {
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex flex-col">
      
      {/* HEADER */}
      <header className="flex items-center justify-between px-10 py-6 border-b">
        <h1 className="font-bold text-2xl text-[#99BFA1]">
          LimonT&H
        </h1>

        <button
          onClick={() => navigate("/")}
          className="border rounded-full px-5 py-2 text-sm hover:bg-gray-100 transition"
        >
          Salir
        </button>
      </header>

      {/* CONTENIDO */}
      <main className="flex-1 flex items-center justify-center px-10">
        <div className="w-full max-w-4xl">
          
          <h2 className="text-4xl font-bold mb-10">
            ¿Cuál de estas opciones describe mejor tu espacio?
          </h2>

          {/* OPCIONES */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {options.map((option) => (
              <button
                key={option}
                onClick={() => setSelected(option)}
                className={`border rounded-xl px-6 py-5 text-left font-medium transition
                  ${
                    selected === option
                      ? "border-[#99BFA1] bg-[#99BFA1]/10"
                      : "border-gray-200 hover:border-[#99BFA1]"
                  }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="border-t px-10 py-6 flex justify-between items-center">
        <button
          onClick={() => navigate(-1)}
          className="text-sm font-medium hover:underline"
        >
          Atrás
        </button>

        <button
          disabled={!selected}
          onClick={() => {
            console.log("Tipo de alojamiento:", selected);
            navigate("/registro/hospedaje/ubicacion");
          }}
          className={`px-8 py-3 rounded-lg font-semibold transition
            ${
              selected
                ? "bg-[#E69C9C] text-white hover:bg-[#dc8f8f]"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
        >
          Continuar
        </button>
      </footer>
    </div>
  );
}
