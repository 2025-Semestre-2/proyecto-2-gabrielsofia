const facturacionFake = [
  { fecha: "2024-10-01", tipo: "Suite", total: 150000 },
  { fecha: "2024-10-02", tipo: "Doble", total: 80000 }
];

const ReporteFacturacion = () => {
  return (
    <div>
      <h3>Reporte de Facturación</h3>

      {facturacionFake.map((f, i) => (
        <p key={i}>
          {f.fecha} | {f.tipo} | ₡{f.total}
        </p>
      ))}
    </div>
  );
};

export default ReporteFacturacion;