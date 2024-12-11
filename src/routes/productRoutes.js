const { Router } = require("express");
const productRouter = Router();
const {
  getAllProductsHandler,
  getOneproductHandler,
  createProductHandler,
  updateProductHandler,
  deleteProductHandler,
} = require("../handlers/productHandler");
const authUser = require("../middlewares/authUser");

//productos
productRouter.get(
  "/",
  getAllProductsHandler
  /*  
  #swagger.security = null
  */
);

productRouter.get(
  "/:id",
  authUser.authenticate,
  authUser.authorize(["admin"]),

  getOneproductHandler
);

productRouter.post(
  "/",
  authUser.authenticate,
  authUser.authorize(["admin"]),
  createProductHandler
  /*  
  #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/productSchema"
                    }  
                }
            }
        } 
  */
);

productRouter.put(
  "/:id",
  authUser.authenticate,
  authUser.authorize(["admin"]),
  updateProductHandler
  /*  
  #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/productSchema"
                    }  
                }
            }
        } 
  */
);

productRouter.delete(
  "/:id",
  authUser.authenticate,
  authUser.authorize(["admin"]),
  deleteProductHandler
);

module.exports = productRouter;
