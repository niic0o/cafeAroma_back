const { Router } = require("express");
const productRouter = require("./productRoutes");
const mainRouter = Router();
const userRouter = require("./userRoutes");
const orderRouter = require("./orderRoutes");
const postRouter = require("./postRoutes");
const commentRouter = require("./commentRoutes");

//usuarios
mainRouter.use(
  "/api/users",
  userRouter
  /*
  #swagger.tags = ['Usuarios']
  #swagger.security = [{
      "bearerAuth": []
  }]
  */
);
//productos
mainRouter.use(
  "/api/productos",
  productRouter
  // #swagger.tags = ['Productos']
);

mainRouter.use(
  "/api/ordenes",
  orderRouter
  // #swagger.tags = ['Ordenes']
);

//posteos
mainRouter.use(
  "/api/post",
  postRouter
  // #swagger.tags = ['Posteos']
);

//comentarios
mainRouter.use(
  "/api/comentarios",
  commentRouter
);
module.exports = mainRouter;
