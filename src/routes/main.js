const { Router } = require("express");
const mainRouter = Router();
const userRouter = require("./userRoutes");
const postRouter = require("./postRoutes");
const commentRouter = require("./commentRoutes");
const productRouter = require('./productRoutes');

//el server me pide que responda, depende si la consulta es a usuario, producto o posteos
//delego la tarea a (ej: userRouter) importando las funciones correspondientes.
mainRouter.use("/users", userRouter);
mainRouter.use("/post", postRouter);
mainRouter.use('/productos',productRouter);
mainRouter.use('/comments', commentRouter);

module.exports = mainRouter;
