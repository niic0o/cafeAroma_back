// se encarga de recibir los request y contestar por response
// cuando postRouter reciba una peticion, me invocará para que maneje el flujo de los datos y de una resupuesta

const getAllPostHandler = (req, res) => {
  res.send("Estos son los posteos");
};

const getOnePostHandler = (req, res) => {
  res.send(`Detalle de un posteo con id: ${req.params.id}`);
};

const createPostHandler = (req, res) => {
  res.send("Creando un posteo");
};
const updatePostHandler = (req, res) => {
  res.send(`Modificando el posteo con id: ${req.params.id}`);
};

const deletePostHandler = (req, res) => {
  res.send(`Eliminando el posteo con id: ${req.params.id}`);
};

const postHandler = {
  getAllPostHandler,
  getOnePostHandler,
  createPostHandler,
  updatePostHandler,
  deletePostHandler,
};

module.exports = postHandler;
