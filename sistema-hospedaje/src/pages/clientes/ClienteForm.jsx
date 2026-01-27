import { useState } from "react";
import TelefonosInput from "../../components/clientes/TelefonosInput";

const ClienteForm = () => {
  const [cliente, setCliente] = useState({
    nombre: "",
    apellido1: "",
    apellido2: "",
    fechaNacimiento: "",
    tipoIdentificacion: "",
    identificacion: "",
    pais: "",
    provincia: "",
    canton: "",
    distrito: "",
    telefonos: ["", ""],
    email: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCliente({ ...cliente, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("CLIENTE REGISTRADO:", cliente);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Registro de Cliente</h2>

      <input name="nombre" placeholder="Nombre" onChange={handleChange} />
      <input name="apellido1" placeholder="Primer apellido" onChange={handleChange} />
      <input name="apellido2" placeholder="Segundo apellido" onChange={handleChange} />

      <input
        type="date"
        name="fechaNacimiento"
        onChange={handleChange}
      />

      <select name="tipoIdentificacion" onChange={handleChange}>
        <option value="">Tipo de identificación</option>
        <option>Pasaporte</option>
        <option>DIMEX</option>
        <option>Cédula nacional</option>
        <option>Otro</option>
      </select>

      <input
        name="identificacion"
        placeholder="Número de identificación"
        onChange={handleChange}
      />

      <input name="pais" placeholder="País de residencia" onChange={handleChange} />

      {cliente.pais.toLowerCase() === "costa rica" && (
        <>
          <input name="provincia" placeholder="Provincia" onChange={handleChange} />
          <input name="canton" placeholder="Cantón" onChange={handleChange} />
          <input name="distrito" placeholder="Distrito" onChange={handleChange} />
        </>
      )}

      <TelefonosInput cliente={cliente} setCliente={setCliente} />

      <input
        type="email"
        name="email"
        placeholder="Correo electrónico"
        onChange={handleChange}
      />

      <button>Guardar Cliente</button>
    </form>
  );
};

export default ClienteForm;