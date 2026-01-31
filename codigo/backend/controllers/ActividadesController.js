const { obtenerPool } = require("../config/database");

async function obtenerActividades(req, res) {
  try {
    const pool = obtenerPool();
    const resultado = await pool.request().query("SELECT * FROM BusquedaActividades");
    res.json(resultado.recordset);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { obtenerActividades };
