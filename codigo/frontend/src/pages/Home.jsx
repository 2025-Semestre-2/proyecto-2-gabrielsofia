export default function HomePage() {
  return (
    <div className="min-h-screen">
      <FeaturedSection />
      <IdeasSection />
      <ExperiencesSection />
    </div>
  );
}

function Input({ label, ...props }) {
  return (
    <div className="flex flex-col px-4 py-3 border-r last:border-r-0">
      <span className="text-xs font-semibold">{label}</span>
      <input
        className="outline-none text-sm"
        {...props}
      />
    </div>
  );
}

//DESTACADO
function FeaturedSection() {
  return (
    <section className="max-w-7xl mx-auto px-6 my-16">
      <div className="bg-[#f7f7f7] rounded-2xl p-10 grid md:grid-cols-2 gap-10">
        <div>
          <p className="uppercase text-xs text-gray-500">Te mostramos</p>
          <h2 className="text-3xl font-semibold mt-2">
            Una maravilla <br /> para rentar
          </h2>
          <button className="mt-6 bg-black text-white px-5 py-2 rounded-lg text-sm">
            Ir ahora
          </button>
        </div>

        <div className="bg-gray-200 rounded-xl h-56 flex items-center justify-center text-gray-500">
          Imagen próximamente
        </div>
      </div>
    </section>
  );
}

//IDEAS
function IdeasSection() {
  const ideas = ["Apartamento", "Casa", "Cabaña", "Bungalow"];

  return (
    <section className="max-w-7xl mx-auto px-6">
      <h3 className="text-xl font-semibold mb-6">Ideas para tu próximo viaje</h3>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {ideas.map((item) => (
          <div
            key={item}
            className="bg-white rounded-xl shadow-sm p-5 hover:shadow-md transition"
          >
            <div className="bg-gray-200 h-32 rounded mb-4 flex items-center justify-center text-sm text-gray-500">
              Imagen
            </div>
            <h4 className="font-semibold">{item}</h4>
            <p className="text-sm text-gray-500">Costa Rica</p>
          </div>
        ))}
      </div>
    </section>
  );
}

//EXPERIENCIAS 
function ExperiencesSection() {
  return (
    <section className="max-w-7xl mx-auto px-6 my-16">
      <h3 className="text-xl font-semibold mb-6">Descubre nuevas experiencias</h3>

      <div className="grid md:grid-cols-2 gap-6">
        <ExperienceCard title="Actividades que puedes probar" />
        <ExperienceCard title="Refugios para relajarte" />
      </div>
    </section>
  );
}

function ExperienceCard({ title }) {
  return (
    <div className="bg-[#f7f7f7] rounded-2xl p-8 flex flex-col justify-between h-56">
      <h4 className="text-lg font-semibold">{title}</h4>
      <button className="bg-white border px-4 py-2 rounded-lg w-fit text-sm">
        Me interesa
      </button>
    </div>
  );
}