const express = require("express");
const router = express.Router();
const HabitacionesController = require("../controllers/HabitacionesController");

router.get("/", HabitacionesController.obtenerHabitaciones);

module.exports = router;
