export default function Home() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Buscador de Hoteles</h1>

      <input
        className="border p-2 mr-2"
        placeholder="Ubicación"
      />

      <button className="bg-blue-600 text-white px-4 py-2">
        Buscar
      </button>
    </div>
  );
}
