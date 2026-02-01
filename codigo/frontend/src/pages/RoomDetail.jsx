import { useNavigate } from "react-router-dom";
import { FaUserCircle, FaBed, FaBath, FaWifi, FaArrowLeft } from "react-icons/fa";

export default function RoomDetail() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#fdfbf7]">
      {/* HEADER */}
      <header className="bg-white border-b px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <FaArrowLeft />
          </button>

          <h1 className="font-bold text-2xl text-[#99BFA1]">
            LimonT&H
          </h1>
        </div>
      </header>

      {/* CONTENIDO */}
      <main className="px-6 py-10">
        <div className="max-w-6xl mx-auto space-y-10">

          {/* GALERÍA */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2 h-80 bg-gray-200 rounded-xl flex items-center justify-center text-gray-400">
              Foto principal
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="h-38 bg-gray-200 rounded-xl flex items-center justify-center text-gray-400">
                Foto
              </div>
              <div className="h-38 bg-gray-200 rounded-xl flex items-center justify-center text-gray-400">
                Foto
              </div>
              <div className="h-38 bg-gray-200 rounded-xl flex items-center justify-center text-gray-400">
                Foto
              </div>
              <div className="h-38 bg-gray-200 rounded-xl flex items-center justify-center text-gray-400">
                Foto
              </div>
            </div>
          </div>

          {/* INFO PRINCIPAL */}
          <div className="flex flex-col lg:flex-row gap-12">

            {/* IZQUIERDA */}
            <div className="flex-1 space-y-6">
              <div>
                <h2 className="text-3xl font-bold text-gray-800">
                  Apartamento moderno en la playa
                </h2>
                <p className="text-gray-500 mt-1">
                  Limón · Costa Rica
                </p>
              </div>

              {/* DETALLES */}
              <div className="flex gap-8 text-gray-600">
                <span className="flex items-center gap-2">
                  <FaUserCircle /> 2 huéspedes
                </span>
                <span className="flex items-center gap-2">
                  <FaBed /> 1 habitación
                </span>
                <span className="flex items-center gap-2">
                  <FaBath /> 1 baño
                </span>
                <span className="flex items-center gap-2">
                  <FaWifi /> WiFi
                </span>
              </div>

              {/* DESCRIPCIÓN */}
              <div>
                <h3 className="font-semibold text-lg mb-2">
                  Descripción
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Disfruta de una estadía cómoda en este apartamento completamente
                  equipado, ideal para parejas o viajeros que buscan descanso cerca
                  del mar. Incluye cocina, aire acondicionado y acceso rápido a la
                  playa.
                </p>
              </div>

              {/* SERVICIOS */}
              <div>
                <h3 className="font-semibold text-lg mb-2">
                  Servicios incluidos
                </h3>
                <ul className="grid grid-cols-2 gap-2 text-gray-600">
                  <li>✔ Cocina equipada</li>
                  <li>✔ Aire acondicionado</li>
                  <li>✔ WiFi</li>
                  <li>✔ Estacionamiento</li>
                </ul>
              </div>
            </div>

            {/* DERECHA */}
            <div className="w-full lg:w-96 bg-white border rounded-2xl p-6 shadow-sm space-y-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-800">
                  ₡48,000 / noche
                </p>
                <p className="text-sm text-gray-400">CRC</p>
              </div>

              <button className="w-full bg-[#99BFA1] text-white py-3 rounded-xl font-semibold hover:bg-[#88ad90] transition">
                Reservar ahora
              </button>

              {/* ANFITRIÓN */}
              <div className="pt-6 border-t">
                <h4 className="font-semibold mb-3">
                  Anfitrión
                </h4>

                <div className="flex items-center gap-4">
                  <FaUserCircle className="text-4xl text-gray-400" />
                  <div>
                    <p className="font-semibold text-gray-800">
                      Carlos Méndez
                    </p>
                    <p className="text-sm text-gray-500">
                      Anfitrión verificado
                    </p>
                  </div>
                </div>

                <button className="mt-4 w-full border rounded-xl py-2 text-sm font-semibold hover:bg-gray-50 transition">
                  Contactar anfitrión
                </button>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
