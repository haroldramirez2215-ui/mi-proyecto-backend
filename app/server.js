import express from "express";
import clientesRoutes from "./routes/clientes.routes.js";
import medicamentosRoutes from "./routes/medicamentos.routes.js";
import movimientosRoutes from "./routes/movimientos.routes.js";
const app = express();

app.use(express.json());

// Aquí tienes tus rutas
app.use("/api/clientes", clientesRoutes);
app.use("/api/medicamentos", medicamentosRoutes);
app.use("/api/movimientos", movimientosRoutes);
app.get("/", (req, res) => {
  res.json({
    mensaje: "API PharmaTo-do funcionando correctamente"
  });
});
export default app;