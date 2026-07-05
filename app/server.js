import express from "express";

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