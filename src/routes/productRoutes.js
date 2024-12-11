const {Router} = require('express');
const productRouter = Router();
const {getAllProductsHandler, getOneproductHandler , createProductHandler,updateProductHandler,deleteProductHandler,} = require('../handlers/productHandler');
const authUser = require("../middlewares/authUser");


//productos
productRouter.get("/", getAllProductsHandler);

productRouter.get("/:id",
    authUser.authenticate,
    authUser.authorize(["admin"]),
    
    getOneproductHandler );

productRouter.post("/", 
    authUser.authenticate,
    authUser.authorize(["admin"]),
    createProductHandler);

productRouter.put("/:id", 
    authUser.authenticate,
    authUser.authorize(["admin"]),
    updateProductHandler);

productRouter.delete("/:id",
    authUser.authenticate,
    authUser.authorize(["admin"]),
    deleteProductHandler);

module.exports = productRouter;
