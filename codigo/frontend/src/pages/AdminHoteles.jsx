import { useState } from "react";

export default function AdminHoteles() {
  const [hoteles, setHoteles] = useState([
    { id: 1, nombre: "Hotel Caribe", ubicacion: "Limón" },
    { id: 2, nombre: "Hotel Pacífico", ubicacion: "Puntarenas" }
  ]);

  const [nombre, setNombre] = useState("");
  const [ubicacion, setUbicacion] = useState("");

  function agregarHotel() {
    setHoteles([
      ...hoteles,
      {
        id: Date.now(),
        nombre,
        ubicacion
      }
    ]);

    setNombre("");
    setUbicacion("");
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin - Hoteles</h1>

      <div className="mb-6">
        <input
          className="border p-2 mr-2"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />

        <input
          className="border p-2 mr-2"
          placeholder="Ubicación"
          value={ubicacion}
          onChange={(e) => setUbicacion(e.target.value)}
        />

        <button
          onClick={agregarHotel}
          className="bg-blue-600 text-white px-4 py-2"
        >
          Agregar
        </button>
      </div>

      <table className="border w-full">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Nombre</th>
            <th className="border p-2">Ubicación</th>
          </tr>
        </thead>

        <tbody>
          {hoteles.map((h) => (
            <tr key={h.id}>
              <td className="border p-2">{h.nombre}</td>
              <td className="border p-2">{h.ubicacion}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
