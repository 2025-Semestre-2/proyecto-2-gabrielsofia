const tiposDisponibles = [
  "Tour en bote",
  "Tour en lancha",
  "Tour en catamarán",
  "Kayak",
  "Transporte"
];

const TiposActividadCheckbox = ({ actividad, setActividad }) => {
  const toggleTipo = (tipo) => {
    const nuevosTipos = actividad.tipos.includes(tipo)
      ? actividad.tipos.filter(t => t !== tipo)
      : [...actividad.tipos, tipo];

    setActividad({ ...actividad, tipos: nuevosTipos });
  };

  return (
    <div>
      <h4>Tipos de actividad</h4>
      {tiposDisponibles.map(tipo => (
        <label key={tipo}>
          <input
            type="checkbox"
            checked={actividad.tipos.includes(tipo)}
            onChange={() => toggleTipo(tipo)}
          />
          {tipo}
        </label>
      ))}
    </div>
  );
};

export default TiposActividadCheckbox;