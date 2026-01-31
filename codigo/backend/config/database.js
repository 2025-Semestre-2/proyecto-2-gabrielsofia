const sql = require("mssql");

const config = {
  user: process.env.DB_USER ,
  password: process.env.DB_PASS ,
  server: process.env.DB_SERVER ,
  port: Number(process.env.DB_PORT) ,
  database: process.env.DB_NAME ,
  options: {
    encrypt: true,
    trustServerCertificate: true
  },
  connectionTimeout: 15000,
};

let pool = null;

async function conectarBD() {
  try {
    pool = await sql.connect(config); // ✅ aquí se asigna
    console.log("✅ Conectado a SQL Server");
    return pool;
  } catch (err) {
    console.error("❌ Error conectando:", err?.originalError || err);
    throw err;
  }
}

function obtenerPool() {
  if (!pool) throw new Error("Pool no inicializado. Llama conectarBD() primero.");
  return pool;
}

module.exports = { conectarBD, obtenerPool };
