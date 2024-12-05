const {Router} = require('express');
const {getAllProductsHandler, getOneproductHandler , createProductHandler,updateProductHandler,deleteProductHandler,} = require('../handlers/productHandler');
const productRouter = Router();


//productos
productRouter.get("/", getAllProductsHandler);

productRouter.get("/:id",getOneproductHandler );

productRouter.post("/", createProductHandler);

productRouter.put("/:id", updateProductHandler);

productRouter.delete("/:id",deleteProductHandler);

module.exports = productRouter;
