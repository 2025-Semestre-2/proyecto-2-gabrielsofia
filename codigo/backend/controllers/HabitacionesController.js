const { obtenerPool } = require("../config/database");
const sql = require("mssql");

async function obtenerHabitaciones(req, res) {
  try {
    const pool = obtenerPool();

    const { destino, fechaIn, fechaFn, cupoPersonas } = req.query;

    const vieneBusqueda =
      destino !== undefined ||
      fechaIn !== undefined ||
      fechaFn !== undefined ||
      cupoPersonas !== undefined;

    if (vieneBusqueda) {
      // Validación mínima
      if (!destino || !fechaIn || !fechaFn || !cupoPersonas) {
        return res.status(400).json({
          error: "Faltan parámetros: destino, fechaIn, fechaFn, cupoPersonas",
        });
      }

      const cupo = Number(cupoPersonas);
      if (!Number.isInteger(cupo) || cupo <= 0) {
        return res.status(400).json({ error: "cupoPersonas debe ser entero > 0" });
      }

      
      const dIn = new Date(fechaIn);
      const dFn = new Date(fechaFn);
      if (Number.isNaN(dIn.getTime()) || Number.isNaN(dFn.getTime())) {
        return res.status(400).json({ error: "fechaIn/fechaFn inválidas (usa YYYY-MM-DD)" });
      }
      if (dFn <= dIn) {
        return res.status(400).json({ error: "fechaFn debe ser mayor que fechaIn" });
      }

      const resultado = await pool
        .request()
        .input("Destino", sql.NVarChar(100), destino)
        .input("FechaIn", sql.Date, fechaIn)
        .input("FechaFn", sql.Date, fechaFn)
        .input("CupoPersonas", sql.Int, cupo)
        .execute("dbo.BuscarHabitaciones"); 

      return res.json(resultado.recordset);
    }

    const resultado = await pool.request().query("SELECT * FROM BusquedaHabitaciones");
    return res.json(resultado.recordset);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

module.exports = { obtenerHabitaciones };
