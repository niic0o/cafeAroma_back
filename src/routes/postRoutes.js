const { Router } = require("express");
const postRouter = Router();

//si mainRouter me pide que responda por solicitudes HTTP para /api/post yo respondo.

//rutas post

postRouter.get("/", (req, res) => {
  res.send("Estos son los posteos");
});

postRouter.get("/:id", (req, res) => {
  res.send(`Detalle de un posteo con id: ${req.params.id}`);
});

postRouter.post("/", (req, res) => {
  res.send("Creando un posteo");
});

postRouter.put("/:id", (req, res) => {
  res.send(`Modificando el posteo con id: ${req.params.id}`);
});

postRouter.delete("/:id", (req, res) => {
  res.send(`Eliminando el posteo con id: ${req.params.id}`);
});

module.exports = postRouter;
