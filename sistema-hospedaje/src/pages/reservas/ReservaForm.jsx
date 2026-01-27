import { useState } from "react";
import BuscarCliente from "../../components/reservas/BuscarCliente";
import SelectHabitacion from "../../components/reservas/SelectHabitacion";

const ReservaForm = () => {
  const [cliente, setCliente] = useState(null);
  const [habitacion, setHabitacion] = useState("");
  const [reserva, setReserva] = useState({
    fechaIngreso: "",
    fechaSalida: "",
    personas: 1,
    vehiculo: false,
    estado: "ACTIVO"
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const nuevaReserva = {
      cliente,
      habitacion,
      ...reserva
    };

    console.log("RESERVA CREADA:", nuevaReserva);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Reservación</h2>

      <BuscarCliente setCliente={setCliente} />

      {cliente && (
        <p>
          Cliente: <strong>{cliente.nombre}</strong>
        </p>
      )}

      <SelectHabitacion setHabitacion={setHabitacion} />

      <input
        type="datetime-local"
        onChange={(e) =>
          setReserva({ ...reserva, fechaIngreso: e.target.value })
        }
      />

      <input
        type="date"
        onChange={(e) =>
          setReserva({ ...reserva, fechaSalida: e.target.value })
        }
      />

      <input
        type="number"
        min="1"
        placeholder="Cantidad de personas"
        onChange={(e) =>
          setReserva({ ...reserva, personas: e.target.value })
        }
      />

      <label>
        <input
          type="checkbox"
          onChange={(e) =>
            setReserva({ ...reserva, vehiculo: e.target.checked })
          }
        />
        Posee vehículo
      </label>

      <button>Crear Reserva</button>
    </form>
  );
};

export default ReservaForm;