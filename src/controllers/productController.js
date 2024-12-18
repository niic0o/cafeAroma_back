const Product = require('../models/productsModel'); // Modelo de Mongoose

// Crear un nuevo producto
const createProductController = async (name, precio, stock, img, description) => {
  const nuevoProducto = new Product({ name, precio, stock, img, description });
  const savedProduct = await nuevoProducto.save(); // Guardar en la base de datos
  return savedProduct;
};

// Obtener todos los productos
const getAllProductController = async () => {
  const products = await Product.find(); // Recuperar todos los productos
  return products;
};

// Obtener un producto por nombre
const getOneProductController = async (name) => {
  const productsByName = await Product.find({ name }); // Buscar por nombre
  return productsByName;
};

// Obtener un producto por ID
const getProductByIdController = async (id) => {
  const productById = await Product.findById(id); // Buscar por ID
  return productById;
};

// Actualizar un producto
const updateProductController = async (id, name, precio, stock, img, description) => {
  const updatedProduct = await Product.findByIdAndUpdate(
    id,
    { name, precio, stock, img, description },
    { new: true } // Retorna el producto actualizado
  );
  
  return updatedProduct;
};

// Eliminar un producto
const deleteProductController = async (id) => {
  const deletedProduct = await Product.findByIdAndDelete(id); // Elimina por ID
  return deletedProduct;
};

module.exports = {
  createProductController,
  getAllProductController,
  getOneProductController,
  getProductByIdController,
  updateProductController,
  deleteProductController,
};
