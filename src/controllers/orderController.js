const Order = require("../models/ordersModel"); // Modelo de Mongoose

// Crear un nuevo producto
const createOrderController = async (newOrder) => {
  const lastOrder = await Order.findOne().sort({ nro_orden: -1 });
  newOrder.nro_orden = lastOrder ? lastOrder.nro_orden + 1 : 1;
  const savedOrder = await Order.create(newOrder); // Guardar en la base de datos
  console.log(savedOrder);
  return savedOrder;
};

// Obtener todos las ordenes
const getAllOrderController = async () => {
  const orders = await Order.find(); // Recuperar todos las ordenes
  console.log(orders);
  return orders;
};

// Obtener un orden por ID
const getOrderByIdController = async (id) => {
  const orderById = await Order.findById(id); // Buscar por ID
  console.log(orderById);
  return orderById;
};

// Eliminar una orden (hard delete)
const hardDeleteOrderController = async (id) => {
  const deletedProduct = await Order.findByIdAndDelete(id); // Elimina por ID
  console.log(deletedProduct);
  return deletedProduct;
};

module.exports = {
  createOrderController,
  getAllOrderController,
  getOrderByIdController,
  hardDeleteOrderController,
};
