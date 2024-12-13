const { Router } = require("express");
const mercadoPagoRouter = Router();
const mercadoPagoHandler = require("../handlers/mercadoPagoHandler");

mercadoPagoRouter.post(
  "/createPreference",
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

mercadoPagoRouter.get("/return", mercadoPagoHandler.returnHandler);

module.exports = mercadoPagoRouter;
