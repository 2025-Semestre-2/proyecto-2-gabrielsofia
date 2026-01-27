const demandaFake = [
  { hotel: "Hotel Sol", ubicacion: "Puntarenas", reservas: 12 },
  { hotel: "Hotel Mar", ubicacion: "Guanacaste", reservas: 9 }
];

const ReporteDemanda = () => {
  return (
    <div>
      <h3>Hoteles de Mayor Demanda</h3>

      {demandaFake.map((d, i) => (
        <p key={i}>
          {d.hotel} ({d.ubicacion}) - {d.reservas} reservas
        </p>
      ))}
    </div>
  );
};

export default ReporteDemanda;