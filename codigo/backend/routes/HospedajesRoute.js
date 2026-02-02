// routes/HospedajesRoute.js
const express = require("express");
const router = express.Router();
const { 
  createHospedaje,
  getAllHospedajes,
  testConnection
} = require("../controllers/HospedajesController");

// Crear nuevo hospedaje
router.post("/", createHospedaje);

// Obtener todos los hospedajes
router.get("/", getAllHospedajes);

// Probar conexión a BD
router.get("/test-connection", testConnection);

// Ruta de prueba simple
router.get("/test", (req, res) => {
  res.json({ 
    message: "Ruta de hospedajes funcionando",
    endpoints: [
      { method: "POST", path: "/", description: "Crear hospedaje" },
      { method: "GET", path: "/", description: "Listar hospedajes" },
      { method: "GET", path: "/test-connection", description: "Probar conexión BD" }
    ],
    timestamp: new Date().toISOString()
  });
});

module.exports = router;