const fs = require("fs");
const path = require("path");
const { promisify } = require("util");
const readFile = promisify(fs.readFile);
const {
  createProductController,
} = require("../src/controllers/productController");
const mongoose = require("mongoose");
const connectDB = require("../src/config/db");

const currentDir = path.dirname(__filename);
const dataDir = path.join(currentDir, "sample_data");

async function dropProductsCollection() {
  try {
    await connectDB();
    await mongoose.connection.db.collection("products").drop();
    console.log("Colección 'products' borrada con éxito.");
  } catch (err) {
    console.error(err);
  }
}

async function seedProducts() {
  // Read JSON file
  const dataFile = path.join(dataDir, "coffees.json");
  console.log(`Reading data from ${dataFile}...`);

  try {
    const data = await readFile(dataFile, "utf8");
    const results = JSON.parse(data);
    console.log(`Found ${results.length} rows...`);

    // Creating products
    console.log("Creating products...");
    for (const result of results) {
      let name = result.title;
      let precio = Math.floor(Math.random() * 2001) + 1000;
      let stock = Math.floor(Math.random() * 51) + 50;
      let img = result.image;
      let description = result.description;
      try {
        await createProductController(name, precio, stock, img, description);
      } catch (error) {
        console.error(`Error creating product: ${error.message}`);
      }
    }
  } catch (err) {
    console.error(err);
  }
}

dropProductsCollection().then(() => {
  seedProducts()
    .then(() => {
      console.log("Product's script execution completed.");
      process.exit();
    })
    .catch((error) => {
      console.error("Error:", error);
      process.exit(1);
    });
});
