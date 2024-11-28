const { Router } = require("express");
const userRouter = Router();
const userHandler = require("../handlers/userHandler");

//Si mainRouter me pide un metodo HTTP para /api/users yo respondo.

//rutas users (delego al manejador el request y response de la solicitud)
userRouter.get("/", userHandler.getAllUsersHandler);

userRouter.get("/:id", userHandler.getOneUserHandler);

userRouter.get("/username/:user", userHandler.getUserByUsername);

userRouter.post("/", userHandler.createUserHandler);

userRouter.put("/:id", userHandler.updateUserHandler);

userRouter.delete("/:id", userHandler.deleteUserHandler);

module.exports = userRouter;
