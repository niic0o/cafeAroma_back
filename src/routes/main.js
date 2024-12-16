const { Router } = require("express");
const productRouter = require("./productRoutes");
const mainRouter = Router();
const userRouter = require("./userRoutes");
const orderRouter = require("./orderRoutes");
const commentRouter = require("./commentRoutes");
const mercadoPagoRouter = require("./mercadoPagoRoutes");

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
  /*
  #swagger.tags = ['Productos']
  #swagger.security = [{
      "bearerAuth": []
  }]
  */
);

mainRouter.use(
  "/api/ordenes",
  orderRouter
  /*
  #swagger.tags = ['Ordenes']
  #swagger.security = [{
      "bearerAuth": []
  }]
  */
);

//comentarios
mainRouter.use(
  "/api/comentarios",
  commentRouter
  /*
  #swagger.tags = ['Comentarios']
  #swagger.security = [{
      "bearerAuth": []
  }]
  */
);

//Mercado Pago
mainRouter.use(
  "/api/mercadoPago",
  mercadoPagoRouter
  /*
  #swagger.tags = ['Mercado Pago']
  #swagger.security = [{
      "bearerAuth": []
  }]
  */
);

module.exports = mainRouter;
