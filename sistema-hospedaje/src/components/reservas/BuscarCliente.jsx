import { useState } from "react";

const BuscarCliente = ({ setCliente }) => {
  const [identificacion, setIdentificacion] = useState("");

  const buscar = () => {
    // Simulación (luego será backend)
    const clienteFake = {
      id: 1,
      nombre: "Juan Pérez",
      identificacion
    };

    setCliente(clienteFake);
  };

  return (
    <div>
      <h4>Buscar Cliente</h4>

      <input
        placeholder="Identificación"
        value={identificacion}
        onChange={(e) => setIdentificacion(e.target.value)}
      />

      <button type="button" onClick={buscar}>
        Buscar
      </button>
    </div>
  );
};

export default BuscarCliente;