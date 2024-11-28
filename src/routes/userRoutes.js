const { Router } = require("express");
const userRouter = Router();

//Si mainRouter me pide un metodo HTTP para /api/users yo respondo.

//rutas users
userRouter.get("/", (req, res) => {
  res.send("Estos son los usuarios");
});

//buscar un usuario por su id
userRouter.get("/:id", (req, res) => {
  res.send(`Este es el detalle de un solo usuario con id: ${req.params.id}`);
});

userRouter.get("/username/:user", (req, res) => {
  res.send(`Este es el detalle de un solo usuario con user: ${req.params.user}`);
});

userRouter.post("/", (req, res) => {
  res.send("Creando un usuario");
});

userRouter.put("/:id", (req, res) => {
  res.send(`Modificando un solo usuario con id: ${req.params.id}`);
});

userRouter.delete("/:id", (req, res) => {
  res.send(`Eliminando un solo usuario con id: ${req.params.id}`);
});


module.exports = userRouter;
