const { Router } = require("express");
const commentRouter = Router();
const commentHandler = require("../handlers/commentHandler");
const authUser = require("../middlewares/authUser");

// Rutas para comentarios

// Crear un nuevo comentario
commentRouter.post(
  "/crearComentario",
  commentHandler.createCommentHandler
  /*  
  #swagger.security = null

  #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/commentSchema"
                    }  
                }
            }
        } 
  */
);

// Obtener todos los comentarios
commentRouter.get(
  "/admin/comentarios",
  authUser.authenticate,
  authUser.authorize(["admin"]),
  commentHandler.getAllCommentsHandler
);

// Obtener comentarios leídos
commentRouter.get(
  "/admin/comentariosLeidos",
  authUser.authenticate,
  authUser.authorize(["admin"]),
  commentHandler.getReadCommentsHandler
);

// Obtener un comentario por ID
commentRouter.get(
  "/:id",
  authUser.authenticate,
  authUser.authorize(["admin", "cliente"]),
  commentHandler.getOneCommentHandler
);

// Eliminar un comentario físicamente
commentRouter.delete(
  "/admin/eliminarComentario/:id",
  authUser.authenticate,
  authUser.authorize(["admin"]),
  commentHandler.physicalDeleteCommentHandler
);

// Marcar un comentario como leído
commentRouter.put(
  "/marcarComoLeido/:id",
  authUser.authenticate,
  authUser.authorize(["admin"]),
  commentHandler.setCommentAsReadHandler
);

// Marcar un comentario como no leído
commentRouter.put(
  "/marcarComoNoLeido/:id",
  authUser.authenticate,
  authUser.authorize(["admin"]),
  commentHandler.setCommentAsUnreadHandler
);

module.exports = commentRouter;
