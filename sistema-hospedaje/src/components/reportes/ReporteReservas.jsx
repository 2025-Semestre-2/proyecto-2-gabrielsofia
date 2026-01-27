const reservasFake = [
  { tipo: "Suite", usadas: 5 },
  { tipo: "Familiar", usadas: 3 }
];

const ReporteReservas = () => {
  return (
    <div>
      <h3>Reservas Finalizadas</h3>

      {reservasFake.map((r, i) => (
        <p key={i}>
          {r.tipo}: {r.usadas} reservas
        </p>
      ))}
    </div>
  );
};

export default ReporteReservas;