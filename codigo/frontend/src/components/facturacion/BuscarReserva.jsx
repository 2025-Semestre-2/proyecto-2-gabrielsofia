import { useState } from "react";

const BuscarReserva = ({ setFactura }) => {
  const [numeroReserva, setNumeroReserva] = useState("");

  const buscar = () => {
    // Simulación de backend + trigger
    const facturaFake = {
      numeroReserva,
      cliente: "Juan Pérez",
      habitacion: "101 - Suite",
      noches: 3,
      precioNoche: 45000,
      total: 135000,
      estado: "PENDIENTE",
      fecha: new Date().toLocaleString()
    };

    setFactura(facturaFake);
  };

  return (
    <div>
      <h4>Buscar Reserva</h4>

      <input
        placeholder="Número de reserva"
        value={numeroReserva}
        onChange={(e) => setNumeroReserva(e.target.value)}
      />

      <button type="button" onClick={buscar}>
        Buscar
      </button>
    </div>
  );
};

export default BuscarReserva;