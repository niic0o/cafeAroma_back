const fs = require("fs");
const userController = require("../src/controllers/userController");
const dotenv = require("dotenv");
const connectDB = require("../src/config/db");

// Cargar variables de entorno desde .env
dotenv.config();

// Leer archivo de configuración o usar variables de entorno
let data;
try {
  const configFile = fs.readFileSync("scripts/ADMIN_USER_CONF", "utf8");
  console.log("Leyendo archivo de configuración...");
  const lines = configFile.split("\n");
  data = lines.reduce((acc, line) => {
    const [key, value] = line.split("=");
    acc[key] = value;
    return acc;
  }, {});
} catch (error) {
  if (error.code === "ENOENT") {
    data = {
      email: process.env.email,
      password: process.env.password,
    };
  } else {
    throw error;
  }
}

// Asignar rol admin a los datos del usuario
data.dni = 12345678;
data.nombre = "Super";
data.apellido = "User";
data.username = data.email.split("@")[0];
if (data.username.length < 6) {
  const numbersNeeded = 6 - data.username.length;
  const paddedNumbers = Array(numbersNeeded)
    .fill(0)
    .map(() => Math.floor(Math.random() * 10))
    .join("");
  data.username += paddedNumbers;
}
data.categoria = "admin";

connectDB();

async function createSuperUser() {
  try {
    const user = await userController.createUserController(data);
    console.log(`Super usuario: ${user.username} creado con id: ${user._id}`);
  } catch (error) {
    console.error(`Error creating superuser: ${error.message}`);
  }
}

createSuperUser().then(() => {
  console.log("User's script execution completed.");
  process.exit();
});
