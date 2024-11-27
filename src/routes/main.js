const {Router} = require("express");
const mainRouter = Router();

//rutas user
mainRouter.get("/users", (req, res) => {
    res.send("Estos son los usuarios");
  });

//buscar un usuario por su id
mainRouter.get("/users/:id", (req, res) => {
  res.send(`Este es el detalle de un solo usuario con id:" ${req.params.id}`);
});

mainRouter.post("/users", (req, res) => {
  res.send("Creando un usuario");
});

mainRouter.put("/users/:id", (req, res) =>{
  res.send(`Modificando un solo usuario con id: ${req.params.id}`);
})

mainRouter.delete("/users/:id", (req, res) =>{
  res.send(`Eliminando un solo usuario con id: ${req.params.id}`);
})
//rutas post
mainRouter.get("/post", (req, res) => {
    res.send("Estos son los posteos");
  });


// Rutas de posteos
mainRouter.get("/post", (req, res) => {
  res.send("Estos son los posteos");
});

// Rutas de posteos
mainRouter.get("/post/:id", (req, res) => {
  res.send(`Detalle de un posteo con id: ${req.params.id}`);
});

mainRouter.post("/post", (req, res) => {
  res.send("Creando un posteo");
});

mainRouter.put("/post/:id", (req, res) => {
  res.send(`Modificando el posteo con id: ${req.params.id}`);
});

mainRouter.delete("/post/:id", (req, res) => {
  res.send(`Eliminando el posteo con id: ${req.params.id}`);
});

module.exports = mainRouter;