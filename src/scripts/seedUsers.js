const fs = require("fs");
const path = require("path");
const { promisify } = require("util");
const readFile = promisify(fs.readFile);
const userController = require("../src/controllers/userController");
const mongoose = require("mongoose");
const connectDB = require("../src/config/db");

const currentDir = path.dirname(__filename);
const dataDir = path.join(currentDir, "sample_data");

async function dropUsersCollection() {
  try {
    await connectDB();
    await mongoose.connection.db.collection("users").drop();
    console.log("Colección 'users' borrada con éxito.");
  } catch (err) {
    console.error(err);
  }
}

async function seedUsers() {
  // Read JSON file
  const dataFile = path.join(dataDir, "users.json");
  console.log(`Reading data from ${dataFile}...`);

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
        await userController.createUserController(user);
      } catch (error) {
        console.error(`Error creating user: ${error.message}`);
      }
    }
  } catch (err) {
    console.error(err);
  }
}

dropUsersCollection().then(() => {
  seedUsers()
    .then(() => {
      console.log("User's script execution completed.");
      process.exit();
    })
    .catch((error) => {
      console.error("Error:", error);
      process.exit(1);
    });
});
