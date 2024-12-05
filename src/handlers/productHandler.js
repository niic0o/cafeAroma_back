const {  createProductController, getAllProductController,getOneProductController,getProductByIdController,updateProductController, deleteProductController} = require("../controllers/productController");

const joi = require("joi");
const productSchema = joi.object({
    name: joi.string().required(),
    precio:joi.number().required(),
    stock:joi.number().required()
})

const idSchema = joi.object({id :joi.number().required()})

const getAllProductsHandler = async (req, res) => {
    try {
      const { name } = req.query;
      let response;
      if (name) {
        response = await getOneProductController(name); 
      } else {
        response = await getAllProductController();
      }
      res.status(200).json(response);  // res.json() para enviar los productos
    } catch (error) {
      console.error("Error al obtener los productos:", error);
      res.status(500).send({ error: error.message });
    }
  };

const getOneproductHandler = async(req, res)=>{
    try {
        const {id} = req.params;
        const response = await getProductByIdController(id);
        res.send(response);
    } catch (error) {
        res.status(400).send({Error : error.message});
    }
    
};

const createProductHandler = async (req, res)=>{
    try {
        const {name, precio, stock, img, description} = req.body;
        const response = await createProductController(name, precio, stock, img, description );
        res.send(response);
    } catch (error) {
        res.status(400).send({Error : error.message});
    }
};

const updateProductHandler =async (req, res) => {
    try {
        const {id} = req.params;
        const {name, precio, stock, img, description } = req.body;
        const response = await updateProductController(id, name, precio, stock, img, description );
        res.send(response);
    } catch (error) {
        res.status(400).send({Error : error.message});
    }
   
};

const deleteProductHandler = async (req, res)=>{
   try {
        const {id} = req.params;
        const response = await deleteProductController(id);
        res.status(200).json(response); 
   } catch (error) {
        res.status(400).send({Error : error.message});
   }
};

 
module.exports = {
    getAllProductsHandler,
    getOneproductHandler ,
    createProductHandler,
    updateProductHandler,
    deleteProductHandler
};










