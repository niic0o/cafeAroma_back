const swaggerAutogen = require("swagger-autogen")({ openapi: "3.0.0" });

const doc = {
  info: {
    version: "", // by default: '1.0.0'
    title: "Café Aroma", // by default: 'REST API'
    description: "Back-End del proyecto final de Talentos Digitales", // by default: ''
  },
  host: "", // by default: 'localhost:3000'
  basePath: "", // by default: '/'
  schemes: [], // by default: ['http']
  consumes: [], // by default: ['application/json']
  produces: [], // by default: ['application/json']
  tags: [
    // by default: empty Array
    {
      name: "", // Tag name
      description: "", // Tag description
    },
    // { ... }
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
      },
    },
    schemas: {
      loginSchema: {
        $email: "tu@email.com",
        $password: "tu_clave",
      },
      registerSchema: {
        $dni: 12345678,
        $nombre: "tu_nombre",
        $apellido: "tu_apellido",
        $username: "tu_username",
        $email: "tu@email.com",
        $password: "tu_clave",
        provincia: "tu_provincia",
        ciudad: "tu_ciudad",
        domicilio: "tu_domicilio",
      },
      productSchema: {
        $name: "cappuccino",
        $precio: 1024.56,
        $stock: 10,
        $img: "http://dummyimage.com/300x300.png/ff4444/ffffff",
        $description: "Lorem Ipsum",
      },
      orderSchema: {
        $user_id: "675659ec9247bd1a5c6a8fe2",
        $items: [
          {
            $product_id: "675659ec9247bd1a5c6a8fe2",
            $cantidad: 2,
            $precio: 1255.65,
          },
        ],
        status: "pending",
        payment_id: "675659ec9247bd1a5c6a8fe2",
        merchant_order_id: "26116982143",
      },
      mercadoPagoSchema: [
        {
          $_id: "675659ec9247bd1a5c6a8fe2",
          $title: "Cappuccino",
          $img: "http://dummyimage.com/300x300.png/ff4444/ffffff",
          $description: "Lorem Ipsum",
          $quantity: 3,
          $precio: 1024.56,
        },
      ],
      commentSchema: {
        $email: "tu@email.com",
        $asunto: "Lorem Ipsum",
        $descripcion: "Lorem Ipsum",
      },
    },
  },
  definitions: {}, // by default: empty object
};

const outputFile = "./swagger-output.json";

const routes = ["./src/routes/main.js"];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen(outputFile, routes, doc)
  .then(() => {
    require("./index.js");
  })
  .catch((error) => {
    console.error("Error generating Swagger:", error);
  });
// swaggerAutogen()(outputFile, routes, doc)
//   .then(() => {
//     console.log("Swagger generation successful!");
//   })
//   .catch((error) => {
//     console.error("Error generating Swagger:", error);
//   });
