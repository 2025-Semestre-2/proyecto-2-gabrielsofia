import { useState } from "react";
import ComodidadesCheckbox from "../../components/hospedaje/ComodidadesCheckbox";

const TipoHabitacionForm = () => {
  const [tipo, setTipo] = useState({
    nombre: "",
    descripcion: "",
    tipoCama: "",
    comodidades: [],
    precio: "",
    fotos: []
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("TIPO HABITACIÓN:", tipo);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Tipo de Habitación</h2>

      <input placeholder="Nombre" onChange={e => setTipo({ ...tipo, nombre: e.target.value })} />
      <textarea placeholder="Descripción" onChange={e => setTipo({ ...tipo, descripcion: e.target.value })} />

      <select onChange={e => setTipo({ ...tipo, tipoCama: e.target.value })}>
        <option value="">Tipo de cama</option>
        <option>Individual</option>
        <option>Queen</option>
        <option>King</option>
      </select>

      <ComodidadesCheckbox tipo={tipo} setTipo={setTipo} />

      <input type="number" placeholder="Precio" onChange={e => setTipo({ ...tipo, precio: e.target.value })} />
      <input type="file" multiple />

      <button>Guardar Tipo</button>
    </form>
  );
};

export default TipoHabitacionForm;