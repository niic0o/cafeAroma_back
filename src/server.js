//framework para el manejo de solicitudes http entre cliente servidor
const express = require("express");
//middleware para el registro y depuracion de las solicitudes http
const morgan = require("morgan");
const mainRouter = require("./routes/main");

const app = express();

//debo indicarle a express que el cuerpo "body" de la solicitud vendrá en JSON y debe convertir a Javascript
//debe suceder antes de llamar a mainRouter o habrá una excepcion al no reconocer la informacion recibida.
app.use(express.json());

app.use(morgan("dev"));

// Para crear un middleware propio usar "next"
app.use((req, res, next) => {
  console.log("El servidor acaba de recibir una solicitud");
  //cuando llegue una solicitud a /api ... mainRouter se encargará de responder
  app.use("/api", mainRouter);
  next();
});


module.exports = app;
