import { Router } from "express";

const router = Router();

// LOGIN SIMPLE (hardcodeado como pide el SENA)
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  // usuario fijo del sistema
  if (username === "admin" && password === "pharma2025") {
    return res.json({
      token: "fake-jwt-token-123",
      usuario: {
        username: "admin",
        rol: "administrador"
      }
    });
  }

  return res.status(401).json({
    error: "Credenciales incorrectas"
  });
});

export default router;