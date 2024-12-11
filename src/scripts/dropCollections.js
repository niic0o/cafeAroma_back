const mongoose = require('mongoose');
const connectDB = require("../src/config/db");

async function dropCollections() {
  try {
    // await mongoose.connect('mongodb://localhost:27017/your_database_name', { useNewUrlParser: true, useUnifiedTopology: true });

    // const collections = await mongoose.connection.db.collections();
    await connectDB();
    const collections = await mongoose.connection.db.collections();
    for (const collection of collections) {
      console.log(`Dropping collection ${collection.collectionName}...`);
      await collection.drop();
    }

    console.log('All collections dropped.');
    await mongoose.disconnect();
  } catch (err) {
    console.error(err);
  }
}

dropCollections();