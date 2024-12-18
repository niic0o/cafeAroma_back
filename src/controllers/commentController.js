const comments = require("../models/commentsModel");
/*
esto es diseñado para reducir repeticion de codigo ya que cada funcion puede encontrarse con la bdd no activa
*/
const throwError500 = (error) => {
  throw {
    message:
      "Error al intentar obtener datos, ocurre que: " +
      error.message,
    statusCode: 500, //error del servidor
  };
};

const getAllCommentsController = async () => {
  try {
    const allComments = await comments.find({ leido: "NO" });
    return allComments;
  } catch (error) {
    throwError500(error);
  }
};

const getReadCommentsController = async () => {
  try {
    // Buscar solo comentarios que estén eliminados
    const readComments = await comments.find({ leido: "SI" });
    return readComments;
  } catch (error) {
    throwError500(error);
  }
};

/*
Uso find para obtener el primer objeto que cumpla con la condicion
*/
const getOneCommentController = async (id) => {
  try {
    //recordar que params envia 'string' hay que parsear a Number
    const commentById = await comments.findById(id);
    return commentById;
  } catch (error) {
    throwError500(error);
  }
};

const createCommentController = async (oneComment) => {
  try {
    const newComment = new comments(oneComment);
    const savedComment = await newComment.save(); // Intentar guardar el nuevo usuario
    return savedComment;
  } catch (error) {
    // Manejo de errores de Mongoose
    if (error.name === "ValidationError") {
      throw {
        message: "Error de validación en la base de datos: " + error.message,
        statusCode: 400, // Bad Request
      };
    }
    throwError500(error);
  }
};

const physicalDeleteCommentController = async (id) => {
  try {
    const deletedComment = await comments.findByIdAndDelete(id); // Elimina por ID
    return deletedComment;
  } catch (error) {
    throwError500(error);
  }
};

const setCommentAsReadController = async (id) => {
  try {
    const newComment = { leido: "SI" };
    const updatedComment = await comments.findByIdAndUpdate(
      id,
      newComment,
      { new: true} // new: true devuelve el documento actualizado
    );
    return updatedComment;
  } catch (error) {
    throwError500(error);
  }
};

const setCommentAsUnreadController = async (id) => {
  try {
    const newComment = { leido: "NO" };
    const updatedComment = await comments.findByIdAndUpdate(
      id,
      newComment,
      { new: true} // new: true devuelve el documento actualizado
    );
    return updatedComment;
  } catch (error) {
    throwError500(error);
  }
};

const commentController = {
  getAllCommentsController,
  getReadCommentsController,
  getOneCommentController,
  createCommentController,
  physicalDeleteCommentController,
  setCommentAsReadController,
  setCommentAsUnreadController,
};

module.exports = commentController;
