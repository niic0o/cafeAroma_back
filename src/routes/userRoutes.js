const { Router } = require("express");
const userRouter = Router();
const userHandler = require("../handlers/userHandler");
const loginHandler = require("../handlers/loginHandler");
const authUser = require("../middlewares/authUser");
//Si mainRouter me pide un metodo HTTP para /api/users yo respondo.

//rutas users (delego al manejador el request y response de la solicitud)

userRouter.post("/registrarUsuario", userHandler.createUserHandler);
//login
userRouter.post("/login", loginHandler.login); //devuelve un token

userRouter.get(
  "/admin/usuarios",
  authUser.authenticate,
  authUser.authorize(["admin"]),
  userHandler.getAllUsersHandler
);
userRouter.get(
  "/:id",
  authUser.authenticate,
  authUser.authorize(["admin", "cliente"]),
  userHandler.getOneUserHandler
);
userRouter.get(
  "/username/:user",
  authUser.authenticate,
  authUser.authorize(["admin", "cliente"]),
  userHandler.getUserByUsername
);
userRouter.put(
  "editarUsuario/:id",
  authUser.authenticate,
  authUser.authorize(["cliente"]),
  userHandler.updateUserHandler
);
userRouter.delete(
  "/admin/destruirUsuario/:id",
  authUser.authenticate,
  authUser.authorize(["admin"]),
  userHandler.physicalDeleteUserHandler
);
//enviar el id por get del usuario que se quiera pasar de cliente a admin
//cuidado, si el sistema queda sin admin se tendra que pedir al administrador de base de datos ayuda
userRouter.get(
  "/admin/changeClient/:id",
  authUser.authenticate,
  authUser.authorize(["admin"]),
  userHandler.setLikeAdminHandler
);
userRouter.get(
  "/admin/changeAdmin/:id",
  authUser.authenticate,
  authUser.authorize(["admin"]),
  userHandler.setLikeClientHandler
);
//borrado logico de usuario, un usuario se puede dar de baja
userRouter.get(
  "/deleteUser/:id",
  authUser.authenticate,
  authUser.authorize(["admin", "cliente"]),
  userHandler.deleteUserHandler
);
userRouter.get(
  "admin/resetUser/:id",
  authUser.authenticate,
  authUser.authorize(["admin"]),
  userHandler.resetUserHandler
);

module.exports = userRouter;
