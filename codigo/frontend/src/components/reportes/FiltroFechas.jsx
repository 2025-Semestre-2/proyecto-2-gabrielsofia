const FiltroFechas = ({ setFechas }) => {
  return (
    <div>
      <h4>Rango de fechas</h4>

      <input
        type="date"
        onChange={(e) =>
          setFechas(f => ({ ...f, inicio: e.target.value }))
        }
      />

      <input
        type="date"
        onChange={(e) =>
          setFechas(f => ({ ...f, fin: e.target.value }))
        }
      />
    </div>
  );
};

export default FiltroFechas;