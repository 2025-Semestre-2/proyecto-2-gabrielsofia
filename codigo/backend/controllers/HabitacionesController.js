const { obtenerPool, conectarBD } = require("../config/database");

async function obtenerHabitaciones(req, res) {
  try {
    let pool = obtenerPool();
    if (!pool) pool = await conectarBD();

    const resultado = await pool.request().query("SELECT * FROM BusquedaHabitaciones;");
    return res.json(resultado.recordset);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

module.exports = { obtenerHabitaciones };
