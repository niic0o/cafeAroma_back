const commentController = require("../controllers/commentController");
const validateComment = require("../middlewares/validateComment");

const sendErrorResponse = (res, error, statusCode) => {
  res.status(statusCode).send({ Error: error.message });
};

const getAllCommentsHandler = async (req, res) => {
  try {
    const response = await commentController.getAllCommentsController();
    if (response.length === 0) {
      throw {
        message: "No se encontró ningún comentario",
        statusCode: 404, // not found
      };
    }
    res.send(response);
  } catch (error) {
    sendErrorResponse(res, error, error.statusCode);
  }
};

const getReadCommentsHandler = async (req, res) => {
  try {
    const response = await commentController.getReadCommentsController();   
    if (response.length === 0) {
      throw {
        message: "No se encontró comentarios leídos",
        statusCode: 404, // not found
      };
    }
    res.send(response);
  } catch (error) {
    sendErrorResponse(res, error, error.statusCode);
  }
};

const getOneCommentHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await commentController.getOneCommentController(id);
    if (!response) {
      throw {
        message: "No se encontró el usuario con el ID proporcionado",
        statusCode: 404,
      };
    }    
    res.send(response);
  } catch (error) {
    sendErrorResponse(res, error, error.statusCode);
  }
};

const createCommentHandler = async (req, res) => {
  const oneComment = ({ email, asunto, descripcion } = req.body);
  const { error } =
    validateComment.createCommentValidation.validate(oneComment);
  if (error) {
    return res.status(400).send({ error: error.details[0].message }); // datos mal enviados
  }
  if (!oneComment) {
    throw {
      message: "Hubo un error con los datos enviados, intente otra vez", //si la validacion deja pasar null
      statusCode: 400, //bad request
    };
  }
  try {
    const response = await commentController.createCommentController(
      oneComment
    );
    res.status(201).send(response); // Código de estado para creación exitosa
  } catch (error) {
    sendErrorResponse(res, error, error.statusCode);
  }
};

const physicalDeleteCommentHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await commentController.physicalDeleteCommentController(
      id
    );
    if (!response) {
      throw {
        message: "Comentario no encontrado",
        statusCode: 404, // Not Found
      };
    }
    res.send(response);
  } catch (error) {
    sendErrorResponse(res, error, error.statusCode);
  }
};

const setCommentAsReadHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await commentController.setCommentAsReadController(id);
    if (!response) {
      throw {
        message: "No se pudo realizar la operación, el comentario no existe",
        statusCode: 400,
      };
    }   
    res.send(response);
  } catch (error) {
    sendErrorResponse(res, error, error.statusCode);
  }
};

const setCommentAsUnreadHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await commentController.setCommentAsUnreadController(id);
    if (!response) {
      throw {
        message: "No se pudo realizar la operación, el comentario no existe",
        statusCode: 400,
      };
    }    
    res.send(response);
  } catch (error) {
    sendErrorResponse(res, error, error.statusCode);
  }
};

const commentHandler = {
  getAllCommentsHandler,
  getReadCommentsHandler,
  getOneCommentHandler,
  createCommentHandler,
  physicalDeleteCommentHandler,
  setCommentAsReadHandler,
  setCommentAsUnreadHandler,
};

module.exports = commentHandler;
