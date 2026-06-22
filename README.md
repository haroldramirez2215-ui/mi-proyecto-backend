# PharmaTo-do — Backend API

API REST para gestión de farmacia: clientes, medicamentos y movimientos de inventario.

---

## 1. Requisitos previos

- Node.js instalado
- XAMPP (MySQL corriendo en puerto 3306)
- Visual Studio Code con extensión **Thunder Client**

---

## 2. Configuración inicial

### Paso 1 — Crear la base de datos
Abre phpMyAdmin (http://localhost/phpmyadmin) y ejecuta el archivo `pharmatodo.sql`.  
Esto crea la base de datos, las tablas y datos de prueba.

### Paso 2 — Instalar dependencias
Abre una terminal en la carpeta `backend` y ejecuta:
```
npm install
```

### Paso 3 — Ajustar contraseña (si aplica)
Abre `app/config/environments/developer.env` y pon tu contraseña de MySQL:
```
DB_PASSWORD=tu_password_aqui
```
Si no tienes contraseña en XAMPP, déjalo vacío.

### Paso 4 — Correr el servidor
```
npm run dev
```
Deberías ver: `✅ PharmaTo-do API corriendo en http://localhost:3000`

---

## 3. Endpoints disponibles

### CLIENTES
| Método | URL                        | Acción                  |
|--------|----------------------------|-------------------------|
| GET    | /api/clientes              | Consultar todos         |
| GET    | /api/clientes/:id          | Consultar uno por ID    |
| POST   | /api/clientes              | Insertar nuevo cliente  |
| PATCH  | /api/clientes/:id          | Modificar cliente       |
| DELETE | /api/clientes/:id          | Eliminar cliente        |

### MEDICAMENTOS
| Método | URL                        | Acción                      |
|--------|----------------------------|-----------------------------|
| GET    | /api/medicamentos          | Consultar todos             |
| GET    | /api/medicamentos/:id      | Consultar uno por ID        |
| POST   | /api/medicamentos          | Insertar nuevo medicamento  |
| PATCH  | /api/medicamentos/:id      | Modificar medicamento       |
| DELETE | /api/medicamentos/:id      | Eliminar medicamento        |

### MOVIMIENTOS (entradas y salidas)
| Método | URL                             | Acción                    |
|--------|---------------------------------|---------------------------|
| GET    | /api/movimientos/stock/disponible | Ver stock actual          |
| GET    | /api/movimientos                | Consultar todos           |
| GET    | /api/movimientos/:id            | Consultar uno por ID      |
| POST   | /api/movimientos                | Registrar entrada/salida  |
| PATCH  | /api/movimientos/:id            | Modificar observaciones   |
| DELETE | /api/movimientos/:id            | Eliminar movimiento       |

---

## 4. Cuerpos JSON para Thunder Client

### Insertar cliente (POST /api/clientes)
```json
{
  "nombre": "María",
  "apellido": "López",
  "telefono": "3156789012",
  "email": "maria@email.com",
  "documento": "1098765432"
}
```

### Modificar cliente (PATCH /api/clientes/1)
```json
{
  "nombre": "María",
  "apellido": "López Editada",
  "telefono": "3156789012",
  "email": "maria_edit@email.com",
  "documento": "1098765432"
}
```

### Insertar medicamento (POST /api/medicamentos)
```json
{
  "nombre": "Vitamina C 1000mg",
  "descripcion": "Suplemento vitamínico",
  "precio": 4500,
  "stock": 0,
  "categoria": "Suplemento"
}
```

### Modificar medicamento (PATCH /api/medicamentos/1)
```json
{
  "nombre": "Acetaminofén 500mg",
  "descripcion": "Analgésico actualizado",
  "precio": 1800,
  "stock": 48,
  "categoria": "Analgésico"
}
```

### Registrar ENTRADA de medicamento (POST /api/movimientos)
```json
{
  "medicamento_id": 1,
  "tipo": "entrada",
  "cantidad": 20,
  "observaciones": "Reabastecimiento de Acetaminofén"
}
```

### Registrar SALIDA / venta (POST /api/movimientos)
```json
{
  "medicamento_id": 1,
  "cliente_id": 1,
  "tipo": "salida",
  "cantidad": 3,
  "observaciones": "Venta al cliente Carlos Ramírez"
}
```

### Modificar movimiento (PATCH /api/movimientos/1)
```json
{
  "observaciones": "Observación corregida"
}
```

---

## 5. Estructura del proyecto

```
backend/
├── index.js                          ← Punto de arranque
├── package.json
├── pharmatodo.sql                    ← Script BD
├── .gitignore
└── app/
    ├── server.js                     ← Express + middlewares
    ├── config/
    │   ├── environments/
    │   │   ├── index.js              ← Carga el .env correcto
    │   │   ├── developer.env         ← Variables de desarrollo
    │   │   └── production.env        ← Variables de producción
    │   └── db/
    │       └── basedatos.js          ← Pool de conexión MySQL
    ├── controllers/
    │   ├── clienteController.js      ← Lógica CRUD clientes
    │   ├── medicamentoController.js  ← Lógica CRUD medicamentos
    │   └── movimientoController.js   ← Lógica entradas/salidas
    └── routes/
        ├── index.js                  ← Rutas centralizadas
        ├── clientes.routes.js
        ├── medicamentos.routes.js
        └── movimientos.routes.js
```
