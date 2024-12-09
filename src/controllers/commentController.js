
const comments = require("../models/commentsModel");
/*
esto es diseñado para reducir repeticion de codigo ya que cada funcion puede encontrarse con la bdd no activa
*/
const throwError500 = (error) => {
  throw {
    message:
      "Ups, se desenchufó un cable o la base de datos no funciona " +
      error.message,
    statusCode: 500, //error del servidor
  };
};

const getAllCommentsController = async () => {
  try {
    const allComments = await comments.find({ leido: "NO" });
    if (allUsers.length === 0) {
      throw {
        message: "No se encontró ningún comentario",
        statusCode: 404, // not found
      };
    }
    return allComments;
  } catch (error) {
    throwError500(error);
  }
};

const getDeletedCommentsController = async () => {
  try {
    // Buscar solo comentarios que estén eliminados
    const deletedComments = await comments.find({ leido: "SI" });

    if (deletedComments.length === 0) {
      throw {
        message: "No se encontró comentarios leídos",
        statusCode: 404, // not found
      };
    };
    return deletedComments;
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
    if (!commentById) {
      throw {
        message: "No se encontró el usuario con el ID proporcionado",
        statusCode: 404,
      };
    }
    return commentById;
  } catch (error) {
    throwError500(error);
  }
};


const createCommentController = async (oneComment) => { //// aca quede
  if (!oneComment) {
    throw {
      message: "Hubo un error con los datos enviados, intente otra vez",
      statusCode: 400, //bad request
    };
  }
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

    if (!deletedComment) {
      throw {
        message: "Comentario no encontrado",
        statusCode: 404, // Not Found
      };
    }

    return deletedComment;
  } catch (error) {
    throwError500(error);
  }
};

const setCommentAsReadController = async (id) => {
  try {
    const updatedComment = await Comment.findByIdAndUpdate(
      id,
      { leido: "SI" },
      { new: true, runValidators: true } // new: true devuelve el documento actualizado
    );

    if (!updatedComment) {
      throw {
        message: "No se pudo realizar la operación, el comentario no existe",
        statusCode: 400,
      };
    };    
    return updatedComment;
  } catch (error) {
    throwError500(error);
  }
};

const setCommentAsUnreadController = async (id) => {
  try {
    const updatedComment = await Comment.findByIdAndUpdate(
      id,
      { leido: "NO" },
      { new: true, runValidators: true } // new: true devuelve el documento actualizado
    );

    if (!updatedComment) {
      throw {
        message: "No se pudo realizar la operación, el comentario no existe",
        statusCode: 400,
      };
    };    
    return updatedComment;
  } catch (error) {
    throwError500(error);
  }
};


const commentController = {
  getAllCommentsController,
  getDeletedCommentsController,
  getOneCommentController,
  createCommentController,
  physicalDeleteCommentController,
  setCommentAsReadController,
  setCommentAsUnreadController,
};

module.exports = commentController;