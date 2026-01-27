import { useState } from "react";

const HabitacionForm = () => {
  const [habitacion, setHabitacion] = useState({
    numero: "",
    tipoHabitacion: "",
    estado: "Activo"
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("HABITACIÓN:", habitacion);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Registro de Habitación</h2>

      <input
        placeholder="Número"
        onChange={e =>
          setHabitacion({ ...habitacion, numero: e.target.value })
        }
      />

      <select
        onChange={e =>
          setHabitacion({ ...habitacion, tipoHabitacion: e.target.value })
        }
      >
        <option value="">Tipo de habitación</option>
        <option>Suite</option>
        <option>Doble</option>
        <option>Familiar</option>
      </select>

      <select
        onChange={e =>
          setHabitacion({ ...habitacion, estado: e.target.value })
        }
      >
        <option>Activo</option>
        <option>Inactivo</option>
      </select>

      <button>Guardar Habitación</button>
    </form>
  );
};

export default HabitacionForm;
