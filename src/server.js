//framework para el manejo de solicitudes http entre cliente servidor
const express = require("express");
//middleware para el registro y depuracion de las solicitudes http
const morgan = require("morgan");
const mainRouter = require("./routes/main");

const app = express();

app.use(morgan('dev'));

app.get("/", (req, res) => {
    res.send("Hola mundo!");
  });

// Para crear un middleware propio usar "next"
app.use((req, res, next) => {
  console.log("El servidor acaba de recibir una solicitud GET");
  next();
});

//main router va a responder con la ruta correspondiente cuando server reciba del cliente la solicitud
app.use("/api", mainRouter);
module.exports = app;