const { Router } = require("express");
const orderRouter = Router();
const orderHandler = require("../handlers/orderHandler");
const authUser = require("../middlewares/authUser");

// Rutas de órdenes

// Obtener todas las órdenes
orderRouter.get(
  "/admin/verOrdenes",
  authUser.authenticate,
  authUser.authorize(["admin"]),
  orderHandler.getAllOrdersHandler
);

// Obtener una orden por ID
orderRouter.get(
  "/admin/:id",
  authUser.authenticate,
  authUser.authorize(["admin"]),
  orderHandler.getOneOrderHandler
);

// Crear una nueva orden
orderRouter.post(
  "/crearPedido",
  authUser.authenticate,
  authUser.authorize(["cliente"]),
  orderHandler.createOrderHandler
  /*  
  #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/ordersSchema"
                    }  
                }
            }
        } 
  */
);

// Borrado físico de una orden
orderRouter.delete(
  "/admin/hardDelete/:id",
  authUser.authenticate,
  authUser.authorize(["admin"]),
  orderHandler.hardDeleteOrderHandler
);

// Borrado lógico de una orden
orderRouter.patch(
  "/admin/:id",
  authUser.authenticate,
  authUser.authorize(["admin"]),
  orderHandler.deleteOrderHandler
);

// Restablecimiento lógico de una orden
orderRouter.patch(
  "/admin/reset/:id",
  authUser.authenticate,
  authUser.authorize(["admin"]),
  orderHandler.resetOrderHandler
);

// Obtener órdenes eliminadas
orderRouter.get(
  "/admin/verOrdenesAnuladas",
  authUser.authenticate,
  authUser.authorize(["admin"]),
  orderHandler.getDeletedOrdersHandler
);

// Actualizar una orden
orderRouter.put(
  "/modificarOrden/:id",
  authUser.authenticate,
  authUser.authorize(["admin", "cliente"]),
  orderHandler.updateOrderHandler
);

module.exports = orderRouter;
