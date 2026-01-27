const habitacionesFake = [
  { id: 1, numero: "101", tipo: "Suite" },
  { id: 2, numero: "102", tipo: "Doble" },
  { id: 3, numero: "103", tipo: "Familiar" }
];

const SelectHabitacion = ({ setHabitacion }) => {
  return (
    <div>
      <h4>Habitación</h4>

      <select onChange={(e) => setHabitacion(e.target.value)}>
        <option value="">Seleccione una habitación</option>
        {habitacionesFake.map(h => (
          <option key={h.id} value={h.id}>
            {h.numero} - {h.tipo}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectHabitacion;