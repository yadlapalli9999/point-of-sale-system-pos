const mongoose = require("mongoose");
require("colors");

//connect mongodb function
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`mongodb connected ${conn.connection.host}`.bgYellow);
  } catch (error) {
    console.log(`Error: ${error.message}`.bgRed);
    process.exit(1);
  }
};

module.exports = connectDB;
