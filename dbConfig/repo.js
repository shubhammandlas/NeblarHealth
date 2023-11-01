// MongoDB connection via mongoose
const mongoose = require("mongoose");

const database = "neblarhealth";
const mongoUri = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(mongoUri);
    console.log(`Mongo db connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;
