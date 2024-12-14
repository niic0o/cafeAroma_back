/*
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
*/

const Order = require("../models/ordersModel"); // Modelo de Mongoose

// Manejo de errores
const throwError500 = (error) => {
  throw {
    message: "Error al intentar obtener datos, ocurre que: " + error.message,
    statusCode: 500, // error del servidor
  };
};

// Obtener todas las órdenes
const getAllOrdersController = async () => {
  try {
    const allOrders = await Order.find({ eliminado: "NO" });
    if (allOrders.length === 0) {
      throw {
        message: "No se encontraron órdenes registradas",
        statusCode: 404, // not found
      };
    }
    return allOrders;
  } catch (error) {
    throwError500(error);
  }
};

// Obtener órdenes eliminadas
const getDeletedOrdersController = async () => {
  try {
    const deletedOrders = await Order.find({ eliminado: "SI" });
    if (deletedOrders.length === 0) {
      throw {
        message: "No se encontraron órdenes eliminadas",
        statusCode: 404, // not found
      };
    }
    return deletedOrders;
  } catch (error) {
    throwError500(error);
  }
};

// Obtener una orden por ID
const getOrderByIdController = async (id) => {
  try {
    const orderById = await Order.findById(id);
    if (!orderById) {
      throw {
        message: "No se encontró la orden con el ID proporcionado",
        statusCode: 404,
      };
    }
    return orderById;
  } catch (error) {
    throwError500(error);
  }
};

// Obtener ordenespor usuario
const getOrderByUserIdController = async (userId) => {
  try {
    const orderByUserId = await Order.find({ user_id: userId });
    if (!orderByUserId) {
      throw {
        message: "No se encontró la orden con el user ID proporcionado",
        statusCode: 404,
      };
    }
    return orderByUserId;
  } catch (error) {
    throwError500(error);
  }
};

// Crear una nueva orden
const createOrderController = async (newOrder) => {
  if (!newOrder) {
    throw {
      message: "Hubo un error con los datos enviados, intente otra vez",
      statusCode: 400, // bad request
    };
  }
  try {
    const lastOrder = await Order.findOne().sort({ nro_orden: -1 });
    newOrder.nro_orden = lastOrder ? lastOrder.nro_orden + 1 : 1;
    const savedOrder = await Order.create(newOrder);
    return savedOrder;
  } catch (error) {
    throwError500(error);
  }
};

// Actualizar una orden por ID
const updateOrderController = async (id, updatedOrder) => {
  if (!updatedOrder) {
    throw {
      message: "Hubo un error con los datos enviados, intente otra vez",
      statusCode: 400, // bad request
    };
  }
  try {
    const updatedOrderResult = await Order.findByIdAndUpdate(id, updatedOrder, {
      new: true,
    });
    // Verificar si la orden fue encontrada y actualizada
    if (!updatedOrderResult) {
      throw {
        message: "Orden no encontrada",
        statusCode: 404, // not found
      };
    }
    return updatedOrderResult;
  } catch (error) {
    throwError500(error);
  }
};

// Eliminar una orden (hard delete)
const hardDeleteOrderController = async (id) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(id);
    if (!deletedOrder) {
      throw {
        message: "Orden no encontrada",
        statusCode: 404, // Not Found
      };
    }
    return deletedOrder;
  } catch (error) {
    throwError500(error);
  }
};

// Eliminar lógicamente una orden por ID
const deleteOrderController = async (id) => {
  try {
    const updatedOrder = await orderController.updateOrderController(id, {
      eliminado: "SI",
    });
    if (!updatedOrder) {
      throw {
        message: "No se pudo realizar la operación, la orden no existe",
        statusCode: 404, // not found
      };
    }
    return updatedOrder;
  } catch (error) {
    throwError500(error);
  }
};

// Restablecer lógicamente una orden por ID
const resetOrderController = async (id) => {
  try {
    const updatedOrder = await orderController.updateOrderController(id, {
      eliminado: "NO",
    });
    if (!updatedOrder) {
      throw {
        message: "No se pudo realizar la operación, la orden no existe",
        statusCode: 404, // not found
      };
    }
    return updatedOrder;
  } catch (error) {
    throwError500(error);
  }
};

// Controlador de órdenes
const orderController = {
  createOrderController,
  getAllOrdersController,
  getDeletedOrdersController,
  getOrderByIdController,
  getOrderByUserIdController,
  updateOrderController,
  hardDeleteOrderController,
  deleteOrderController,
  resetOrderController,
};

module.exports = orderController;
