import { useState } from "react";
import BuscarReserva from "../../components/facturacion/BuscarReserva";
import DetalleFactura from "../../components/facturacion/DetalleFactura";

const FacturaView = () => {
  const [factura, setFactura] = useState(null);

  return (
    <div>
      <h2>Facturación</h2>

      <BuscarReserva setFactura={setFactura} />

      {factura && (
        <DetalleFactura
          factura={factura}
          setFactura={setFactura}
        />
      )}
    </div>
  );
};

export default FacturaView;