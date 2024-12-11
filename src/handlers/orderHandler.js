/*
const {
  createOrderController,
  getAllOrdersController,
  getOrderByIdController,
  hardDeleteOrderController,
} = require("../controllers/orderController");

const getAllOrdersHandler = async (req, res) => {
  try {
    const response = await getAllOrderController();
    res.status(200).json(response); // res.json() para enviar los productos
  } catch (error) {
    console.error("Error al obtener las ordenes:", error);
    res.status(500).send({ error: error.message });
  }
};

const getOneOrderHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await getOrderByIdController(id);
    res.send(response);
  } catch (error) {
    res.status(400).send({ Error: error.message });
  }
};

const createOrderHandler = async (req, res) => {
  try {
    const newOrder = req.body;
    const response = await createOrderController(newOrder);
    res.send(response);
  } catch (error) {
    res.status(400).send({ Error: error.message });
  }
};

const hardDeleteOrderHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await hardDeleteOrderController(id);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).send({ Error: error.message });
  }
};

module.exports = {
  getAllOrdersHandler,
  getOneOrderHandler,
  createOrderHandler,
  hardDeleteOrderHandler,
};

*/

const {
  createOrderController,
  getAllOrdersController,
  getDeletedOrdersController,
  getOrderByIdController,
  updateOrderController,
  hardDeleteOrderController,
  deleteOrderController,
  resetOrderController,
} = require("../controllers/orderController");

const validateOrder = require("../middlewares/validateOrder"); // Importar las validaciones
// Función para manejar la respuesta de error
const sendErrorResponse = (res, error, statusCode) => {
  res.status(statusCode).send({ Error: error.message });
};

// Función para manejar la obtención de todas las órdenes
const getAllOrdersHandler = async (req, res) => {
  try {
    const response = await getAllOrdersController();
    res.status(200).json(response); // res.json() para enviar las órdenes
  } catch (error) {
    console.error("Error al obtener las órdenes:", error);
    sendErrorResponse(res, error, 500);
  }
};

// Función para manejar la obtención de una orden por ID
const getOneOrderHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await getOrderByIdController(id);
    res.send(response);
  } catch (error) {
    sendErrorResponse(res, error, 500);
  }
};

// Función para manejar la creación de una nueva orden
const createOrderHandler = async (req, res) => {
  try {
    // Validar el cuerpo de la solicitud
    const { error } = validateOrder.createOrderValidation.validate(req.body);
    if (error) {
      // Si hay un error en la validación, responde con un código de estado 400 y el mensaje de error
      return res.status(400).send({ error: error.details[0].message });
    }
    const newOrder = req.body;
    const response = await createOrderController(newOrder);
    res.status(201).send(response); // Código de estado 201 para creación exitosa
  } catch (error) {
    sendErrorResponse(res, error, 500);
  }
};

// Función para manejar el borrado físico de una orden
const hardDeleteOrderHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await hardDeleteOrderController(id);
    res.status(200).json(response);
  } catch (error) {
    sendErrorResponse(res, error, 500);
  }
};

// Función para manejar el borrado lógico de una orden
const deleteOrderHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await deleteOrderController(id);
    res.status(200).json(response);
  } catch (error) {
    sendErrorResponse(res, error, 500);
  }
};

// Función para manejar el restablecimiento lógico de una orden
const resetOrderHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await resetOrderController(id);
    res.status(200).json(response);
  } catch (error) {
    sendErrorResponse(res, error, 500);
  }
};

// Función para manejar la obtención de órdenes eliminadas
const getDeletedOrdersHandler = async (req, res) => {
  try {
    const response = await getDeletedOrdersController();
    res.status(200).json(response);
  } catch (error) {
    sendErrorResponse(res, error, 500);
  }
};

// Función para manejar la actualización de una orden
const updateOrderHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedOrder = req.body;
    const { error } = validateOrder.createOrderValidation.validate(updatedOrder);
    if (error) {
      // Si hay un error en la validación, responde con un código de estado 400 y el mensaje de error
      return res.status(400).send({ error: error.details[0].message });
    }
    const response = await updateOrderController(id, updatedOrder);
    res.status(200).json(response);
  } catch (error) {
    sendErrorResponse(res, error, 500);
  }
};

// Exportar el handler de órdenes
module.exports = {
  getAllOrdersHandler,
  getOneOrderHandler,
  createOrderHandler,
  hardDeleteOrderHandler,
  deleteOrderHandler,
  resetOrderHandler,
  getDeletedOrdersHandler, // Exportar la función para obtener órdenes eliminadas
  updateOrderHandler, // Exportar la función para actualizar una orden
};
