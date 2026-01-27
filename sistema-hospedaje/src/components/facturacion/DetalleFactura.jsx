const DetalleFactura = ({ factura, setFactura }) => {
  const pagar = (metodo) => {
    setFactura({
      ...factura,
      estado: "PAGADA",
      metodoPago: metodo,
      fechaPago: new Date().toLocaleString()
    });
  };

  return (
    <div>
      <h3>Factura</h3>

      <p><strong>Cliente:</strong> {factura.cliente}</p>
      <p><strong>Habitación:</strong> {factura.habitacion}</p>
      <p><strong>Noches:</strong> {factura.noches}</p>
      <p><strong>Precio por noche:</strong> ₡{factura.precioNoche}</p>
      <p><strong>Total:</strong> ₡{factura.total}</p>
      <p><strong>Estado:</strong> {factura.estado}</p>
      <p><strong>Fecha registro:</strong> {factura.fecha}</p>

      {factura.estado === "PENDIENTE" && (
        <>
          <button onClick={() => pagar("EFECTIVO")}>
            Pagar en efectivo
          </button>
          <button onClick={() => pagar("TARJETA")}>
            Pagar con tarjeta
          </button>
        </>
      )}

      {factura.estado === "PAGADA" && (
        <p>
          ✔ Pagada vía <strong>{factura.metodoPago}</strong><br />
          Fecha pago: {factura.fechaPago}
        </p>
      )}
    </div>
  );
};

export default DetalleFactura;