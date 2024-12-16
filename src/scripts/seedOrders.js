const { createOrderController } = require("../src/controllers/orderController");
const mongoose = require("mongoose");
const connectDB = require("../src/config/db");
const User = require("../src/models/usersModel");
const Product = require("../src/models/productsModel");

async function dropOrdersCollection() {
  try {
    await connectDB();
    await mongoose.connection.db.collection("orders").drop();
    console.log("Colección 'orders' borrada con éxito.");
  } catch (err) {
    console.error(err);
  }
}

// Creating Orders
async function seedOrders() {
  const orders = [];
  const userIds = (await User.find().select("_id")).map((user) => user._id);
  const productIds = (await Product.find().select("_id")).map(
    (product) => product._id
  );

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

dropOrdersCollection().then(() => {
  seedOrders()
    .then(() => {
      console.log("Order's script execution completed.");
      process.exit();
    })
    .catch((error) => {
      console.error("Error:", error);
      process.exit(1);
    });
});
