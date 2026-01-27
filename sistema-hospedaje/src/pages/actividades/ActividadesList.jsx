import { useState } from "react";
import FiltrosActividades from "../../components/actividades/FiltrosActividades";

const actividadesFake = [
  {
    id: 1,
    empresa: "Aventuras CR",
    provincia: "Puntarenas",
    tipos: ["Tour en bote"],
    precio: 30000
  },
  {
    id: 2,
    empresa: "Eco Kayak",
    provincia: "Guanacaste",
    tipos: ["Kayak"],
    precio: 20000
  }
];

const ActividadesList = () => {
  const [filtros, setFiltros] = useState({
    tipo: "",
    provincia: ""
  });

  const actividadesFiltradas = actividadesFake.filter(a =>
    (filtros.tipo === "" || a.tipos.includes(filtros.tipo)) &&
    (filtros.provincia === "" || a.provincia === filtros.provincia)
  );

  return (
    <div>
      <h2>Actividades disponibles</h2>

      <FiltrosActividades setFiltros={setFiltros} />

      {actividadesFiltradas.map(a => (
        <div key={a.id}>
          <h4>{a.empresa}</h4>
          <p>Provincia: {a.provincia}</p>
          <p>Tipo: {a.tipos.join(", ")}</p>
          <p>Precio: ₡{a.precio}</p>
        </div>
      ))}
    </div>
  );
};

export default ActividadesList;