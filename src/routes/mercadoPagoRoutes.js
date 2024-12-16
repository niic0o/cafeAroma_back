const { Router } = require("express");
const mercadoPagoRouter = Router();
const mercadoPagoHandler = require("../handlers/mercadoPagoHandler");
const authUser = require("../middlewares/authUser");

mercadoPagoRouter.post(
  "/createPreference/:orderId",
  authUser.authenticate,
  authUser.authorize(["cliente"]),
  mercadoPagoHandler.createPreferenceHandler
  /*  
  #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/mercadoPagoSchema"
                    }  
                }
            }
        } 
  */
);

mercadoPagoRouter.get(
  "/return",
  mercadoPagoHandler.returnHandler
  /*  
  #swagger.security = null
  */
);

module.exports = mercadoPagoRouter;
