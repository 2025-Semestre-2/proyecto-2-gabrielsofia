const FiltrosActividades = ({ setFiltros }) => {
  return (
    <div>
      <h4>Filtros</h4>

      <select onChange={(e) => setFiltros(f => ({ ...f, tipo: e.target.value }))}>
        <option value="">Tipo de actividad</option>
        <option>Tour en bote</option>
        <option>Kayak</option>
        <option>Transporte</option>
      </select>

      <select onChange={(e) => setFiltros(f => ({ ...f, provincia: e.target.value }))}>
        <option value="">Provincia</option>
        <option>Puntarenas</option>
        <option>Guanacaste</option>
        <option>Limon</option>
        <option>Heredia</option>
        <option>Alajuela</option>
        <option>San Jose</option>
        <option>Heredia</option>
      </select>
    </div>
  );
};

export default FiltrosActividades;