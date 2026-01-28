const TelefonosInput = ({ cliente, setCliente }) => {
  const actualizarTelefono = (index, value) => {
    const nuevosTelefonos = [...cliente.telefonos];
    nuevosTelefonos[index] = value;
    setCliente({ ...cliente, telefonos: nuevosTelefonos });
  };

  return (
    <div>
      <h4>Teléfonos</h4>

      <input
        placeholder="Teléfono 1"
        value={cliente.telefonos[0]}
        onChange={(e) => actualizarTelefono(0, e.target.value)}
      />

      <input
        placeholder="Teléfono 2"
        value={cliente.telefonos[1]}
        onChange={(e) => actualizarTelefono(1, e.target.value)}
      />
    </div>
  );
};

export default TelefonosInput;