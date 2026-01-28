const comodidadesDisponibles = [
  "Wifi",
  "A/C",
  "Ventilador",
  "Agua caliente"
];

const ComodidadesCheckbox = ({ tipo, setTipo }) => {
  const toggle = (comodidad) => {
    const comodidades = tipo.comodidades.includes(comodidad)
      ? tipo.comodidades.filter(c => c !== comodidad)
      : [...tipo.comodidades, comodidad];

    setTipo({ ...tipo, comodidades });
  };

  return (
    <div>
      <h4>Comodidades</h4>
      {comodidadesDisponibles.map(c => (
        <label key={c}>
          <input type="checkbox" onChange={() => toggle(c)} />
          {c}
        </label>
      ))}
    </div>
  );
};

export default ComodidadesCheckbox;