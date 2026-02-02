const { obtenerPool } = require("../config/database");
const sql = require("mssql");

async function obtenerActividades(req, res) {
  try {
    const pool = obtenerPool();

    const { TipoActividad,PrecioMax  } = req.query;

    const vieneBusqueda =
      TipoActividad !== undefined ||
      PrecioMax !== undefined;

    if (vieneBusqueda) {

      if (!TipoActividad || !PrecioMax) {
        return res.status(400).json({
          error: "Faltan parámetros: TipoActividad, PrecioMax",
        });
      }

      const Precio = Number(PrecioMax);
      if (!Number.isInteger(Precio) || Precio <= 0) {
        return res.status(400).json({ error: "PrecioMax debe ser entero > 0" });
      }

      const resultado = await pool
        .request()
        .input("TipoActividad", sql.Int, TipoActividad)
        .input("PrecioMax", sql.Int, Precio)
        .execute("dbo.sp_BuscarActividades"); 

      return res.json(resultado.recordset);
    }


    const resultado = await pool.request().query("SELECT * FROM BusquedaActividades");
    return res.json(resultado.recordset);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

module.exports = { obtenerActividades };
