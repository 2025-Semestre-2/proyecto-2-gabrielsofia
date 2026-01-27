const serviciosDisponibles = [
  "Piscina",
  "Wifi",
  "Parqueo",
  "Restaurante",
  "Bar",
  "Ranchos"
];

const ServiciosCheckbox = ({ hotel, setHotel }) => {
  const toggleServicio = (servicio) => {
    const servicios = hotel.servicios.includes(servicio)
      ? hotel.servicios.filter(s => s !== servicio)
      : [...hotel.servicios, servicio];

    setHotel({ ...hotel, servicios });
  };

  return (
    <div>
      <h4>Servicios</h4>
      {serviciosDisponibles.map(servicio => (
        <label key={servicio}>
          <input
            type="checkbox"
            onChange={() => toggleServicio(servicio)}
          />
          {servicio}
        </label>
      ))}
    </div>
  );
};

export default ServiciosCheckbox;