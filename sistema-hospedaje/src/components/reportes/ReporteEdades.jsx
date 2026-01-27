const edadesFake = [
  { rango: "18-25", cantidad: 4 },
  { rango: "26-40", cantidad: 7 },
  { rango: "41+", cantidad: 2 }
];

const ReporteEdades = () => {
  return (
    <div>
      <h3>Rango de Edades</h3>

      {edadesFake.map((e, i) => (
        <p key={i}>
          {e.rango}: {e.cantidad} personas
        </p>
      ))}
    </div>
  );
};

export default ReporteEdades;