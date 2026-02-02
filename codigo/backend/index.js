require("dotenv").config();
const express = require("express");
const { conectarBD } = require("./config/database");
const HabitacionesRoute = require("./routes/HabitacionesRoute");
const ActividadesRoute = require("./routes/ActividadesRoute");
const app = express();
const port = 3000;

app.use(express.json());

conectarBD();

app.use("/habitaciones", HabitacionesRoute);
app.use("/actividades", ActividadesRoute);

app.get("/", (req, res) => {
  res.json({ mensaje: "API funcionando correctamente" });
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});