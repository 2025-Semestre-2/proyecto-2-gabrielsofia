
const sql = require("mssql/msnodesqlv8");

const config = {
  server: "localhost\\SQLEXPRESS02",
  database: "SistemaHoteles",
  options: {
    trustedConnection: true
  }
};

let pool = null;

async function conectarBD() {
  try {
    if (!pool) {
      pool = await sql.connect(config);
      console.log("✅ Conectado a Base de Datos");
    }
    return pool;
  } catch (err) {
    console.log("❌ Error:", err);
    throw err;
  }
}

module.exports = { conectarBD };
