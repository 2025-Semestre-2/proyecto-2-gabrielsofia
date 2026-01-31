const express = require("express");
const router = express.Router();
const ActividadesController = require("../controllers/ActividadesController");

router.get("/", ActividadesController.obtenerActividades);

module.exports = router;
