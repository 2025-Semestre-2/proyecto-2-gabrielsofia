const express = require("express");
const { conectarBD } = require("./config/database");
const HabitacionesRoute = require("./routes/HabitacionesRoute");

const app = express();
const port = 3000;

app.use(express.json());

conectarBD();

app.use("/habitaciones", HabitacionesRoute);

app.get("/", (req, res) => {
  res.json({ mensaje: "API funcionando correctamente" });
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
