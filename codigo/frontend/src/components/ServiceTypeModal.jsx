import { useState, useEffect } from "react";
import { X, Hotel, Map } from "lucide-react";

export default function ServiceTypeModal({ isOpen, onClose, onSelect }) {
  const [selected, setSelected] = useState(null);


  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleContinue = () => {
    if (!selected) return;
    onSelect(selected);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-black/40 backdrop-blur-sm">

      <div
        className="fixed top-1/2 left-1/2
                   -translate-x-1/2 -translate-y-1/2
                   bg-white rounded-2xl shadow-2xl
                   w-[460px] max-w-[90vw]
                   border border-gray-200"
      >

        <button
          onClick={onClose}
          className="absolute -top-3 -right-3 bg-white rounded-full p-2 shadow-lg border hover:bg-gray-50 transition"
        >
          <X size={20} />
        </button>

       
        <div className="pt-10 pb-6 text-center">
          <h1 className="font-bold text-3xl text-[#99BFA1]">LimonT&H</h1>
          <p className="text-gray-500 text-sm mt-1">
            Selecciona el tipo de servicio
          </p>
        </div>

     
        <div className="px-8 pb-10">
          <h2 className="text-xl font-bold text-center mb-8">
            ¿Qué deseas registrar?
          </h2>

        
          <div className="grid grid-cols-1 gap-4">
           
            <button
              type="button"
              onClick={() => setSelected("hospedaje")}
              className={`border rounded-xl p-6 flex items-center gap-4 transition
                ${
                  selected === "hospedaje"
                    ? "border-[#99BFA1] bg-[#99BFA1]/10"
                    : "border-gray-200 hover:border-[#99BFA1]"
                }`}
            >
              <div className="bg-[#99BFA1]/20 p-3 rounded-full">
                <Hotel className="text-[#99BFA1]" />
              </div>
              <div className="text-left">
                <p className="font-semibold">Hospedaje</p>
                <p className="text-sm text-gray-500">
                  Hoteles, hostales, casas, departamentos, cabañas
                </p>
              </div>
            </button>

     
            <button
              type="button"
              onClick={() => setSelected("actividades")}
              className={`border rounded-xl p-6 flex items-center gap-4 transition
                ${
                  selected === "actividades"
                    ? "border-[#99BFA1] bg-[#99BFA1]/10"
                    : "border-gray-200 hover:border-[#99BFA1]"
                }`}
            >
              <div className="bg-[#99BFA1]/20 p-3 rounded-full">
                <Map className="text-[#99BFA1]" />
              </div>
              <div className="text-left">
                <p className="font-semibold">Actividades</p>
                <p className="text-sm text-gray-500">
                  Tours, experiencias, aventuras y actividades turísticas
                </p>
              </div>
            </button>
          </div>


          <button
            onClick={handleContinue}
            disabled={!selected}
            className={`w-full mt-8 py-3 rounded-lg font-semibold transition
              ${
                selected
                  ? "bg-[#99BFA1] text-white hover:bg-[#8bb394]"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
          >
            Continuar
          </button>
        </div>
      </div>
    </div>
  );
}
