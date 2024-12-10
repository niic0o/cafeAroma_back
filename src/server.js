//framework para el manejo de solicitudes http entre cliente servidor
const express = require("express");
//middleware para el registro y depuracion de las solicitudes http
const morgan = require("morgan");
//middleware para el manejo de CORS
const cors = require("cors");
const mainRouter = require("./routes/main");
const connectDB = require("./config/db"); // Importa la configuración de la base de datos
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("../swagger-output.json");

const app = express();

app.use(cors());

//debo indicarle a express que el cuerpo "body" de la solicitud vendrá en JSON y debe convertir a Javascript
//debe suceder antes de llamar a mainRouter o habrá una excepcion al no reconocer la informacion recibida.

app.use(morgan("dev"));
// Middleware para parsear JSON
app.use(express.json());

// Para crear un middleware propio usar "next"
app.use((req, res, next) => {
  console.log("Acabo de recibir una solicitud");
  //cuando llegue una solicitud a /api ... mainRouter se encargará de responder
  next();
});

// Rutas
app.use(mainRouter);

// Conectar a la base de datos
connectDB();

// Swagger
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

module.exports = app;
