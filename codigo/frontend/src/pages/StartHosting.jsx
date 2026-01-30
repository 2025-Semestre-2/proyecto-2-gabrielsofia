import { useNavigate } from "react-router-dom";
import { ArrowRight, X, CheckCircle, MapPin, Image, DollarSign, Users, Star } from "lucide-react";

export default function StartHosting() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex flex-col">
      
      {/* HEADER */}
      <header className="flex items-center justify-between px-8 py-6 border-b border-gray-200">
        {/* Logo simple */}
        <div>
          <h1 className="font-bold text-2xl text-[#99BFA1]">
            LimonT&H
          </h1>
        </div>

        {}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 border border-gray-300 rounded-full px-5 py-2.5 text-sm hover:bg-gray-100 transition-all duration-200"
        >
          <X size={16} />
        </button>
      </header>

      {/* CONTENIDO PRINCIPAL */}
      <main className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-6xl">
          
          {/* TÍTULO PRINCIPAL */}
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4 leading-tight">
              Comienza tu viaje como <br />
              anfitrión en <span className="text-[#99BFA1]">LimonT&H</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Sigue estos sencillos pasos para compartir tu espacio o experiencia 
              y comenzar a generar ingresos.
            </p>
          </div>

          {/* PASOS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            
            {/* PASO 1 */}
            <div className="relative bg-white rounded-2xl p-8 border border-gray-200 shadow-sm hover:shadow-lg transition-shadow duration-300 group">
              {/* Número del paso */}
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-[#99BFA1] rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                1
              </div>
              
              {/* Icono */}
              <div className="w-16 h-16 bg-[#99BFA1]/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <MapPin className="w-8 h-8 text-[#99BFA1]" />
              </div>
              
              <h3 className="font-bold text-xl text-gray-900 mb-3">
                Describe tu espacio
              </h3>
              <p className="text-gray-600 mb-6">
                Comparte información básica como ubicación, capacidad y características 
                principales de tu propiedad.
              </p>
              
              {/* Lista de beneficios */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#99BFA1]" />
                  <span className="text-sm text-gray-700">Ubicación exacta</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#99BFA1]" />
                  <span className="text-sm text-gray-700">Capacidad de huéspedes</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#99BFA1]" />
                  <span className="text-sm text-gray-700">Tipo de propiedad</span>
                </div>
              </div>
              
              {/* Imagen de ejemplo */}
              <div className="mt-8 h-40 bg-gray-50 rounded-xl flex items-center justify-center border border-gray-200">
                <Users className="w-12 h-12 text-gray-400" />
              </div>
            </div>

            {/* PASO 2 */}
            <div className="relative bg-white rounded-2xl p-8 border border-gray-200 shadow-sm hover:shadow-lg transition-shadow duration-300 group">
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-[#E69C9C] rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                2
              </div>
              
              <div className="w-16 h-16 bg-[#E69C9C]/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Image className="w-8 h-8 text-[#E69C9C]" />
              </div>
              
              <h3 className="font-bold text-xl text-gray-900 mb-3">
                Haz que destaque
              </h3>
              <p className="text-gray-600 mb-6">
                Sube fotos de alta calidad, escribe una descripción atractiva y 
                destaca las mejores características de tu espacio.
              </p>
              
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#E69C9C]" />
                  <span className="text-sm text-gray-700">Fotos profesionales</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#E69C9C]" />
                  <span className="text-sm text-gray-700">Descripción detallada</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#E69C9C]" />
                  <span className="text-sm text-gray-700">Comodidades clave</span>
                </div>
              </div>
              
              <div className="mt-8 h-40 bg-gray-50 rounded-xl flex items-center justify-center border border-gray-200">
                <Star className="w-12 h-12 text-gray-400" />
              </div>
            </div>

            {/* PASO 3 */}
            <div className="relative bg-white rounded-2xl p-8 border border-gray-200 shadow-sm hover:shadow-lg transition-shadow duration-300 group">
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-[#99BFA1] rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                3
              </div>
              
              <div className="w-16 h-16 bg-[#99BFA1]/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <DollarSign className="w-8 h-8 text-[#99BFA1]" />
              </div>
              
              <h3 className="font-bold text-xl text-gray-900 mb-3">
                Termina y publica
              </h3>
              <p className="text-gray-600 mb-6">
                Establece tu precio, configura las reglas y políticas, 
                y publica tu anuncio para recibir reservaciones.
              </p>
              
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#99BFA1]" />
                  <span className="text-sm text-gray-700">Precio competitivo</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#99BFA1]" />
                  <span className="text-sm text-gray-700">Políticas claras</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#99BFA1]" />
                  <span className="text-sm text-gray-700">Disponibilidad</span>
                </div>
              </div>
              
              <div className="mt-8 h-40 bg-gray-50 rounded-xl flex items-center justify-center border border-gray-200">
                <DollarSign className="w-12 h-12 text-gray-400" />
              </div>
            </div>
          </div>

        </div>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-gray-200 bg-white px-8 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
            </div>
            
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate("/")}
                className="border border-gray-300 rounded-lg px-6 py-3 font-medium hover:bg-gray-50 transition"
              >
                Volver al inicio
              </button>
              
              <button
  onClick={() => navigate("/registro/hospedaje/tipo")}
  className="bg-[#E69C9C] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#dc8f8f] transition"
>
  Comencemos
</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}