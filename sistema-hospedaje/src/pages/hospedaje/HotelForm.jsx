import { useState } from "react";
import ServiciosCheckbox from "../../components/hospedaje/ServiciosCheckbox";

const HotelForm = () => {
  const [hotel, setHotel] = useState({
    nombre: "",
    cedulaJuridica: "",
    tipo: "",
    provincia: "",
    canton: "",
    distrito: "",
    barrio: "",
    senas: "",
    gps: "",
    telefono1: "",
    telefono2: "",
    email: "",
    website: "",
    redes: {
      facebook: "",
      instagram: "",
      youtube: "",
      tiktok: "",
      airbnb: "",
      threads: "",
      x: ""
    },
    servicios: []
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHotel({ ...hotel, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("HOTEL REGISTRADO:", hotel);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Registro de Hotel</h2>

      <input name="nombre" placeholder="Nombre del hotel" onChange={handleChange} />
      <input name="cedulaJuridica" placeholder="Cédula jurídica" onChange={handleChange} />

      <select name="tipo" onChange={handleChange}>
        <option value="">Tipo</option>
        <option>Hotel</option>
        <option>Hostal</option>
        <option>Casa</option>
        <option>Departamento</option>
        <option>Cuarto compartido</option>
        <option>Cabaña</option>
      </select>

      <input name="provincia" placeholder="Provincia" onChange={handleChange} />
      <input name="canton" placeholder="Cantón" onChange={handleChange} />
      <input name="distrito" placeholder="Distrito" onChange={handleChange} />
      <input name="barrio" placeholder="Barrio" onChange={handleChange} />
      <input name="senas" placeholder="Señas exactas" onChange={handleChange} />

      <input name="gps" placeholder="Referencia GPS" onChange={handleChange} />
      <input name="telefono1" placeholder="Teléfono 1" onChange={handleChange} />
      <input name="telefono2" placeholder="Teléfono 2" onChange={handleChange} />
      <input name="email" placeholder="Correo electrónico" onChange={handleChange} />
      <input name="website" placeholder="Sitio web" onChange={handleChange} />

      <ServiciosCheckbox hotel={hotel} setHotel={setHotel} />

      <button type="submit">Guardar Hotel</button>
    </form>
  );
};

export default HotelForm;