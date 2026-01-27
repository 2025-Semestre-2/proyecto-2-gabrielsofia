import { useState } from "react";
import TiposActividadCheckbox from "../../components/actividades/TiposActividadCheckbox";

const ActividadForm = () => {
  const [actividad, setActividad] = useState({
    empresa: "",
    cedulaJuridica: "",
    email: "",
    telefono: "",
    contacto: "",
    provincia: "",
    canton: "",
    distrito: "",
    senas: "",
    tipos: [],
    servicios: "",
    descripcion: "",
    precio: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setActividad({ ...actividad, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("ACTIVIDAD REGISTRADA:", actividad);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Registro de Actividad</h2>

      <input name="empresa" placeholder="Nombre de la empresa" onChange={handleChange} />
      <input name="cedulaJuridica" placeholder="Cédula jurídica" onChange={handleChange} />
      <input name="email" placeholder="Correo electrónico" onChange={handleChange} />
      <input name="telefono" placeholder="Teléfono" onChange={handleChange} />
      <input name="contacto" placeholder="Persona de contacto" onChange={handleChange} />

      <input name="provincia" placeholder="Provincia" onChange={handleChange} />
      <input name="canton" placeholder="Cantón" onChange={handleChange} />
      <input name="distrito" placeholder="Distrito" onChange={handleChange} />
      <input name="senas" placeholder="Señas exactas" onChange={handleChange} />

      <TiposActividadCheckbox actividad={actividad} setActividad={setActividad} />

      <textarea
        name="servicios"
        placeholder="Servicios que brinda"
        onChange={handleChange}
      />

      <textarea
        name="descripcion"
        placeholder="Descripción de la actividad"
        onChange={handleChange}
      />

      <input
        type="number"
        name="precio"
        placeholder="Precio"
        onChange={handleChange}
      />

      <button>Guardar Actividad</button>
    </form>
  );
};

export default ActividadForm;