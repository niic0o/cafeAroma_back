const { Router } = require("express");
const postRouter = Router();
const postHandler = require("../handlers/postHandler");

//si mainRouter me pide que responda por solicitudes HTTP para /api/post yo respondo.

//rutas post (delego al manejador el request y response de la solicitud)
postRouter.get("/", postHandler.getAllPostHandler);

postRouter.get("/:id", postHandler.getOnePostHandler);

postRouter.post("/", postHandler.createPostHandler);

postRouter.put("/:id", postHandler.updatePostHandler);

postRouter.delete("/:id", postHandler.deletePostHandler);

module.exports = postRouter;
