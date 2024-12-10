const { Router } = require("express");

const {
  getAllOrdersHandler,
  getOneOrderHandler,
  createOrderHandler,
  hardDeleteOrderHandler,
} = require("../handlers/orderHandler");

const orderRouter = Router();

//Ordenes
orderRouter.get("/", getAllOrdersHandler);

orderRouter.get("/:id", getOneOrderHandler);

// orderRouter.get("/customer/:id",getOneOrderByCustomerHandler );

orderRouter.post(
  "/",
  createOrderHandler
  /*  #swagger.requestBody = {
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

orderRouter.delete("/hardDelete/:id", hardDeleteOrderHandler);

module.exports = orderRouter;
