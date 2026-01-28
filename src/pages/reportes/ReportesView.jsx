import { useState } from "react";
import FiltroFechas from "../../components/reportes/FiltroFechas";
import ReporteFacturacion from "../../components/reportes/ReporteFacturacion";
import ReporteReservas from "../../components/reportes/ReporteReservas";
import ReporteEdades from "../../components/reportes/ReporteEdades";
import ReporteDemanda from "../../components/reportes/ReporteDemanda";

const ReportesView = () => {
  const [fechas, setFechas] = useState({
    inicio: "",
    fin: ""
  });

  return (
    <div>
      <h2>Reportes</h2>

      <FiltroFechas setFechas={setFechas} />

      <ReporteFacturacion />
      <ReporteReservas />
      <ReporteEdades />
      <ReporteDemanda />
    </div>
  );
};

export default ReportesView;