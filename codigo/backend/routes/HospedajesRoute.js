
const express = require("express");
const router = express.Router();
const { 
  createHospedaje,
  getAllHospedajes,
  testConnection
} = require("../controllers/HospedajesController");


router.post("/", createHospedaje);


router.get("/", getAllHospedajes);


router.get("/test-connection", testConnection);


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
