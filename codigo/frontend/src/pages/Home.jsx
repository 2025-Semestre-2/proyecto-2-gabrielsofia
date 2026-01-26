import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate(); // ✅ aquí adentro

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Buscador de Hoteles</h1>

      <input
        className="border p-2 mr-2"
        placeholder="Ubicación"
      />

      <button
        onClick={() => navigate("/admin/hoteles")}
        className="bg-blue-600 text-white px-4 py-2 mr-2"
      >
        Buscar
      </button>
    </div>
  );
}
