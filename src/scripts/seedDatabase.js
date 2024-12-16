const fs = require("fs");
const path = require("path");
const { promisify } = require("util");
const readFile = promisify(fs.readFile);
const userController = require("../src/controllers/userController");
const {
  createProductController,
} = require("../src/controllers/productController");
const { createOrderController } = require("../src/controllers/orderController");
const connectDB = require("../src/config/db");
const dotenv = require("dotenv");
const getimgUnsplash = require("./getImgUnsplash");

const currentDir = path.dirname(__filename);
const dataDir = path.join(currentDir, "sample_data");

connectDB();

async function seedUsers() {
  // Read JSON file
  let dataFile = path.join(dataDir, "users.json");
  console.log(`Reading data from ${dataFile}...`);
  const userIds = [];

  try {
    const data = await readFile(dataFile, "utf8");
    const results = JSON.parse(data);
    console.log(`Found ${results.length} rows...`);

    // Creating users
    console.log("Creating users...");
    for (const result of results) {
      const user = {
        dni: result.dni,
        nombre: result.nombre,
        apellido: result.apellido,
        email: result.email,
        password: result.password,
        username: result.username,
        provincia: result.provincia,
        ciudad: result.ciudad,
        domicilio: result.domicilio,
      };
      try {
        const newUser = await userController.createUserController(user);
        userIds.push(newUser._id);
      } catch (error) {
        console.error(`Error creating user: ${error.message}`);
      }
    }
    return userIds;
  } catch (err) {
    console.error(err);
  }
}

dotenv.config();

const unsplash = process.env.UNSPLASH_ACCESS_KEY || null;

async function seedProducts() {
  // Read JSON file
  const dataFile = path.join(dataDir, "cafes.json");
  console.log(`Reading data from ${dataFile}...`);
  const productIds = []; // inicializa un array para guardar los _id de los usuarios

  try {
    const data = await readFile(dataFile, "utf8");
    const results = JSON.parse(data);
    console.log(`Found ${results.length} rows...`);

    // Creating products
    console.log("Creating products...");
    for (const result of results) {
      let name = result.name;
      let precio = result.precio;
      let stock = result.stock;
      let [img] = unsplash
        ? await getimgUnsplash(unsplash, result.name, 1)
        : result.img;
      let description = result.description;
      try {
        const newProduct = await createProductController(
          name,
          precio,
          stock,
          img,
          description
        );
        productIds.push(newProduct._id.toString()); // agrega el _id del producto creado al array
      } catch (error) {
        console.error(`Error creating product: ${error.message}`);
      }
    }
    return productIds;
  } catch (err) {
    console.error(err);
  }
}

// Creating Orders
async function seedOrders(userIds, productIds) {
  const orders = [];
  console.log(userIds);
  console.log(productIds);

  for (let i = 0; i < 100; i++) {
    const order = {
      user_id: userIds[Math.floor(Math.random() * userIds.length)],
      items: [],
      status: "approved",
    };

    const numProducts = Math.floor(Math.random() * 5) + 1;
    for (let j = 0; j < numProducts; j++) {
      const productId =
        productIds[Math.floor(Math.random() * productIds.length)];
      const price = Math.round((Math.random() * 3000 + 1000) * 100) / 100;
      const quantity = Math.floor(Math.random() * 3) + 1;
      order.items.push({
        product_id: productId,
        precio: price,
        cantidad: quantity,
      });
    }

    orders.push(order);
  }
  console.log("Creating orders...");
  for (const order of orders) {
    try {
      await createOrderController(order);
    } catch (error) {
      console.error(`Error creating order: ${error.message}`);
    }
  }
}

seedUsers()
  .then((userIds) => {
    console.log("User's script execution completed.");
    return seedProducts().then((productIds) => {
      console.log("Product's script execution completed.");
      return { userIds, productIds };
    });
  })
  .then(({ userIds, productIds }) => {
    console.log("Creating orders...");
    return seedOrders(userIds, productIds);
  })
  .then(() => {
    console.log("Order's script execution completed.");
    process.exit();
  })
  .catch((error) => {
    console.error("Error:", error);
    process.exit(1);
  });
